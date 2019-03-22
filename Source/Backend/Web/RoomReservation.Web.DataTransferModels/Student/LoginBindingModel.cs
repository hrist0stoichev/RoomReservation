using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Web.DataTransferModels.Student
{
    public class LoginBindingModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        // TODO: Delele the role property once the LDAP Authentication is ready
        [Required]
        public string Role { get; set; }

        // TODO: Delete the phase property once the Phases logic is ready
        [Required]
        public int? Phase { get; set; }
    }
}