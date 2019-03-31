using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Web.DataTransferModels.Student
{
    public class LoginBindingModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}