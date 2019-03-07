using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoomReservation.Data.Models
{
    public class Room
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Range(1000, 9999)]
        public ushort Number { get; set; }

        [Required]
        public bool IsRA { get; set; }

        [Required]
        public bool IsSingle { get; set; }

        [Required]
        public bool IsMale { get; set; }

        [Required]
        public bool IsAvailable { get; set; }

        [Required]
        [Range(0, 2)]
        public byte CurrentResidentsCount { get; set; }

        public List<Resident> Residents { get; set; }
    }
}