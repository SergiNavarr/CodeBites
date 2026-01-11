using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
    {
        public void Configure(EntityTypeBuilder<Lesson> builder)
        {
            builder.ToTable("Lessons");
            builder.HasKey(l => l.Id);

            builder.Property(l => l.Title)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(l => l.Content)
                .IsRequired()
                .HasColumnType("text");

            builder.Property(l => l.Difficulty)
                .HasConversion<int>()
                .IsRequired();

            builder.Property(l => l.PointsReward)
                .IsRequired()
                .HasDefaultValue(10);

            // Relación 1:N con Category
            builder.HasOne(l => l.Category)
                .WithMany(c => c.Lessons)
                .HasForeignKey(l => l.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Relación 1:1 con Quiz
            builder.HasOne(l => l.Quiz)
                .WithOne(q => q.Lesson)
                .HasForeignKey<Quiz>(q => q.LessonId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(l => l.IsActive).HasDefaultValue(true);
            builder.Property(l => l.CreatedAt).IsRequired();
        }
    }
}
