using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Web.DataTransferModels.Campaign
{
    public class CampaignRequestModel : IValidatableObject
    {
        public DateTime Phase0Start { get; set; } = DateTime.Now.AddSeconds(10);

        [Required]
        public DateTime? Phase1Start { get; set; }

        [Required]
        public DateTime? Phase2Start { get; set; }

        [Required]
        public DateTime? Phase3Start { get; set; }

        [Required]
        public DateTime? Phase3End { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (DateTime.Compare(DateTime.Now, (DateTime)this.Phase0Start) > 0)
            {
                yield return new ValidationResult("Phase 0 start must be in the future!", new string[] { "Phase0Start" });
            }

            if (DateTime.Compare((DateTime)this.Phase0Start, (DateTime)this.Phase1Start) >= 0)
            {
                yield return new ValidationResult("Phase 2 start must be after Phase 1 start!", new string[] { "Phase1Start" });
            }

            if (DateTime.Compare((DateTime)this.Phase1Start, (DateTime)this.Phase2Start) >= 0)
            {
                yield return new ValidationResult("Phase 2 start must be after Phase 1 start!", new string[] { "Phase2Start" });
            }

            if (DateTime.Compare((DateTime)this.Phase2Start, (DateTime)this.Phase3Start) >= 0)
            {
                yield return new ValidationResult("Phase 3 start must be after Phase 2 start!", new string[] { "Phase3Start" });
            }

            if (DateTime.Compare((DateTime)this.Phase3Start, (DateTime)this.Phase3End) >= 0)
            {
                yield return new ValidationResult("Phase 3 end must be after Phase 3 start!", new string[] { "Phase3End" });
            }
        }
    }
}