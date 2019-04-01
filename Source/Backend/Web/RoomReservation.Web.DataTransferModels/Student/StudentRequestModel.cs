namespace RoomReservation.Web.DataTransferModels.Student
{
    using System.ComponentModel.DataAnnotations;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class StudentRequestModel : BasicStudentRequestModel, IMapFrom<Student>
    {
        [Required]
        public bool? IsRA { get; set; }

        [Required]
        public bool? IsOnCampus { get; set; }

        [MinLength(4)]
        [MaxLength(4)]
        public string CurrentRoomNumber { get; set; }

        [MaxLength(500)]
        public string Comments { get; set; }
    }
}