using System;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [Authorize]
        [HttpGet]
        public IActionResult GetPhasesDates() {

            DateTime[] dates = new DateTime[] {
                PhasesProvider.Phase0Start,
                PhasesProvider.Phase1Start,
                PhasesProvider.Phase2Start,
                PhasesProvider.Phase3Start,
                PhasesProvider.Phase3End
            };
            return this.Ok(dates);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult StartCampaign(CampaignRequestModel model)
        {
            // TODO: Uncomment this code block in production
            // if (DateTime.Now < PhasesProvider.Phase3End)
            // {
            //     return BadRequest(new { error_message = "Cannot start a new campaign until the old one is finished" });
            // }

            this.PhasesProvider.ReloadPhases(model);

            return this.Ok();
        }
    }
}
