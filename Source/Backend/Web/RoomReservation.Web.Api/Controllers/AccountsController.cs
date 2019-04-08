using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Novell.Directory.Ldap;
using RoomReservation.Data;
using RoomReservation.Web.Api.Ldap;
using RoomReservation.Web.DataTransferModels.Student;

namespace RoomReservation.Web.Api.Controllers
{
    public class AccountsController : BaseController
    {
        public AccountsController(RoomReservationDbContext context, IConfiguration config, LdapAuthenticationService ldapAuthenticationService, PhasesProvider phasesProvider) : base(context)
        {
            this.Config = config;
            this.LdapAuthenticationService = ldapAuthenticationService;
            this.PhasesProvider = phasesProvider;
        }

        private LdapAuthenticationService LdapAuthenticationService { get; }

        private IConfiguration Config { get; }

        private PhasesProvider PhasesProvider { get; }

        [AllowAnonymous]
        [HttpPost("/api/token")]
        [Consumes("application/x-www-form-urlencoded")]
        public async Task<IActionResult> Token([FromForm]LoginBindingModel model)
        {
            var ldapUser = this.LdapAuthenticationService.Login(model.UserName.Split('@')[0], model.Password);
            /* For dev purposes:
              var ldapUser = new LdapUser{
              DisplayName = "Nikola",
              Description = "100164483",
              Role = "Admin"
            };*/

            if (ldapUser == null)
            {
                return this.BadRequest(new { error_message = "Username or password incorrect!" });
            }

            if (ldapUser.Role == "Admin")
            {
                return this.Ok(new
                {
                    access_token = BuildToken(GetUserClaims("Admin")),
                    userRole = "Admin",
                    phase = PhasesProvider.CurrentPhase,
                    userName = ldapUser.DisplayName,
                    expires = DateTime.Now.AddHours(8)
                });
            }
            else
            {
                var student = await this.Context.Students
                    .FirstOrDefaultAsync(s => s.Id == ldapUser.Description);

                if (student == null || !student.IsOnCampus)
                {
                    return this.Unauthorized();
                }

                return this.Ok(new
                {
                    access_token = BuildToken(GetUserClaims("Student", student.Id)),
                    userRole = "Student",
                    phase = PhasesProvider.CurrentPhase,
                    userName = ldapUser.DisplayName,
                    expires = DateTime.Now.AddHours(8),
                    registration_time = student.RegistrationTime,
                    studentId = student.Id,
                    currentRoomNumber = student.CurrentRoomNumber,
                    previousRoomNumber = student.PreviousRoomNumber
                });
            }
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

        private IEnumerable<Claim> GetUserClaims(string userRole, string studentId = null)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Role, userRole)
            };

            if (studentId != null)
            {
                claims.Add(new Claim(ClaimTypes.NameIdentifier, studentId));
            }

            return claims;
        }
    }
}