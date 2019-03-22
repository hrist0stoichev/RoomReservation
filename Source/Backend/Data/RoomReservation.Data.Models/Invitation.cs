using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Data.Models
{
    public class Invitation
    {
        [Key]
        public string FromStudentId { get; set; }

        public Student FromStudent { get; set; }

        [Key]
        public string ToStudentId { get; set; }

        public Student ToStudent { get; set; }

        [Key]
        public string RoomNumber { get; set; }

        public Room Room { get; set; }
    }
}