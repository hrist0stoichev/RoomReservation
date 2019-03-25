using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RoomReservation.Data;
using RoomReservation.Web.DataTransferModels.Campaign;

namespace RoomReservation.Web.Api.Controllers
{
    public class CampaignsController : BaseController
    {
        public CampaignsController(RoomReservationDbContext context, PhasesProvider phasesProvider) : base(context)
        {
            this.PhasesProvider = phasesProvider;
        }

        private PhasesProvider PhasesProvider { get; }

        [Authorize]
        [HttpGet]
        public IActionResult GetPhase()
        {
            return this.Ok(PhasesProvider.CurrentPhase);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("dates")]
        public IActionResult GetPhasesDates()
        {
            var dates = new List<DateTime>() {
                PhasesProvider.Phase0Start,
                PhasesProvider.Phase1Start,
                PhasesProvider.Phase2Start,
                PhasesProvider.Phase3Start,
                PhasesProvider.Phase3End,
                PhasesProvider.Phase4End
            };

            return this.Ok(dates);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> StartCampaign(CampaignRequestModel model)
        {
            // if (PhasesProvider.CurrentPhase != -1)
            // {
            //     return BadRequest(new { error_message = "Cannot start a new campaign until the old one is finished" });
            // }

            var rooms = await this.Context.Rooms
                .Where(r => !r.IsReserved)
                .ToListAsync();

            rooms.ForEach(r => r.IsMale = null);

            var students = await this.Context.Students
                .Where(s => s.IsOnCampus)
                .OrderByDescending(s => s.CreditHours)
                .ToListAsync();

            students.ForEach(s =>
            {
                s.PreviousRoomNumber = s.CurrentRoomNumber;
                s.CurrentRoomNumber = null;
            });

            double hoursCount = 0;

            for (DateTime i = PhasesProvider.Phase3Start; i < PhasesProvider.Phase3End; i = i.AddHours(1))
            {
                if (!(i.Hour >= 22 || i.Hour < 10)) hoursCount++;
            }

            var minutesPerStudent = Math.Floor(hoursCount * 60 / students.Count);
            int studentIndex = 0;

            for (DateTime i = PhasesProvider.Phase3Start; i < PhasesProvider.Phase3End; i = i.AddMinutes(minutesPerStudent))
            {
                if (i.Hour >= 22 || i.Hour < 10) continue;
                students[studentIndex].RegistrationTime = i;
                studentIndex++;
            }

            await this.Context.SaveChangesAsync();

            this.PhasesProvider.ReloadPhases(model);

            return this.Ok();
        }
    }
}
