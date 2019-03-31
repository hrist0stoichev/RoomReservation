using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RoomReservation.Data.Migrations
{
    public partial class _5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Invitations_FromStudentId_RoomNumber_ToStudentId",
                table: "Invitations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invitations",
                table: "Invitations");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Invitations",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invitations",
                table: "Invitations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_ToStudentId",
                table: "Invitations",
                column: "ToStudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_FromStudentId_ToStudentId",
                table: "Invitations",
                columns: new[] { "FromStudentId", "ToStudentId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Invitations",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_ToStudentId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_FromStudentId_ToStudentId",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Invitations");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Invitations_FromStudentId_RoomNumber_ToStudentId",
                table: "Invitations",
                columns: new[] { "FromStudentId", "RoomNumber", "ToStudentId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invitations",
                table: "Invitations",
                columns: new[] { "ToStudentId", "FromStudentId", "RoomNumber" });
        }
    }
}
