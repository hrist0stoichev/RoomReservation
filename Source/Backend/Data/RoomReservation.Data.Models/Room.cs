using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoomReservation.Data.Models
{
    public class Room
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [MinLength(4)]
        [MaxLength(4)]
        public string Number { get; set; }

        [Required]
        [Range(1, 4)]
        public byte Capacity { get; set; }

        [Required]
        public bool IsRA { get; set; }

        public bool? IsMale { get; set; }

        [Required]
        public bool IsReserved { get; set; }

        [MaxLength(500)]
        public string Comments { get; set; }

        public string ApartmentRoomNumber { get; set; }

        public Room ApartmentRoom { get; set; }

        public List<Student> Residents { get; set; }

        public List<Invitation> Invitations { get; set; }
    }
}