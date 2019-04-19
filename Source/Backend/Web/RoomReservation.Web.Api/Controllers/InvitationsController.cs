using System.Linq;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoomReservation.Common;
using RoomReservation.Data;
using RoomReservation.Data.Models;
using RoomReservation.Web.DataTransferModels.Invitation;

namespace RoomReservation.Web.Api.Controllers
{
    public class InvitationsController : BaseController
    {
        public InvitationsController(RoomReservationDbContext context, PhasesProvider phasesProvider) : base(context)
        {
            this.PhasesProvider = phasesProvider;
        }

        private PhasesProvider PhasesProvider { get; }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string filter = null, string orderBy = null)
        {
            if (this.User.IsInRole("Admin"))
            {
                return this.Ok(await this.Context.Invitations
                    .AsNoTracking()
                    .ProjectTo<AdminInvitationResponseModel>()
                    .WhereDynamic(filter)
                    .OrderByDynamic(orderBy)
                    .ToListAsync());
            }
            else
            {
                var fromInvitations = await this.Context.Invitations
                    .AsNoTracking()
                    .Where(i => i.FromStudentId == this.CurrentUserId)
                    .ProjectTo<StudentInvitationResponseModel>()
                    .ToListAsync();

                var toInvitations = await this.Context.Invitations
                    .AsNoTracking()
                    .Where(i => i.ToStudentId == this.CurrentUserId)
                    .ProjectTo<StudentInvitationResponseModel>()
                    .ToListAsync();

                var response = new
                {
                    FromInvitations = fromInvitations,
                    ToInvitations = toInvitations
                };

                return this.Ok(response);
            }
        }

        [Authorize]
        [HttpPut("{id}/accept")]
        public async Task<IActionResult> AcceptInvitation(int id)
        {
            var invitation = await this.Context.Invitations
                .AsNoTracking()
                .FirstOrDefaultAsync(i => i.Id == id);

            if (invitation == null)
            {
                return this.NotFound();
            }

            if (!this.User.IsInRole("Admin") && invitation.ToStudentId != this.CurrentUserId)
            {
                return this.BadRequest(new { error_message = "You are not permitted to accept this invitation! " });
            }

            var room = await this.Context.Rooms
                .AsNoTracking()
                .Include(r => r.Invitations)
                .Include(r => r.CurrentResidents)
                .FirstOrDefaultAsync(r => r.Number == invitation.RoomNumber);

            var invitee = await this.Context.Students
                .Include(s => s.InvitationsReceived)
                .FirstOrDefaultAsync(s => s.Id == invitation.ToStudentId);

            if (!IsEligibleToAcceptInvitation(invitee, room))
            {
                return this.Unauthorized();
            }

            invitee.CurrentRoomNumber = invitation.RoomNumber;
            invitee.RegistrationTime = null;
            this.Context.Invitations.RemoveRange(invitee.InvitationsReceived);

            if (room.Capacity == room.CurrentResidents.Count + 1)
            {
                this.Context.Invitations.RemoveRange(room.Invitations);
            }

            await this.Context.SaveChangesAsync();
            return this.Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvitations(int id)
        {
            var invitation = await this.Context.Invitations
                .FirstOrDefaultAsync(i => i.Id == id);

            if (invitation == null)
            {
                return this.NotFound();
            }

            if (this.User.IsInRole("Admin") || invitation.FromStudentId == this.CurrentUserId || invitation.ToStudentId == this.CurrentUserId)
            {
                this.Context.Invitations.Remove(invitation);
            }
            else
            {
                return this.BadRequest(new { error_message = "You are not permitted to delete this invitation! " });
            }

            await this.Context.SaveChangesAsync();
            return this.Ok();
        }

        [Authorize(Roles = "Student")]
        [HttpPost]
        public async Task<IActionResult> Post(InvitationRequestModel model)
        {
            var invitee = await this.Context.Students
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == model.InviteeId);

            if (invitee == null)
            {
                return this.NotFound();
            }

            var inviteRoom = await this.Context.Rooms
                .AsNoTracking()
                .Include(r => r.CurrentResidents)
                .FirstOrDefaultAsync(r => r.Number == model.RoomNumber);

            var inviter = await this.Context.Students
                .AsNoTracking()
                .Include(s => s.InvitationsSent)
                .FirstOrDefaultAsync(s => s.Id == this.CurrentUserId);

            if (!IsEligibleToInvite(inviter, invitee, inviteRoom))
            {
                return this.Unauthorized();
            }

            var invitation = new Invitation()
            {
                FromStudentId = inviter.Id,
                ToStudentId = invitee.Id,
                RoomNumber = model.RoomNumber
            };

            await this.Context.Invitations.AddAsync(invitation);
            await this.Context.SaveChangesAsync();

            return this.Ok();
        }

        private bool IsEligibleToInvite(Student inviter, Student invitee, Room room)
        {
            return inviter.CurrentRoomNumber != null
            && (inviter.CurrentRoomNumber == room.Number || inviter.CurrentRoomNumber == room.ApartmentRoomNumber)
            && invitee.CurrentRoomNumber == null
            && inviter.IsMale == invitee.IsMale
            && invitee.IsOnCampus
            && (PhasesProvider.CurrentPhase > 1 || inviter.IsRA)
            && room.Capacity > room.CurrentResidents.Count
            && inviter.InvitationsSent.Count < 4;
        }

        private bool IsEligibleToAcceptInvitation(Student student, Room room)
        {
            return student.CurrentRoomNumber == null
            && student.IsOnCampus
            && student.IsMale == room.IsMale
            && room.Capacity > room.CurrentResidents.Count;
        }
    }
}