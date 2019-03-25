using Microsoft.EntityFrameworkCore.Migrations;

namespace RoomReservation.Data.Migrations
{
    public partial class _4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsBanned",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "IsDepositPaid",
                table: "Students");

            migrationBuilder.AddColumn<string>(
                name: "PreviousRoomNumber",
                table: "Students",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_PreviousRoomNumber",
                table: "Students",
                column: "PreviousRoomNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Rooms_PreviousRoomNumber",
                table: "Students",
                column: "PreviousRoomNumber",
                principalTable: "Rooms",
                principalColumn: "Number",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Rooms_PreviousRoomNumber",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_PreviousRoomNumber",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "PreviousRoomNumber",
                table: "Students");

            migrationBuilder.AddColumn<bool>(
                name: "IsBanned",
                table: "Students",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDepositPaid",
                table: "Students",
                nullable: false,
                defaultValue: false);
        }
    }
}
