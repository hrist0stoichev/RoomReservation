namespace RoomReservation.Web.DataTransferModels.Student
{
    using System;
    using System.Collections.Generic;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Web.DataTransferModels.Invitation;
    using RoomReservation.Data.Models;

    public class AdminDetailedStudentResponseModel : IMapFrom<Student>
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public DateTime? RegistrationTime { get; set; }

        public byte CreditHours { get; set; }

        public string Email { get; set; }

        public bool IsMale { get; set; }

        public bool IsRA { get; set; }

        public bool IsRoomConfirmed { get; set; }

        public bool IsOnCampus { get; set; }

        public string Comments { get; set; }

        public string CurrentRoomNumber { get; set; }

        public List<AdminInvitationResponseModel> InvitationsSent { get; set; }

        public List<AdminInvitationResponseModel> InvitationsReceived { get; set; }
    }
}