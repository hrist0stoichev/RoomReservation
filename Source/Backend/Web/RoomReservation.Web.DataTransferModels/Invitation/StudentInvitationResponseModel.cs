namespace RoomReservation.Web.DataTransferModels.Invitation
{
    using AutoMapper;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class StudentInvitationResponseModel : IHaveCustomMappings
    {
        public string FromStudentName { get; set; }

        public string RoomNumber { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Invitation, StudentInvitationResponseModel>()
                .ForMember(airm => airm.FromStudentName, opts => opts.MapFrom(i => i.FromStudent.FirstName + " " + i.FromStudent.LastName));
        }
    }
}