using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoomReservation.Data;
using RoomReservation.Data.Models;
using RoomReservation.Web.DataTransferModels.Room;

namespace RoomReservation.Web.Api.Controllers
{
    public class RoomsController : BaseController
    {
        public RoomsController(RoomReservationDbContext context, IMapper mapper) : base(context, mapper)
        { }

        public async Task<IActionResult> Get()
        {
            var rooms = await this.Context.Rooms
                .ProjectTo<ListedRoomResponseModel>()
                .ToListAsync();

            return Ok(rooms);
        }

        [HttpGet("{number}")]
        public async Task<IActionResult> Get(int number)
        {
            var room = await this.Context.Rooms
                .SingleOrDefaultAsync(r => r.Number == number);

            return this.Ok(this.Mapper.Map<ListedRoomResponseModel>(room));
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom(RoomRequestModel model)
        {
            var roomToCreate = this.Mapper.Map<Room>(model);

            await this.Context.Rooms.AddAsync(roomToCreate);
            await this.Context.SaveChangesAsync();

            return Ok(roomToCreate);
        }
    }
}