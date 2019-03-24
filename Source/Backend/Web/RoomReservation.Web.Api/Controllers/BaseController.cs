using System;
using System.Globalization;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RoomReservation.Data;
using RoomReservation.Data.Models;

namespace RoomReservation.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        private string _currentUserId;

        protected BaseController(RoomReservationDbContext context)
        { 
            this.Context = context;
        }

        protected RoomReservationDbContext Context { get; }

        protected string CurrentUserId
        {
            get
            {
                if (this._currentUserId == null)
                {
                    string currentUserId = this.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                    if (currentUserId == null)
                    {
                        throw new ArgumentNullException("ClientId", "The ClientId Claim is not set!");
                    }

                    this._currentUserId = currentUserId;
                }

                return this._currentUserId;
            }
            private set
            {
                this._currentUserId = value;
            }
        }

        protected async Task<Student> GetStudentAsync(string id)
        {
            return await this.Context.Students
                .FirstOrDefaultAsync(s => s.Id == id);
        }
    }
}