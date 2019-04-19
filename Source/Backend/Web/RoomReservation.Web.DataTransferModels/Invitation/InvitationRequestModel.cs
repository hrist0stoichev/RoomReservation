using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Web.DataTransferModels.Invitation
{
    public class InvitationRequestModel
    {
        [Required]
        [MinLength(9)]
        [MaxLength(9)]
        public string InviteeId { get; set; }

        [Required]
        [MinLength(4)]
        [MaxLength(4)]
        public string RoomNumber { get; set; }
    }
}