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
    public class QuestionConfiguration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.ToTable("Questions");
            builder.HasKey(q => q.Id);

            // Propiedades
            builder.Property(q => q.Text)
                .IsRequired()
                .HasMaxLength(500);

            // Relaciones

            // Relación N:1 con Quiz
            builder.HasOne(q => q.Quiz)
                .WithMany(qz => qz.Questions)
                .HasForeignKey(q => q.QuizId)
                // Integridad: Si se borra el Quiz, las preguntas no tienen sentido.
                .OnDelete(DeleteBehavior.Cascade);

            // Relación 1:N con Option
            builder.HasMany(q => q.Options)
                .WithOne(o => o.Question)
                .HasForeignKey(o => o.QuestionId)
                // Si borramos la pregunta, sus opciones deben desaparecer.
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(q => q.IsActive).HasDefaultValue(true);
            builder.Property(q => q.CreatedAt).IsRequired();
        }
    }
}
