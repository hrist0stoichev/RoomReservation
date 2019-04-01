
namespace RoomReservation.Web.DataTransferModels.Room
{
    using AutoMapper;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class ApartmentResponseModel : IHaveCustomMappings
    {
        public string Number { get; set; }

        public string ApartmentRoomNumber { get; set; }

        public bool? IsMale { get; set; }

        public int Capacity { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Room, ApartmentResponseModel>()
                .ForMember(arm => arm.Capacity, opts => opts.MapFrom(r => r.Capacity + r.ApartmentRoom.Capacity));
        }
    }
}