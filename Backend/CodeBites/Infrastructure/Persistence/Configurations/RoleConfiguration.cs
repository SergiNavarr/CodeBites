using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            // 1. Configuraciones de la tabla (Fluent API)
            builder.HasKey(r => r.Id);

            builder.Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(50);

            // 2. Data Seeding (Sembrado de datos)
            builder.HasData(
                new Role
                {
                    Id = Guid.Parse("c2d6f83a-1234-5678-90ab-cdef12345678"),
                    Name = "Admin",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new Role
                {
                    Id = Guid.Parse("a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d"),
                    Name = "User",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                }
            );
        }
    }
}
