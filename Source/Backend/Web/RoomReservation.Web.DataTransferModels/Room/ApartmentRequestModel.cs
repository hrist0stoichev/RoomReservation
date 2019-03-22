using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Web.DataTransferModels.Room
{
    public class ApartmentRequestModel
    {
        [Required]
        [MinLength(4)]
        [MaxLength(4)]
        public string Room1Number { get; set; }

        [Required]
        [MinLength(4)]
        [MaxLength(4)]
        public string Room2Number { get; set; }
    }
}