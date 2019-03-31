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

        [MaxLength(500)]
        public string Comments { get; set; }
    }
}