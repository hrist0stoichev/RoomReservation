using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RoomReservation.Data.Migrations
{
    public partial class _2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Residents");

            migrationBuilder.DropColumn(
                name: "IsAvailable",
                table: "Rooms");

            migrationBuilder.RenameColumn(
                name: "IsSingle",
                table: "Rooms",
                newName: "IsReserved");

            migrationBuilder.RenameColumn(
                name: "CurrentResidentsCount",
                table: "Rooms",
                newName: "Capacity");

            migrationBuilder.AddColumn<int>(
                name: "ApartmentRoomNumber",
                table: "Rooms",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "Rooms",
                maxLength: 500,
                nullable: true);

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
                    CurrentRoomNumber = table.Column<int>(nullable: true)
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
                    FromStudentId1 = table.Column<string>(nullable: true),
                    RoomNumber = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => new { x.ToStudentId, x.FromStudentId });
                    table.UniqueConstraint("AK_Invitations_FromStudentId_ToStudentId", x => new { x.ToStudentId, x.FromStudentId });
                    table.ForeignKey(
                        name: "FK_Invitations_Students_FromStudentId1",
                        column: x => x.FromStudentId1,
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
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_ApartmentRoomNumber",
                table: "Rooms",
                column: "ApartmentRoomNumber",
                unique: true,
                filter: "[ApartmentRoomNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_FromStudentId1",
                table: "Invitations",
                column: "FromStudentId1");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_RoomNumber",
                table: "Invitations",
                column: "RoomNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Students_CurrentRoomNumber",
                table: "Students",
                column: "CurrentRoomNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Rooms_ApartmentRoomNumber",
                table: "Rooms",
                column: "ApartmentRoomNumber",
                principalTable: "Rooms",
                principalColumn: "Number",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Rooms_ApartmentRoomNumber",
                table: "Rooms");

            migrationBuilder.DropTable(
                name: "Invitations");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_ApartmentRoomNumber",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "ApartmentRoomNumber",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "Comments",
                table: "Rooms");

            migrationBuilder.RenameColumn(
                name: "IsReserved",
                table: "Rooms",
                newName: "IsSingle");

            migrationBuilder.RenameColumn(
                name: "Capacity",
                table: "Rooms",
                newName: "CurrentResidentsCount");

            migrationBuilder.AddColumn<bool>(
                name: "IsAvailable",
                table: "Rooms",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Residents",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 9, nullable: false),
                    CreditHours = table.Column<byte>(nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    IsMale = table.Column<bool>(nullable: false),
                    IsRA = table.Column<bool>(nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(maxLength: 50, nullable: true),
                    RoomId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Residents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Residents_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Number",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Residents_RoomId",
                table: "Residents",
                column: "RoomId");
        }
    }
}
