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
        public RoomsController(RoomReservationDbContext context) : base(context)
        { }

        [Authorize]
        public async Task<IActionResult> Get(string skaptoNumber, string floor)
        {
            var roomNumberPattern = skaptoNumber + floor + "%";

            var roomsQuery = this.Context.Rooms
                .AsNoTracking()
                .Where(r => EF.Functions.Like(r.Number, roomNumberPattern));

            // Students can only view rooms that are not full and whose residents are from the same sex
            if (!this.User.IsInRole("Admin"))
            {
                // TODO: Maybe add this to the token instead of getting the user from the database every time
                var currentUser = await base.GetStudentAsync(this.CurrentUserId);

                roomsQuery = roomsQuery
                    .Where(r => r.Capacity > r.Residents.Count)
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
                .Include(r => r.Residents)
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

                if (!IsStudentEligible(currentUser, room))
                {
                    return this.Unauthorized();
                }

                return this.Ok(Mapper.Map<StudentDetailedRoomResponseModel>(room));
            }
        }

        [HttpPost("{number}/join")]
        [Authorize]
        public async Task<IActionResult> JoinRoom(string number)
        {
            var room = await this.Context.Rooms
                .Include(r => r.Residents)
                .FirstOrDefaultAsync(r => r.Number == number);

            if (room == null)
            {
                return this.NotFound();
            }

            var currentUser = await this.Context.Students
                .Include(s => s.InvitationsReceived)
                .FirstOrDefaultAsync(s => s.Id == this.CurrentUserId);

            if (!IsStudentEligible(currentUser, room))
            {
                return this.Unauthorized();
            }

            room.Residents.Add(currentUser);

            // If the room becomes full, delete all invitations for it
            if (room.Capacity == room.Residents.Count)
            {
                room.Invitations.Clear();
            }

            // If this is the first resident in the room, mark the room to be the same sex
            if (room.Residents.Count == 1)
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
                .Include(r => r.Residents)
                .FirstOrDefaultAsync(r => r.Number == number);

            if (roomToModify == null)
            {
                return this.NotFound();
            }

            if (await IsRoomExistingAsync(model.Number))
            {
                return this.BadRequest(new { error_message = "The specified room number is already existing! " });
            }

            if (model.Capacity < roomToModify.Residents.Count)
            {
                return this.BadRequest(new { error_message = "The capacity cannot be lower than the current number of residents" });
            }

            if (roomToModify.Residents.Any(s => s.IsMale != model.IsMale))
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

        private bool IsStudentEligible(Student student, Room room)
        {
            return student != null // check if the student is present in the database
            && !student.IsBanned // check if student is not banned
            && student.IsDepositPaid // check if student has paid their deposit
            && student.IsOnCampus // check if the student is on campus
            && student.CurrentRoomNumber == null // check if the student does not have a room yet
            && student.RegistrationTime < DateTime.Now // check if the registration time of the student has already come
            && (room.IsMale == null || student.IsMale == room.IsMale) // check if the room is the same sex as the student
            && room.Capacity > room.Residents.Count // check if the room is not already full
            && !room.IsReserved; // check if the room is not reserved
        }
    }
}