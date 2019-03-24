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

        public PhasesProvider(IConfiguration config)
        {
            APPSETTINGS_PATH = System.IO.Path.Combine(Environment.CurrentDirectory.ToString(), "appsettings.json");

            this.Phase0Start = DateTime.ParseExact(config["Phases:Phase0Start"], "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture);
            this.Phase1Start = DateTime.ParseExact(config["Phases:Phase1Start"], "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture);
            this.Phase2Start = DateTime.ParseExact(config["Phases:Phase2Start"], "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture);
            this.Phase3Start = DateTime.ParseExact(config["Phases:Phase3Start"], "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture);
            this.Phase3End = DateTime.ParseExact(config["Phases:Phase3End"], "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture);
        }

        public DateTime Phase0Start { get; private set; }

        public DateTime Phase1Start { get; private set; }

        public DateTime Phase2Start { get; private set; }

        public DateTime Phase3Start { get; private set; }

        public DateTime Phase3End { get; private set; }

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

            appSettingsJson.Phases.Phase0Start = now.ToString("yyyy-MM-ddTHH:mm:ss");
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
        }
    }
}