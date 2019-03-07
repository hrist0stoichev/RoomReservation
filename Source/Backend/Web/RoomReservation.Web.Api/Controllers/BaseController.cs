using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RoomReservation.Data;

namespace RoomReservation.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected BaseController(RoomReservationDbContext context, IMapper mapper)
        {
            this.Context = context;
            this.Mapper = mapper;
        }

        protected RoomReservationDbContext Context { get; }

        protected IMapper Mapper { get; }
    }
}