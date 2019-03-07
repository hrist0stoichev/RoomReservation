namespace RoomReservation.Web.DataTransferModels.Room
{
    using System.ComponentModel.DataAnnotations;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class RoomRequestModel : IMapFrom<Room>
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