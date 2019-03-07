using System.Threading.Tasks;
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

        public async Task<IActionResult> Get()
        {
            var rooms = await this.Context.Rooms.ToListAsync();

            return Ok(rooms);
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom(RoomRequestModel model)
        {
            var roomToCreate = new Room
            {
                Number = (ushort)model.Number,
                IsRA = (bool)model.IsRA,
                IsMale = (bool)model.IsMale,
                IsSingle = (bool)model.IsSingle,
                IsAvailable = (bool)model.IsAvailable,
                CurrentResidentsCount = (byte)model.CurrentResidentsCount
            };

            await this.Context.Rooms.AddAsync(roomToCreate);
            await this.Context.SaveChangesAsync();

            return Ok(roomToCreate);
        }
    }
}