using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RoomReservation.Web.DataTransferModels.Student
{
    public class BatchAddStudentsRequestModel : IValidatableObject
    {
        [Required]
        [MinLength(1)]
        public List<BasicStudentRequestModel> Students { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (this.Students.Select(s => s.Id).ToHashSet().Count != this.Students.Count) 
            {
                yield return new ValidationResult("All Ids must be distinct!", new string[] { "Id" });
            }

            if (this.Students.Select(s => s.Email).ToHashSet().Count != this.Students.Count) 
            {
                yield return new ValidationResult("All Emails must be distinct!", new string[] { "Email" });
            }
        }
    }
}