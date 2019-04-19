using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoomReservation.Web.DataTransferModels.Document;

namespace RoomReservation.Web.Api.Controllers
{
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly string CONTRACT_PATH;

        public DocumentsController()
        {
            CONTRACT_PATH = System.IO.Path.Combine(Environment.CurrentDirectory.ToString(), "contract.txt");
        }

        [AllowAnonymous]
        [HttpGet("api/contract")]
        public IActionResult GetContract()
        {
            var model = new ContractBindingModel
            {
                ContractContent = System.IO.File.ReadAllText(CONTRACT_PATH)
            };

            return this.Ok(model);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("api/contract")]
        public IActionResult ModifyContract(ContractBindingModel model)
        {
            System.IO.File.WriteAllText(CONTRACT_PATH, model.ContractContent);
            return this.Ok(model);
        }
    }
}