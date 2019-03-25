using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoomReservation.Data;
using RoomReservation.Data.Models;
using RoomReservation.Web.DataTransferModels.Room;

namespace RoomReservation.Web.Api.Controllers
{
    public class RoomsController : BaseController
    {
        public RoomsController(RoomReservationDbContext context, PhasesProvider phasesProvider) : base(context)
        {
            this.PhasesProvider = phasesProvider;
        }

        private PhasesProvider PhasesProvider { get; }

        [Authorize]
        public async Task<IActionResult> Get(string skaptoNumber, string floor)
        {
            var roomNumberPattern = skaptoNumber + floor + "__";

            var roomsQuery = this.Context.Rooms
                .AsNoTracking()
                .Where(r => EF.Functions.Like(r.Number, roomNumberPattern));

            // Students can only view rooms that are not full and whose residents are from the same sex
            if (this.User.IsInRole("Student"))
            {
                // Return an empty list if the application is not in any phase
                if (PhasesProvider.CurrentPhase == -1)
                {
                    return this.Ok(new List<ListedRoomResponseModel>());
                }

                var currentUser = await base.GetStudentAsync(this.CurrentUserId);

                roomsQuery = roomsQuery
                    .Where(r => r.Capacity > r.CurrentResidents.Count)
                    .Where(r => r.IsMale == null || r.IsMale == currentUser.IsMale);
            }

            var rooms = await roomsQuery
               .ProjectTo<ListedRoomResponseModel>()
               .ToListAsync();

            return Ok(rooms);
        }

        [HttpGet("{number}")]
        [Authorize]
        public async Task<IActionResult> Get(string number)
        {
            var room = await this.Context.Rooms
                .AsNoTracking()
                .Include(r => r.CurrentResidents)
                .Include(r => r.Invitations)
                .FirstOrDefaultAsync(r => r.Number == number);

            if (room == null)
            {
                return this.NotFound();
            }

            if (this.User.IsInRole("Admin"))
            {
                return this.Ok(Mapper.Map<AdminDetailedRoomResponseModel>(room));
            }
            else
            {
                var currentUser = await base.GetStudentAsync(this.CurrentUserId);

                if (!IsEligibleForRegistration(currentUser, room))
                {
                    return this.Unauthorized();
                }

                return this.Ok(Mapper.Map<StudentDetailedRoomResponseModel>(room));
            }
        }

        [HttpPut("confirm")]
        [Authorize]
        public async Task<IActionResult> ConfirmRoom()
        {
            var currentStudent = await base.GetStudentAsync(this.CurrentUserId);

            if (currentStudent.PreviousRoomNumber == null)
            {
                return BadRequest(new { error_message = "Current student do not have a room to confirm" });
            }

            var room = await this.Context.Rooms
                .Include(r => r.CurrentResidents)
                .FirstOrDefaultAsync(r => r.Number == currentStudent.PreviousRoomNumber);

            if (!IsEligibleForConfirmation(currentStudent, room))
            {
                return this.Unauthorized();
            }

            currentStudent.CurrentRoomNumber = room.Number;
            currentStudent.RegistrationTime = null;

            room.IsMale = currentStudent.IsMale;

            await this.Context.SaveChangesAsync();

            return this.Ok();
        }

