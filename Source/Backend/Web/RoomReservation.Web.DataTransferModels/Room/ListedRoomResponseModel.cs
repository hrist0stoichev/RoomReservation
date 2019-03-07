namespace RoomReservation.Web.DataTransferModels.Room
{
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class ListedRoomResponseModel : IMapFrom<Room>
    {
        public ushort Number { get; set; }

        public byte CurrentResidentsCount { get; set; }
    }
}