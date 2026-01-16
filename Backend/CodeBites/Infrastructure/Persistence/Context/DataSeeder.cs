using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Context
{
    public static class DataSeeder
    {
        public static async Task SeedData(CodebitesDbContext context)
        {
            // Nos aseguramos de que las categorías existan
            if (!await context.Categories.AnyAsync())
            {
                var categories = new List<Category>
            {
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "C# Fundamentals",
                    Description = "Aprende las bases del lenguaje de Microsoft, desde variables hasta POO.",
                    Icon = "terminal", 
                    Color = "#68217A",
                    Lessons = new List<Lesson>
                    {
                        new Lesson { Id = Guid.NewGuid(), Title = "Hola Mundo y Sintaxis", Order = 1, Content = "Contenido de la lección 1..." },
                        new Lesson { Id = Guid.NewGuid(), Title = "Variables y Tipos", Order = 2, Content = "Contenido de la lección 2..." },
                        new Lesson { Id = Guid.NewGuid(), Title = "Estructuras de Control", Order = 3, Content = "Contenido de la lección 3..." }
                    }
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "SQL Essentials",
                    Description = "Domina las consultas relacionales y el diseño de bases de datos.",
                    Icon = "database",
                    Color = "#F29111",
                    Lessons = new List<Lesson>
                    {
                        new Lesson { Id = Guid.NewGuid(), Title = "SELECT y Filtros", Order = 1, Content = "Contenido de SQL 1..." },
                        new Lesson { Id = Guid.NewGuid(), Title = "Joins y Relaciones", Order = 2, Content = "Contenido de SQL 2..." }
                    }
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "React UI",
                    Description = "Crea interfaces modernas y dinámicas con hooks y componentes.",
                    Icon = "layout",
                    Color = "#00D8FF",
                    Lessons = new List<Lesson>
                    {
                        new Lesson { Id = Guid.NewGuid(), Title = "JSX y Componentes", Order = 1, Content = "Contenido de React 1..." },
                        new Lesson { Id = Guid.NewGuid(), Title = "useState y useEffect", Order = 2, Content = "Contenido de React 2..." }
                    }
                }
            };

                await context.Categories.AddRangeAsync(categories);
                await context.SaveChangesAsync();
            }
        }
    }
}
