namespace RoomReservation.Web.DataTransferModels.Room
{
    using System.Collections.Generic;
    using System.Linq;
    using AutoMapper;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class StudentDetailedRoomResponseModel : ListedRoomResponseModel, IHaveCustomMappings
    {
        public IList<string> ResidentsNames { get; set; }

        public override void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Room, StudentDetailedRoomResponseModel>()
                .ForMember(lrrm => lrrm.ResidentsCount, opts => opts.MapFrom(r => r.CurrentResidents.Count))
                .ForMember(lrrm => lrrm.ResidentsNames, opts => opts.MapFrom(r => r.CurrentResidents.Select(s => $"{s.FirstName} {s.LastName}")));
        }
    }
}