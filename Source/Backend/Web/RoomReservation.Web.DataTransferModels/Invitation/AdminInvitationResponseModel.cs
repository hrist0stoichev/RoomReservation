namespace RoomReservation.Web.DataTransferModels.Invitation
{
    using AutoMapper;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class AdminInvitationResponseModel : StudentInvitationResponseModel, IHaveCustomMappings
    {
        public string FromStudentId { get; set; }

        public string ToStudentId { get; set; }

        public override void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Invitation, AdminInvitationResponseModel>()
                .ForMember(airm => airm.FromStudentName, opts => opts.MapFrom(i => i.FromStudent.FirstName + " " + i.FromStudent.LastName))
                .ForMember(airm => airm.ToStudentName, opts => opts.MapFrom(i => i.ToStudent.FirstName + " " + i.ToStudent.LastName));
        }
    }
}