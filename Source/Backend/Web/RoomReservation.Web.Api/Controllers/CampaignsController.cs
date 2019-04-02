using System;
using System.Collections.Generic;
using System.Data;
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
            var dates = new[] {
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
            if (PhasesProvider.CurrentPhase != -1)
            {
                return BadRequest(new { error_message = "Cannot start a new campaign until the old one is finished" });
            }

            using (var transaction = await Context.Database.BeginTransactionAsync(IsolationLevel.Snapshot))
            {
                try
                {
                    await this.Context.Database.ExecuteSqlCommandAsync("UPDATE Rooms SET IsMale = NULL");
                    await this.Context.Database.ExecuteSqlCommandAsync("TRUNCATE TABLE Invitations");
                    await this.Context.Database.ExecuteSqlCommandAsync("UPDATE Students SET PreviousRoomNumber = CurrentRoomNumber, CurrentRoomNumber = NULL");

                    var students = await this.Context.Students
                        .Where(s => s.IsOnCampus && !s.IsRA)
                        .OrderByDescending(s => s.CreditHours)
                        .ThenBy(s => s.Id)
                        .ToListAsync();

                    int totalMinutesCount = 0;

                    for (DateTime i = (DateTime)model.Phase3Start; i < model.Phase3End; i = i.AddMinutes(1))
                    {
                        if (i.Hour < 21 && i.Hour >= 9)
                        {
                            totalMinutesCount++;
                        }
                    }

                    var minutesPerStudent = totalMinutesCount / students.Count;
                    int studentIndex = 0;

                    for (DateTime i = (DateTime)model.Phase3Start; i < model.Phase3End; i = i.AddMinutes(minutesPerStudent))
                    {
                        if (i.Hour < 21 && i.Hour >= 9)
                        {
                            students[studentIndex++].RegistrationTime = i;
                        }
                    }

                    await this.Context.SaveChangesAsync();
                    this.PhasesProvider.ReloadPhases(model);

                    transaction.Commit();
                    return this.Ok();
                }
                catch
                {
                    transaction.Rollback();
                    return this.BadRequest(new { error_message = "Could not start campaign!" });
                }
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<IActionResult> StopCampaign()
        {
            if (PhasesProvider.CurrentPhase == -1)
            {
                return this.BadRequest(new { error_message = "There is currently no active campaign! " });
            }

            using (var transaction = await Context.Database.BeginTransactionAsync(IsolationLevel.Snapshot))
            {
                try
                {
                    await this.Context.Database.ExecuteSqlCommandAsync("TRUNCATE TABLE Invitations");
                    await this.Context.Database.ExecuteSqlCommandAsync("UPDATE Students SET RegistrationTime = NULL, CurrentRoomNumber = PreviousRoomNumber, PreviousRoomNumber = NULL");
                    await this.Context.Database.ExecuteSqlCommandAsync("UPDATE Rooms SET IsMale = s.IsMale FROM Rooms AS r INNER JOIN Students as s on (r.Number = s.PreviousRoomNumber)");

                    this.PhasesProvider.ReloadPhases(new CampaignRequestModel()
                    {
                        Phase0Start = DateTime.MinValue,
                        Phase1Start = DateTime.MinValue,
                        Phase2Start = DateTime.MinValue,
                        Phase3Start = DateTime.MinValue,
                        Phase3End = DateTime.MinValue
                    });

                    transaction.Commit();
                    return this.Ok();
                }
                catch
                {
                    transaction.Rollback();
                    return this.BadRequest(new { error_message = "Could not stop campaign!" });
                }
            }
        }
    }
}
