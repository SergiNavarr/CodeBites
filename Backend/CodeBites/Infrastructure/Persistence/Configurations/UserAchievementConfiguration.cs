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
    public class UserAchievementConfiguration : IEntityTypeConfiguration<UserAchievement>
    {
        public void Configure(EntityTypeBuilder<UserAchievement> builder)
        {
            // Nombre de la tabla
            builder.ToTable("UserAchievements");
            builder.HasKey(ua => ua.Id);

            // Propiedades
            builder.Property(ua => ua.UnlockedAt)
                .IsRequired();

            builder.HasIndex(ua => new { ua.UserId, ua.AchievementId })
                .IsUnique();

            // Relaciones

            // Relación con User
            builder.HasOne(ua => ua.User)
                .WithMany(u => u.Achievements)
                .HasForeignKey(ua => ua.UserId)
                // Si se borra el usuario (borrado físico), se borran sus medallas.
                .OnDelete(DeleteBehavior.Cascade);

            // Relación con Achievement
            builder.HasOne(ua => ua.Achievement)
                .WithMany(a => a.UserAchievements)
                .HasForeignKey(ua => ua.AchievementId)
                // Protegemos el catálogo: No se puede borrar un logro del sistema
                // si ya hay usuarios que lo poseen.
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(ua => ua.IsActive).HasDefaultValue(true);
            builder.Property(ua => ua.CreatedAt).IsRequired();
        }
    }
}
