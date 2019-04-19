using System.ComponentModel.DataAnnotations;

namespace RoomReservation.Web.DataTransferModels.Document
{
    public class ContractBindingModel
    {
        [Required]
        public string ContractContent { get; set; }
    }
}