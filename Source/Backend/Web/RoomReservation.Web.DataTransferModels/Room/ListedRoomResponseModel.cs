namespace RoomReservation.Web.DataTransferModels.Room
{
    using AutoMapper;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class ListedRoomResponseModel : IHaveCustomMappings
    {
        public string Number { get; set; }

        public byte Capacity { get; set; }

        public string ApartmentRoomNumber { get; set; }

        public byte ResidentsCount { get; set; }

        public virtual void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Room, ListedRoomResponseModel>()
                .ForMember(lrrm => lrrm.ResidentsCount, opts => opts.MapFrom(r => r.Residents.Count));
        }
    }
}