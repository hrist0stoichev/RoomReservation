using System;
using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Web.DataTransferModels.Student
{
    public class EditStudentRequestModel : StudentRequestModel
    {
        [MinLength(4)]
        [MaxLength(4)]
        public string CurrentRoomNumber { get; set; }

        public DateTime? RegistrationTime { get; set; }
    }
}