using Microsoft.EntityFrameworkCore.Migrations;

namespace RoomReservation.Data.Migrations
{
    public partial class _6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Rooms_RoomNumber",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Rooms_ApartmentRoomNumber",
                table: "Rooms");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Rooms_RoomNumber",
                table: "Invitations",
                column: "RoomNumber",
                principalTable: "Rooms",
                principalColumn: "Number",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Rooms_ApartmentRoomNumber",
                table: "Rooms",
                column: "ApartmentRoomNumber",
                principalTable: "Rooms",
                principalColumn: "Number",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Rooms_RoomNumber",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Rooms_ApartmentRoomNumber",
                table: "Rooms");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Rooms_RoomNumber",
                table: "Invitations",
                column: "RoomNumber",
                principalTable: "Rooms",
                principalColumn: "Number",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Rooms_ApartmentRoomNumber",
                table: "Rooms",
                column: "ApartmentRoomNumber",
                principalTable: "Rooms",
                principalColumn: "Number",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
