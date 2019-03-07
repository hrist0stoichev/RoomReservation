using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Web.DataTransferModels.Room
{
    public class RoomRequestModel
    {
        [Required]
        [Range(1000, 9999)]
        public ushort? Number { get; set; }

        [Required]
        public bool? IsRA { get; set; }

        [Required]
        public bool? IsSingle { get; set; }

        [Required]
        public bool? IsMale { get; set; }

        [Required]
        public bool? IsAvailable { get; set; }

        [Required]
        [Range(0, 2)]
        public byte? CurrentResidentsCount { get; set; }
    }
}