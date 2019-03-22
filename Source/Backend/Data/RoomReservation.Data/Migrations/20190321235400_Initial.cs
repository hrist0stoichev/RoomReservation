using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RoomReservation.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Number = table.Column<string>(maxLength: 4, nullable: false),
                    Capacity = table.Column<byte>(nullable: false),
                    IsRA = table.Column<bool>(nullable: false),
                    IsMale = table.Column<bool>(nullable: false),
                    IsReserved = table.Column<bool>(nullable: false),
                    Comments = table.Column<string>(maxLength: 500, nullable: true),
                    ApartmentRoomNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Number);
                    table.ForeignKey(
                        name: "FK_Rooms_Rooms_ApartmentRoomNumber",
                        column: x => x.ApartmentRoomNumber,
                        principalTable: "Rooms",
                        principalColumn: "Number",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 9, nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(maxLength: 50, nullable: true),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    RegistrationTime = table.Column<DateTime>(nullable: false),
                    CreditHours = table.Column<byte>(nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    IsMale = table.Column<bool>(nullable: false),
                    IsRA = table.Column<bool>(nullable: false),
                    IsRoomConfirmed = table.Column<bool>(nullable: false),
                    IsBanned = table.Column<bool>(nullable: false),
                    IsOnCampus = table.Column<bool>(nullable: false),
                    IsDepositPaid = table.Column<bool>(nullable: false),
                    Comments = table.Column<string>(maxLength: 500, nullable: true),
                    CurrentRoomNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_Rooms_CurrentRoomNumber",
                        column: x => x.CurrentRoomNumber,
                        principalTable: "Rooms",
                        principalColumn: "Number",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Invitations",
                columns: table => new
                {
                    FromStudentId = table.Column<string>(nullable: false),
                    ToStudentId = table.Column<string>(nullable: false),
                    RoomNumber = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => new { x.ToStudentId, x.FromStudentId, x.RoomNumber });
                    table.UniqueConstraint("AK_Invitations_FromStudentId_RoomNumber_ToStudentId", x => new { x.FromStudentId, x.RoomNumber, x.ToStudentId });
                    table.ForeignKey(
                        name: "FK_Invitations_Students_FromStudentId",
                        column: x => x.FromStudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Invitations_Rooms_RoomNumber",
                        column: x => x.RoomNumber,
                        principalTable: "Rooms",
                        principalColumn: "Number",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Invitations_Students_ToStudentId",
                        column: x => x.ToStudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_RoomNumber",
                table: "Invitations",
                column: "RoomNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_ApartmentRoomNumber",
                table: "Rooms",
                column: "ApartmentRoomNumber",
                unique: true,
                filter: "[ApartmentRoomNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Students_CurrentRoomNumber",
                table: "Students",
                column: "CurrentRoomNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invitations");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Rooms");
        }
    }
}
