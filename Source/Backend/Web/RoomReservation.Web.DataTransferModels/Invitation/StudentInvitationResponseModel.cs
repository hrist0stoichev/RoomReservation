namespace RoomReservation.Web.DataTransferModels.Invitation
{
    using AutoMapper;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class StudentInvitationResponseModel : IHaveCustomMappings
    {
        public int Id { get; set; }

        public string FromStudentName { get; set; }

        public string ToStudentName { get; set; }

        public string RoomNumber { get; set; }

        public virtual void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Invitation, StudentInvitationResponseModel>()
                .ForMember(airm => airm.ToStudentName, opts => opts.MapFrom(i => i.ToStudent.FirstName + " " + i.ToStudent.LastName))
                .ForMember(airm => airm.FromStudentName, opts => opts.MapFrom(i => i.FromStudent.FirstName + " " + i.FromStudent.LastName));
        }
    }
}