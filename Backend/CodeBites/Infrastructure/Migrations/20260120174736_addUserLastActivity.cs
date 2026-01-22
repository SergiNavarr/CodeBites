using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addUserLastActivity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastActivityAt",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d"),
                column: "CreatedAt",
                value: new DateTime(2026, 1, 20, 17, 47, 35, 497, DateTimeKind.Utc).AddTicks(9158));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("c2d6f83a-1234-5678-90ab-cdef12345678"),
                column: "CreatedAt",
                value: new DateTime(2026, 1, 20, 17, 47, 35, 497, DateTimeKind.Utc).AddTicks(9154));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastActivityAt",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d"),
                column: "CreatedAt",
                value: new DateTime(2026, 1, 16, 15, 21, 58, 666, DateTimeKind.Utc).AddTicks(1872));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("c2d6f83a-1234-5678-90ab-cdef12345678"),
                column: "CreatedAt",
                value: new DateTime(2026, 1, 16, 15, 21, 58, 666, DateTimeKind.Utc).AddTicks(1868));
        }
    }
}
