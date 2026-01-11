using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    public class QuizConfiguration : IEntityTypeConfiguration<Quiz>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Quiz> builder)
        {
            // Nombre de la tabla
            builder.ToTable("Quizzes");
            builder.HasKey(q => q.Id);

            builder.Property(q => q.Title)
                .HasMaxLength(150); 

            // Relación 1:1 con Lesson
            builder.HasOne(q => q.Lesson)
                .WithOne(l => l.Quiz)
                .HasForeignKey<Quiz>(q => q.LessonId)
                // Integridad: Sin lección no hay evaluación.
                .OnDelete(DeleteBehavior.Cascade);

            // Relación 1:N con Question
            builder.HasMany(q => q.Questions)
                .WithOne(quest => quest.Quiz)
                .HasForeignKey(quest => quest.QuizId)
                // Si el administrador borra el Quiz, se borran todas sus preguntas.
                .OnDelete(DeleteBehavior.Cascade);

            // Configuración de BaseEntity
            builder.Property(q => q.IsActive).HasDefaultValue(true);
            builder.Property(q => q.CreatedAt).IsRequired();
        }
    }
}
