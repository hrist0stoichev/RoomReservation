using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RoomReservation.Data;
using RoomReservation.Web.DataTransferModels.Student;

namespace RoomReservation.Web.Api.Controllers
{
    public class AccountsController : BaseController
    {
        public AccountsController(RoomReservationDbContext context, IConfiguration config) : base(context)
        { 
            this.Config = config;
        }

        private IConfiguration Config { get; }

        [AllowAnonymous]
        [HttpPost("/api/token")]
        [Consumes("application/x-www-form-urlencoded")]
        public IActionResult Token([FromForm]LoginBindingModel model)
        {
            var userClaims = GetUserClaims(model.Role);
            var tokenString = this.BuildToken(userClaims);

            var response = new
            {
                access_token = tokenString,
                userRole = model.Role,
                phase = (int) model.Phase,
                userName = model.UserName,
                expires = DateTime.Now.AddHours(8)
            };

            return Ok(response);
        }

        private string BuildToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.Config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: this.Config["Jwt:Issuer"],
                audience: this.Config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddHours(8),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private IEnumerable<Claim> GetUserClaims(string userRole)
        {
            return new List<Claim>() 
            { 
                new Claim(ClaimTypes.Role, userRole),
                new Claim(ClaimTypes.NameIdentifier, "100136822")
            };
        }
    }
}