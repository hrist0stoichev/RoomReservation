﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RoomReservation.Data;

namespace RoomReservation.Data.Migrations
{
    [DbContext(typeof(RoomReservationDbContext))]
    [Migration("20190321235400_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RoomReservation.Data.Models.Invitation", b =>
                {
                    b.Property<string>("ToStudentId");

                    b.Property<string>("FromStudentId");

                    b.Property<string>("RoomNumber");

                    b.HasKey("ToStudentId", "FromStudentId", "RoomNumber");

                    b.HasAlternateKey("FromStudentId", "RoomNumber", "ToStudentId");

                    b.HasIndex("RoomNumber");

                    b.ToTable("Invitations");
                });

            modelBuilder.Entity("RoomReservation.Data.Models.Room", b =>
                {
                    b.Property<string>("Number")
                        .HasMaxLength(4);

                    b.Property<string>("ApartmentRoomNumber");

                    b.Property<byte>("Capacity");

                    b.Property<string>("Comments")
                        .HasMaxLength(500);

                    b.Property<bool>("IsMale");

                    b.Property<bool>("IsRA");

                    b.Property<bool>("IsReserved");

                    b.HasKey("Number");

                    b.HasIndex("ApartmentRoomNumber")
                        .IsUnique()
                        .HasFilter("[ApartmentRoomNumber] IS NOT NULL");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("RoomReservation.Data.Models.Student", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(9);

                    b.Property<string>("Comments")
                        .HasMaxLength(500);

                    b.Property<byte>("CreditHours");

                    b.Property<string>("CurrentRoomNumber");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<bool>("IsBanned");

                    b.Property<bool>("IsDepositPaid");

                    b.Property<bool>("IsMale");

                    b.Property<bool>("IsOnCampus");

                    b.Property<bool>("IsRA");

                    b.Property<bool>("IsRoomConfirmed");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("MiddleName")
                        .HasMaxLength(50);

                    b.Property<DateTime>("RegistrationTime");

                    b.HasKey("Id");

                    b.HasIndex("CurrentRoomNumber");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("RoomReservation.Data.Models.Invitation", b =>
                {
                    b.HasOne("RoomReservation.Data.Models.Student", "FromStudent")
                        .WithMany("InvitationsSent")
                        .HasForeignKey("FromStudentId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("RoomReservation.Data.Models.Room", "Room")
                        .WithMany("Invitations")
                        .HasForeignKey("RoomNumber")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("RoomReservation.Data.Models.Student", "ToStudent")
                        .WithMany("InvitationsReceived")
                        .HasForeignKey("ToStudentId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RoomReservation.Data.Models.Room", b =>
                {
                    b.HasOne("RoomReservation.Data.Models.Room", "ApartmentRoom")
                        .WithOne()
                        .HasForeignKey("RoomReservation.Data.Models.Room", "ApartmentRoomNumber")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("RoomReservation.Data.Models.Student", b =>
                {
                    b.HasOne("RoomReservation.Data.Models.Room", "CurrentRoom")
                        .WithMany("Residents")
                        .HasForeignKey("CurrentRoomNumber")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}