        [HttpPost("{number}/join")]
        [Authorize]
        public async Task<IActionResult> JoinRoom(string number)
        {
            var room = await this.Context.Rooms
                .Include(r => r.CurrentResidents)
                .FirstOrDefaultAsync(r => r.Number == number);

            if (room == null)
            {
                return this.NotFound();
            }

            var currentUser = await this.Context.Students
                .Include(s => s.InvitationsReceived)
                .FirstOrDefaultAsync(s => s.Id == this.CurrentUserId);

            if (!IsEligibleForRegistration(currentUser, room))
            {
                return this.Unauthorized();
            }

            room.CurrentResidents.Add(currentUser);

            // If the room becomes full, delete all invitations for it
            if (room.Capacity == room.CurrentResidents.Count)
            {
                room.Invitations.Clear();
            }

            // If this is the first resident in the room, mark the room to be the same sex
            if (room.CurrentResidents.Count == 1)
            {
                room.IsMale = currentUser.IsMale;
            }

            // Delete all invitations that the user has received in the past
            currentUser.InvitationsReceived.Clear();

            await this.Context.SaveChangesAsync();

            return this.Ok();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post(RoomRequestModel model)
        {
            if (await IsRoomExistingAsync(model.Number))
            {
                return this.BadRequest(new { error_message = "The specified room number is already existing! " });
            }

            var roomToCreate = Mapper.Map<Room>(model);

            await this.Context.Rooms.AddAsync(roomToCreate);
            await this.Context.SaveChangesAsync();

            return Ok(Mapper.Map<AdminDetailedRoomResponseModel>(roomToCreate));
        }

        [HttpPut("{number}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(string number, RoomRequestModel model)
        {
            var roomToModify = await this.Context.Rooms
                .Include(r => r.CurrentResidents)
                .FirstOrDefaultAsync(r => r.Number == number);

            if (roomToModify == null)
            {
                return this.NotFound();
            }

            if (await IsRoomExistingAsync(model.Number))
            {
                return this.BadRequest(new { error_message = "The specified room number is already existing! " });
            }

            if (model.Capacity < roomToModify.CurrentResidents.Count)
            {
                return this.BadRequest(new { error_message = "The capacity cannot be lower than the current number of residents" });
            }

            if (roomToModify.CurrentResidents.Any(s => s.IsMale != model.IsMale))
            {
                return this.BadRequest(new { error_message = "There are residents from the opposite sex already occupying this room!" });
            }

            roomToModify.Number = model.Number;
            roomToModify.Capacity = (byte)model.Capacity;
            roomToModify.IsRA = (bool)model.IsRA;
            roomToModify.IsMale = (bool)model.IsMale;
            roomToModify.IsReserved = (bool)model.IsReserved;
            roomToModify.Comments = model.Comments;

            await this.Context.SaveChangesAsync();

            return this.Ok(Mapper.Map<AdminDetailedRoomResponseModel>(roomToModify));
        }

        [HttpPost("/apartment")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> MakeApartment(ApartmentRequestModel model)
        {
            var room1 = await this.Context.Rooms.FirstOrDefaultAsync(r => r.Number == model.Room1Number);
            var room2 = await this.Context.Rooms.FirstOrDefaultAsync(r => r.Number == model.Room2Number);

            if (room1 == null || room2 == null)
            {
                return this.NotFound();
            }

            room1.ApartmentRoomNumber = room2.Number;
            room1.ApartmentRoomNumber = room1.Number;

            await this.Context.SaveChangesAsync();

            return this.Ok();
        }

        private async Task<bool> IsRoomExistingAsync(string number)
        {
            return await this.Context.Rooms
                .AnyAsync(r => r.Number == number);
        }

        private bool IsEligibleForConfirmation(Student student, Room room)
        {
            return !student.IsRA
            && student.PreviousRoomNumber != null
            && student.CurrentRoomNumber == null
            && student.IsOnCampus
            && PhasesProvider.CurrentPhase == 1
            && !room.IsReserved
            && room.Capacity > room.CurrentResidents.Count;
        }

        private bool IsEligibleToInvite(Student inviter, Student invitee, Room room)
        {
            return inviter.CurrentRoomNumber != null
            && invitee.CurrentRoomNumber == null
            && inviter.IsMale == invitee.IsMale
            && invitee.IsOnCampus
            && PhasesProvider.CurrentPhase > 1
            && room.Capacity + room.ApartmentRoom.Capacity > room.CurrentResidents.Count + room.ApartmentRoom.CurrentResidents.Count;
        }

        private bool IsEligibleToAcceptInvitation(Student student, Room room)
        {
            return student.CurrentRoomNumber == null
            && student.IsOnCampus
            && room.Capacity + room.ApartmentRoom.Capacity > room.CurrentResidents.Count + room.ApartmentRoom.CurrentResidents.Count;
        }

        private bool IsEligibleForRegistration(Student student, Room room)
        {
            return student.CurrentRoomNumber == null // check if the student doesn't have a room
            && student.IsOnCampus // check if the student is on campus
            && student.RegistrationTime < DateTime.Now // check if the registration time of the student has already come
            && (room.IsMale == null || student.IsMale == room.IsMale) // check if the room is the same sex as the student
            && room.Capacity > room.CurrentResidents.Count // check if the room is not already full
            && !room.IsReserved // check if the room is not reserved
            && PhasesProvider.CurrentPhase > 2;
        }
    }
}