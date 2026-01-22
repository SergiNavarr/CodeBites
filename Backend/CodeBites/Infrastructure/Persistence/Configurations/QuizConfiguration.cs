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
    public class QuizConfiguration : IEntityTypeConfiguration<Quiz>
    {
        public void Configure(EntityTypeBuilder<Quiz> builder)
        {
            builder.ToTable("Quizzes");

            builder.HasKey(q => q.LessonId);

            builder.Property(q => q.Title)
                .HasMaxLength(150);

            // Relación 1:1 con Lesson
            builder.HasOne(q => q.Lesson)
                .WithOne(l => l.Quiz)
                .HasForeignKey<Quiz>(q => q.LessonId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Ignore(q => q.Id);

            builder.HasMany(q => q.Questions)
                .WithOne(quest => quest.Quiz)
                .HasForeignKey(quest => quest.QuizId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(q => q.IsActive).HasDefaultValue(true);
            builder.Property(q => q.CreatedAt).IsRequired();
        }
    }
}
