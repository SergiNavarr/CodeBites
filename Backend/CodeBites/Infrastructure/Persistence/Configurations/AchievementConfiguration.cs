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
    public class AchievementConfiguration : IEntityTypeConfiguration<Achievement>
    {
        public void Configure(EntityTypeBuilder<Achievement> builder)
        {
            // Nombre de la tabla
            builder.ToTable("Achievements");
            builder.HasKey(a => a.Id);

            // Propiedades
            builder.Property(a => a.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasIndex(a => a.Name)
                .IsUnique();

            builder.Property(a => a.Description)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(a => a.IconUrl)
                .HasMaxLength(255);

            builder.Property(a => a.Condition)
                .IsRequired()
                .HasMaxLength(250);


            // Relación 1:N con UserAchievement
            builder.HasMany(a => a.UserAchievements)
                .WithOne(ua => ua.Achievement)
                .HasForeignKey(ua => ua.AchievementId)
                // No permitimos borrar un logro si ya hay usuarios que lo ganaron.
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(a => a.IsActive).HasDefaultValue(true);
            builder.Property(a => a.CreatedAt).IsRequired();
        }
    }
}
