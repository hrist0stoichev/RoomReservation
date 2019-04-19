using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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

        [HttpGet]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> GetStatistics()
        {
            var studentsQuery = this.Context.Students;
            var totalStudents = await studentsQuery.CountAsync();
            var studentsOnCampus = await studentsQuery.Where(s => s.IsOnCampus).CountAsync();

            var rooms = await this.Context.Rooms
                .AsNoTracking()
                .Select(r => new { r.Number, ResidentsCount = r.CurrentResidents.Count })
                .ToListAsync();

            var roomsBySkapto = rooms
                .GroupBy(r => r.Number[0])
                .ToDictionary(g => g.Key, g => g.ToList());

            var response = new 
            {
                StudentsOnCampus = studentsOnCampus,
                StudentsOffCampus = totalStudents - studentsOnCampus,
                TotalStudents = totalStudents,
                Skapto1FreeRooms = roomsBySkapto['1']?.Where(r => r.ResidentsCount == 0)?.Count() ?? -1,
                Skapto1OccupiedRooms = roomsBySkapto['1']?.Where(r => r.ResidentsCount > 0)?.Count() ?? -1,
                Skapto1TotalRooms = roomsBySkapto['1']?.Count() ?? -1,
                Skapto2FreeRooms = roomsBySkapto['2']?.Where(r => r.ResidentsCount == 0)?.Count() ?? -1,
                Skapto2OccupiedRooms = roomsBySkapto['2']?.Where(r => r.ResidentsCount > 0)?.Count() ?? -1,
                Skapto2TotalRooms = roomsBySkapto['2']?.Count() ?? -1,
                Skapto3FreeRooms = roomsBySkapto['3']?.Where(r => r.ResidentsCount == 0)?.Count() ?? -1,
                Skapto3OccupiedRooms = roomsBySkapto['3']?.Where(r => r.ResidentsCount > 0)?.Count() ?? -1,
                Skapto3TotalRooms = roomsBySkapto['3']?.Count() ?? -1
            };

            return this.Ok(response);
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