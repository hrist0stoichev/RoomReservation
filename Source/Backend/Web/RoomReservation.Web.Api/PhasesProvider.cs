using System;
using System.Globalization;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RoomReservation.Web.DataTransferModels.Campaign;

namespace RoomReservation.Web.Api
{
    public class PhasesProvider
    {
        private readonly string APPSETTINGS_PATH;
        private readonly string DATES_FORMAT;

        public PhasesProvider(IConfiguration config)
        {
            APPSETTINGS_PATH = System.IO.Path.Combine(Environment.CurrentDirectory.ToString(), "appsettings.json");
            DATES_FORMAT = "yyyy-MM-ddTHH:mm:ss";

            this.Phase0Start = DateTime.ParseExact(config["Phases:Phase0Start"], DATES_FORMAT, CultureInfo.InvariantCulture);
            this.Phase1Start = DateTime.ParseExact(config["Phases:Phase1Start"], DATES_FORMAT, CultureInfo.InvariantCulture);
            this.Phase2Start = DateTime.ParseExact(config["Phases:Phase2Start"], DATES_FORMAT, CultureInfo.InvariantCulture);
            this.Phase3Start = DateTime.ParseExact(config["Phases:Phase3Start"], DATES_FORMAT, CultureInfo.InvariantCulture);
            this.Phase3End = DateTime.ParseExact(config["Phases:Phase3End"], DATES_FORMAT, CultureInfo.InvariantCulture);
            this.Phase4End = this.Phase3End.AddDays(1);
        }

        public DateTime Phase0Start { get; private set; }

        public DateTime Phase1Start { get; private set; }

        public DateTime Phase2Start { get; private set; }

        public DateTime Phase3Start { get; private set; }

        public DateTime Phase3End { get; private set; }

        public DateTime Phase4End { get; private set; }

        public int CurrentPhase
        {
            get
            {
                switch (DateTime.Now)
                {
                    case DateTime now when (now >= this.Phase0Start && now < this.Phase1Start):
                        return 0;
                    case DateTime now when (now >= this.Phase1Start && now < this.Phase2Start):
                        return 1;
                    case DateTime now when (now >= this.Phase2Start && now < this.Phase3Start):
                        return 2;
                    case DateTime now when (now >= this.Phase3Start && now < this.Phase3End):
                        return 3;
                    case DateTime now when (now >= this.Phase3End && now < this.Phase4End):
                        return 4;
                    default:
                        return -1;
                }
            }
        }

        public void ReloadPhases(CampaignRequestModel model)
        {
            var now = DateTime.Now;

            string appsettingsContent = System.IO.File.ReadAllText(APPSETTINGS_PATH);
            dynamic appSettingsJson = JsonConvert.DeserializeObject(appsettingsContent);

            appSettingsJson.Phases.Phase0Start = now.ToString(DATES_FORMAT);
            appSettingsJson.Phases.Phase1Start = model.Phase1Start;
            appSettingsJson.Phases.Phase2Start = model.Phase2Start;
            appSettingsJson.Phases.Phase3Start = model.Phase3Start;
            appSettingsJson.Phases.Phase3End = model.Phase3End;

            string output = Newtonsoft.Json.JsonConvert.SerializeObject(appSettingsJson, Newtonsoft.Json.Formatting.Indented);
            System.IO.File.WriteAllText(APPSETTINGS_PATH, output);

            this.Phase0Start = now;
            this.Phase1Start = (DateTime)model.Phase1Start;
            this.Phase2Start = (DateTime)model.Phase2Start;
            this.Phase3Start = (DateTime)model.Phase3Start;
            this.Phase3End = (DateTime)model.Phase3End;
            this.Phase4End = ((DateTime)model.Phase3End).AddDays(1);
        }
    }
}