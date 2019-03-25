namespace RoomReservation.Web.DataTransferModels.Room
{
    using System.Collections.Generic;
    using System.Linq;
    using AutoMapper;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;
    using RoomReservation.Web.DataTransferModels.Invitation;
    using RoomReservation.Web.DataTransferModels.Student;

    public class AdminDetailedRoomResponseModel : ListedRoomResponseModel, IHaveCustomMappings
    {
        public bool IsRA { get; set; }

        public bool IsMale { get; set; }

        public bool IsReserved { get; set; }

        public string Comments { get; set; }

        public AdminDetailedRoomResponseModel ApartmentRoom { get; set; }

        public List<AdminDetailedStudentResponseModel> Residents { get; set; }

        public List<AdminInvitationResponseModel> Invitations { get; set; }

        public override void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Room, AdminDetailedRoomResponseModel>()
                .ForMember(lrrm => lrrm.ResidentsCount, opts => opts.MapFrom(r => r.CurrentResidents.Count));
        }
    }
}