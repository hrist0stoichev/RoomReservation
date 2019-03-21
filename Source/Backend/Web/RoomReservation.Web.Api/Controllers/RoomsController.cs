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

        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            var rooms = await this.Context.Rooms
                .ProjectTo<ListedRoomResponseModel>()
                .ToListAsync();

            return Ok(rooms);
        }

        [HttpGet("{number}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int number)
        {
            var room = await this.Context.Rooms
                .SingleOrDefaultAsync(r => r.Number == number);

            return this.Ok(Mapper.Map<ListedRoomResponseModel>(room));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddRoom(RoomRequestModel model)
        {
            var roomToCreate = Mapper.Map<Room>(model);

            await this.Context.Rooms.AddAsync(roomToCreate);
            await this.Context.SaveChangesAsync();

            return Ok(roomToCreate);
        }
    }
}