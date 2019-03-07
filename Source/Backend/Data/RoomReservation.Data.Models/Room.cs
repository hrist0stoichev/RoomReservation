using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Data.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public bool IsRA { get; set; }

        [Required]
        public bool IsSingle { get; set; }

        [Required]
        public bool IsMale { get; set; }

        [Required]
        public bool IsAvailable { get; set; }

        [Required]
        [Range(0, 3)]
        public byte NumberOfResidents { get; set; }

        public List<Resident> Residents { get; set; }
    }
}