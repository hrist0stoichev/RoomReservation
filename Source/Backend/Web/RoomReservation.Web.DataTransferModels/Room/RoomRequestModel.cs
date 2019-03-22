namespace RoomReservation.Web.DataTransferModels.Room
{
    using System.ComponentModel.DataAnnotations;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class RoomRequestModel : IMapFrom<Room>
    {
        [Required]
        [Range(1000, 9999)]
        public string Number { get; set; }

        [Required]
        [Range(1, 4)]
        public byte? Capacity { get; set; }

        [Required]
        public bool? IsRA { get; set; }

        [Required]
        public bool? IsMale { get; set; }

        [Required]
        public bool? IsReserved { get; set; }

        [MaxLength(500)]
        public string Comments { get; set; }
    }
}