using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Data.Models
{
    public class Resident
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(50)]
        public string MiddleName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        public bool IsMale { get; set; }

        [Required]
        public bool IsRA { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        [Range(0, 200)]
        public int CreditHours { get; set; }

        public int RoomId { get; set; }

        public Room Room { get; set; }
    }
}