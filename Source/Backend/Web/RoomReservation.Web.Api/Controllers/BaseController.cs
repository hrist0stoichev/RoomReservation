using Microsoft.AspNetCore.Mvc;
using RoomReservation.Data;

namespace RoomReservation.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected BaseController(RoomReservationDbContext context)
        {
            this.Context = context;
        }

        protected RoomReservationDbContext Context { get; }
    }
}