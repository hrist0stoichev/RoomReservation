namespace RoomReservation.Web.DataTransferModels.Student
{
    using System.ComponentModel.DataAnnotations;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class StudentRequestModel : IMapFrom<Student>
    {
        [Required]
        [MinLength(9)]
        [MaxLength(9)]
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
        [Range(0, 200)]
        public byte? CreditHours { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        public bool? IsMale { get; set; }

        [Required]
        public bool? IsRA { get; set; }

        [Required]
        public bool? IsBanned { get; set; }

        [Required]
        public bool? IsOnCampus { get; set; }

        [Required]
        public bool? IsDepositPaid { get; set; }

        [MaxLength(500)]
        public string Comments { get; set; }
    }
}