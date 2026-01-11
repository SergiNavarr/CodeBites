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
    public class OptionConfiguration : IEntityTypeConfiguration<Option>
    {
        public void Configure(EntityTypeBuilder<Option> builder)
        {
            // Nombre de la tabla
            builder.ToTable("Options");
            builder.HasKey(o => o.Id);

            // Propiedades
            builder.Property(o => o.Text)
                .IsRequired()
                .HasMaxLength(250);

            builder.Property(o => o.IsCorrect)
                .IsRequired()
                .HasDefaultValue(false);

            // Relación N:1 con Question
            builder.HasOne(o => o.Question)
                .WithMany(q => q.Options)
                .HasForeignKey(o => o.QuestionId)
                // Si se borra la pregunta, sus opciones ya no tienen razón de ser
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(o => o.IsActive).HasDefaultValue(true);
            builder.Property(o => o.CreatedAt).IsRequired();
        }
    }
}
