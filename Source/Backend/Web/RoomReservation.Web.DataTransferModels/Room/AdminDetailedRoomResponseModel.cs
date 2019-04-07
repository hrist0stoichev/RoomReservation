namespace RoomReservation.Web.DataTransferModels.Room
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using AutoMapper;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;
    using RoomReservation.Web.DataTransferModels.Invitation;
    using RoomReservation.Web.DataTransferModels.Student;

    public class AdminDetailedRoomResponseModel : ListedRoomResponseModel, IHaveCustomMappings
    {
        public string Comments { get; set; }

        public List<(string Id, string FullName)> Residents { get; set; }

        public List<AdminInvitationResponseModel> Invitations { get; set; }

        public override void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Room, AdminDetailedRoomResponseModel>()
                .ForMember(lrrm => lrrm.ResidentsCount, opts => opts.MapFrom(r => r.CurrentResidents.Count))
                .ForMember(lrrm => lrrm.Residents, opts => opts.MapFrom(r => r.CurrentResidents.Select(res => new Tuple<string, string>(res.Id, $"{res.FirstName} {res.LastName}"))))
                .ForMember(lrrm => lrrm.Invitations, opts => opts.MapFrom(r => r.Invitations));
        }
    }
}