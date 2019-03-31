using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Data.Models
{
    public class Invitation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FromStudentId { get; set; }

        public Student FromStudent { get; set; }

        [Required]
        public string ToStudentId { get; set; }

        public Student ToStudent { get; set; }

        [Required]
        public string RoomNumber { get; set; }

        public Room Room { get; set; }
    }
}