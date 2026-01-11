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
    public class UserProgressConfiguration : IEntityTypeConfiguration<UserProgress>
    {
        public void Configure(EntityTypeBuilder<UserProgress> builder)
        {
            // Nombre de la tabla
            builder.ToTable("UserProgress");
            builder.HasKey(up => up.Id);

            // Propiedades
            builder.Property(up => up.Score)
                .IsRequired();

            builder.Property(up => up.CompletedAt)
                .IsRequired();

            // ÍNDICES

            // Índice compuesto: Optimiza saber "Si el Usuario X ya hizo la Lección Y"
            builder.HasIndex(up => new { up.UserId, up.LessonId });

            // Índice en CompletedAt: Acelera el cálculo de rachas diarias
            builder.HasIndex(up => up.CompletedAt);

            // 5. Relaciones

            // Relación con User
            builder.HasOne(up => up.User)
                .WithMany(u => u.Progress)
                .HasForeignKey(up => up.UserId)
                //No borramos el progreso si se borra el usuario (mejor usar Soft Delete)
                .OnDelete(DeleteBehavior.Restrict);

            // Relación con Lesson
            builder.HasOne(up => up.Lesson)
                .WithMany(l => l.UserProgresses)
                .HasForeignKey(up => up.LessonId)
                //Si una lección se borra, queremos mantener el registro histórico
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(up => up.IsActive).HasDefaultValue(true);
            builder.Property(up => up.CreatedAt).IsRequired();
        }
    }
}
