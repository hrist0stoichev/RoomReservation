using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Web.DataTransferModels.Invitation
{
    public class InvitationRequestModel
    {
        [Required]
        [MinLength(9)]
        [MaxLength(9)]
        public string InviteeId { get; set; }
    }
}