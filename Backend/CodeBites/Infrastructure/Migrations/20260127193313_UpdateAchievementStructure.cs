using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAchievementStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Condition",
                table: "Achievements");

            migrationBuilder.AddColumn<int>(
                name: "TargetValue",
                table: "Achievements",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Achievements",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d"),
                column: "CreatedAt",
                value: new DateTime(2026, 1, 27, 19, 33, 11, 984, DateTimeKind.Utc).AddTicks(1683));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("c2d6f83a-1234-5678-90ab-cdef12345678"),
                column: "CreatedAt",
                value: new DateTime(2026, 1, 27, 19, 33, 11, 984, DateTimeKind.Utc).AddTicks(1680));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TargetValue",
                table: "Achievements");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Achievements");

            migrationBuilder.AddColumn<string>(
                name: "Condition",
                table: "Achievements",
                type: "character varying(250)",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d"),
                column: "CreatedAt",
                value: new DateTime(2026, 1, 21, 13, 23, 11, 931, DateTimeKind.Utc).AddTicks(693));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("c2d6f83a-1234-5678-90ab-cdef12345678"),
                column: "CreatedAt",
                value: new DateTime(2026, 1, 21, 13, 23, 11, 931, DateTimeKind.Utc).AddTicks(690));
        }
    }
}
