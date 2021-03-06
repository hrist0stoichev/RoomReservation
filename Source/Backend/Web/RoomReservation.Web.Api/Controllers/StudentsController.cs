using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoomReservation.Common;
using RoomReservation.Data;
using RoomReservation.Data.Models;
using RoomReservation.Web.DataTransferModels.Student;

namespace RoomReservation.Web.Api.Controllers
{
    public class StudentsController : BaseController
    {
        public StudentsController(RoomReservationDbContext context, PhasesProvider phasesProvider) : base(context)
        {
            this.PhasesProvider = phasesProvider;
        }

        private PhasesProvider PhasesProvider { get; }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Get(string orderBy = null, string filter = null)
        {
            return this.Ok(
                await this.Context.Students
                    .ProjectTo<AdminDetailedStudentResponseModel>()
                    .OrderByDynamic(orderBy)
                    .WhereDynamic(filter)
                    .ToListAsync()
            );
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var student = await this.Context.Students
                .AsNoTracking()
                .ProjectTo<AdminDetailedStudentResponseModel>()
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
            {
                return this.NotFound();
            }

            return this.Ok(student);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Post(StudentRequestModel model)
        {
            var studentWithSameIdExists = await this.Context.Students
                .AnyAsync(s => s.Id == model.Id);

            if (studentWithSameIdExists)
            {
                return this.BadRequest(new { error_message = "Student with this Id already exists! " });
            }

            var student = Mapper.Map<Student>(model);

            await this.Context.Students.AddAsync(student);
            await this.Context.SaveChangesAsync();

            return this.Ok(Mapper.Map<AdminDetailedStudentResponseModel>(student));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("batch")]
        public async Task<IActionResult> Post(BatchAddStudentsRequestModel model)
        {
            var allStudents = await this.Context.Students
                .ToListAsync();

            var modelStudentsById = model.Students
                .AsQueryable()
                .ProjectTo<Student>()
                .ToDictionary(s => s.Id, s => s);

            foreach (var student in allStudents)
            {
                var correspondingModelStudent = modelStudentsById.GetValueOrDefault(student.Id, null);

                if (correspondingModelStudent != null)
                {
                    student.CreditHours = (byte)correspondingModelStudent.CreditHours;
                    modelStudentsById.Remove(student.Id);
                }
                else
                {
                    this.Context.Remove(student);
                }
            }

            await this.Context.Students.AddRangeAsync(modelStudentsById.Values);
            await this.Context.SaveChangesAsync();

            return this.Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, EditStudentRequestModel model)
        {
            var student = await this.Context.Students
                .Include(s => s.InvitationsReceived)
                .Include(s => s.InvitationsSent)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
            {
                return this.NotFound();
            }

            if (student.RegistrationTime != model.RegistrationTime && model.RegistrationTime != null)
            {
                if (student.CurrentRoomNumber != null)
                {
                    return this.BadRequest(new { error_message = "You cannot assign a registration time to a student who is already in a room!" });
                }

                if (this.PhasesProvider.GetPhaseForDateTime((DateTime)model.RegistrationTime) != 3)
                {
                    return this.BadRequest(new { error_message = "The registration time must be in phase 3!" });
                }
            }

            if (model.CurrentRoomNumber != null && !(bool)model.IsOnCampus)
            {
                return this.BadRequest(new { error_message = "A student cannot be in a room while off campus!" });
            }

            if (student.Id != model.Id)
            {
                var newIdAlreadyExists = await this.Context.Students
                    .AnyAsync(s => s.Id == model.Id);

                if (newIdAlreadyExists)
                {
                    return this.BadRequest(new { error_message = "A student with this Id already exists!" });
                }
            }

            if (student.CurrentRoomNumber != model.CurrentRoomNumber && model.CurrentRoomNumber != null)
            {
                var newRoomToJoin = await this.Context.Rooms
                    .Include(r => r.CurrentResidents)
                    .Include(r => r.Invitations)
                    .Include(r => r.ApartmentRoom)
                    .FirstOrDefaultAsync(r => r.Number == model.CurrentRoomNumber);

                if (newRoomToJoin == null)
                {
                    return this.NotFound();
                }

                if (newRoomToJoin.IsMale == null)
                {
                    newRoomToJoin.IsMale = model.IsMale;
                    if (newRoomToJoin.ApartmentRoom != null)
                    {
                        newRoomToJoin.ApartmentRoom.IsMale = model.IsMale;
                    }
                }

                if (newRoomToJoin.IsMale != model.IsMale)
                {
                    return this.BadRequest(new { error_message = "The student and room sexes cannot be different!" });
                }

                if (newRoomToJoin.Capacity == newRoomToJoin.CurrentResidents.Count)
                {
                    return this.BadRequest(new { error_message = "The room you are trying to join is already full!" });
                }

                if (newRoomToJoin.Capacity == newRoomToJoin.CurrentResidents.Count + 1)
                {
                    this.Context.Invitations.RemoveRange(newRoomToJoin.Invitations);
                }

                this.Context.Invitations.RemoveRange(student.InvitationsReceived);
                this.Context.Invitations.RemoveRange(student.InvitationsSent);
            }

            if (student.IsMale != model.IsMale && student.CurrentRoomNumber == model.CurrentRoomNumber && student.CurrentRoomNumber != null)
            {
                return this.BadRequest(new { error_message = "The student and room sexes cannot be different!" });
            }

            student.Id = model.Id;
            student.FirstName = model.FirstName;
            student.LastName = model.LastName;
            student.CreditHours = (byte)model.CreditHours;
            student.Email = model.Email;
            student.IsMale = (bool)model.IsMale;
            student.IsRA = (bool)model.IsRA;
            student.IsOnCampus = (bool)model.IsOnCampus;
            student.Comments = model.Comments;
            student.CurrentRoomNumber = model.CurrentRoomNumber;
            student.RegistrationTime = model.RegistrationTime;

            await this.Context.SaveChangesAsync();
            return this.Ok(Mapper.Map<AdminDetailedStudentResponseModel>(student));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var student = await this.Context.Students
                .Include(s => s.InvitationsSent)
                .Include(s => s.InvitationsReceived)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
            {
                return this.NotFound();
            }

            this.Context.Invitations.RemoveRange(student.InvitationsSent);
            this.Context.Invitations.RemoveRange(student.InvitationsReceived);
            this.Context.Students.Remove(student);

            await this.Context.SaveChangesAsync();

            return this.Ok();
        }
    }
}