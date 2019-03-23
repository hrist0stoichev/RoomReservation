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
        public StudentsController(RoomReservationDbContext context) : base(context)
        { }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Get(string orderBy = null, string filter = null, int top = 20, int skip = 0)
        {
            return this.Ok(
                await this.Context.Students
                    .ProjectTo<AdminDetailedStudentResponseModel>()
                    .OrderByDynamic(orderBy)
                    .WhereDynamic(filter)
                    .Paginate(skip, top)
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
        public async Task<IActionResult> Post(List<BasicStudentRequestModel> model)
        {
            var allStudents = await this.Context.Students
                .ToListAsync();

            var modelStudentsById = model
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
    }
}