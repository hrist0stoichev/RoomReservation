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
        [Range(1, 4)]
        public byte Capacity { get; set; }

        [Required]
        public bool IsRA { get; set; }

        [Required]
        public bool IsMale { get; set; }

        [Required]
        public bool IsReserved { get; set; }

        [MaxLength(500)]
        public string Comments { get; set; }

        public ushort? ApartmentRoomNumber { get; set; }

        public Room ApartmentRoom { get; set; }

        public List<Student> Students { get; set; }

        public List<Invitation> Invitations { get; set; }
    }
}