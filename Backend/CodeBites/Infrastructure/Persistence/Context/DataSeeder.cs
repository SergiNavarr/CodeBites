using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Context
{
    public static class DataSeeder
    {
        public static async Task SeedData(CodebitesDbContext context)
        {
            if (!await context.Achievements.AnyAsync())
            {
                var achievements = new List<Achievement>
                {
                    new Achievement
                    {
                        Id = Guid.NewGuid(),
                        Name = "Primer Bocado",
                        Description = "Completaste tu primera lección.",
                        IconUrl = "zap",
                        Type = AchievementType.FirstLesson,
                        TargetValue = 1,
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true
                    },
                    new Achievement
                    {
                        Id = Guid.NewGuid(),
                        Name = "Racha de Fuego",
                        Description = "Mantuviste una racha de 3 días.",
                        IconUrl = "flame",
                        Type = AchievementType.Streak,
                        TargetValue = 3,
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true
                    },
                    new Achievement
                    {
                        Id = Guid.NewGuid(),
                        Name = "Junior Developer",
                        Description = "Acumulaste 500 puntos de experiencia.",
                        IconUrl = "trophy",
                        Type = AchievementType.TotalPoints,
                        TargetValue = 500,
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true
                    },
                    new Achievement
                    {
                        Id = Guid.NewGuid(),
                        Name = "Code Master",
                        Description = "Acumulaste 1000 puntos de experiencia.",
                        IconUrl = "crown",
                        Type = AchievementType.TotalPoints,
                        TargetValue = 1000,
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true
                    }
                };

                await context.Achievements.AddRangeAsync(achievements);
                await context.SaveChangesAsync();
            }

            if (await context.Categories.AnyAsync()) return;

            var categoriesData = GetFullContentMap();
            var categoriesToSeed = new List<Category>();
            var quizzesToSeed = new List<Quiz>();

            foreach (var catData in categoriesData)
            {
                var categoryId = Guid.NewGuid();
                var lessons = new List<Lesson>();

                for (int i = 0; i < catData.Lessons.Count; i++)
                {
                    var lessonData = catData.Lessons[i];
                    var lessonId = Guid.NewGuid();

                    var lesson = new Lesson
                    {
                        Id = lessonId,
                        Title = lessonData.Title,
                        Content = lessonData.Content,
                        Order = i + 1,
                        PointsReward = 100,
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true
                    };
                    lessons.Add(lesson);

                    var quiz = new Quiz
                    {
                        LessonId = lessonId,
                        Title = $"Evaluación: {lessonData.Title}",
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true,
                        Questions = lessonData.Questions.Select(q => new Question
                        {
                            Id = Guid.NewGuid(),
                            Text = q.Text,
                            QuizId = lessonId,
                            Options = q.Options.Select(o => new Option
                            {
                                Id = Guid.NewGuid(),
                                Text = o.Text,
                                IsCorrect = o.IsCorrect
                            }).ToList()
                        }).ToList()
                    };
                    quizzesToSeed.Add(quiz);
                }

                categoriesToSeed.Add(new Category
                {
                    Id = categoryId,
                    Name = catData.Name,
                    Description = catData.Description,
                    Icon = catData.Icon,
                    Color = catData.Color,
                    Lessons = lessons,
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                });
            }

            await context.Categories.AddRangeAsync(categoriesToSeed);
            await context.Quizzes.AddRangeAsync(quizzesToSeed);
            await context.SaveChangesAsync();
        }

        private static List<CategorySeedMap> GetFullContentMap()
        {
            return new List<CategorySeedMap>
            {
                new CategorySeedMap("C# Mastery", "De cero a experto en el lenguaje de .NET", "terminal", "#68217A", new List<LessonSeedMap> {
                    GenerateLesson("Sintaxis Básica", "C# es un lenguaje de tipado fuerte...", "Punto de entrada", "Main", "Estructura de control", "If/Else"),
                    GenerateLesson("Tipos de Datos", "Existen tipos por valor y por referencia...", "Tipo entero", "int", "Tipo decimal", "decimal"),
                    GenerateLesson("POO: Clases", "Las clases son plantillas para objetos...", "Instancia", "new", "Miembro", "Property"),
                    GenerateLesson("Interfaces", "Definen un contrato que las clases deben seguir...", "Palabra clave", "interface", "Implementación", "implements"),
                    GenerateLesson("Manejo de Excepciones", "Uso de try-catch para errores...", "Bloque final", "finally", "Lanzar error", "throw"),
                    GenerateLesson("LINQ", "Consultas potentes sobre colecciones...", "Filtrar", "Where", "Proyectar", "Select"),
                    GenerateLesson("Async/Await", "Programación no bloqueante...", "Retorno asíncrono", "Task", "Esperar", "await"),
                    GenerateLesson("Generics", "Reutilización de código con tipos...", "Símbolo", "<T>", "Restricción", "where")
                }),
                new CategorySeedMap("SQL & Databases", "Domina el lenguaje de los datos", "database", "#F29111", new List<LessonSeedMap> {
                    GenerateLesson("Intro a SQL", "SQL es el estándar para RDBMS...", "Lenguaje", "Declarativo", "Comando", "SELECT"),
                    GenerateLesson("Filtrado", "Uso de WHERE y operadores...", "Filtro", "WHERE", "Comparación", "LIKE"),
                    GenerateLesson("Inner Joins", "Combinar tablas con claves foráneas...", "Unión", "JOIN", "Condición", "ON"),
                    GenerateLesson("Funciones Agregadas", "COUNT, SUM y AVG...", "Contar", "COUNT", "Agrupar", "GROUP BY"),
                    GenerateLesson("Subconsultas", "Consultas dentro de otras consultas...", "Anidamiento", "Subquery", "Inclusión", "IN"),
                    GenerateLesson("Diseño: PK y FK", "Integridad referencial...", "Clave primaria", "PK", "Clave foránea", "FK"),
                    GenerateLesson("Índices", "Optimización de velocidad de búsqueda...", "Estructura", "B-Tree", "Único", "UNIQUE"),
                    GenerateLesson("Transacciones", "ACID: Atomicidad y Consistencia...", "Confirmar", "COMMIT", "Revertir", "ROLLBACK")
                }),
                new CategorySeedMap("React UI", "Interfaces modernas y reactivas", "layout", "#00D8FF", new List<LessonSeedMap> {
                    GenerateLesson("JSX Fundamentals", "JSX permite escribir HTML en JS...", "Extensión", "js/tsx", "Retorno", "Component"),
                    GenerateLesson("State: useState", "El estado maneja la memoria del componente...", "Hook", "useState", "Actualización", "setter"),
                    GenerateLesson("Effects: useEffect", "Sincronización con sistemas externos...", "Efecto", "useEffect", "Dependencias", "Array"),
                    GenerateLesson("Props & Data Flow", "Paso de datos de padres a hijos...", "Propiedad", "props", "Dirección", "Unidireccional"),
                    GenerateLesson("Listas y Keys", "Renderizado dinámico de arreglos...", "Identificador", "key", "Mapeo", "map()"),
                    GenerateLesson("Context API", "Gestión de estado global nativa...", "Productor", "Provider", "Consumidor", "useContext"),
                    GenerateLesson("React Router", "Navegación entre páginas...", "Enlace", "Link", "Ruta", "Route"),
                    GenerateLesson("Custom Hooks", "Extraer lógica para reutilizarla...", "Prefijo", "use", "Lógica", "Shared")
                }),
                new CategorySeedMap("ASP.NET Web API", "Construcción de servicios RESTful", "globe", "#512BD4", new List<LessonSeedMap> {
                    GenerateLesson("Arquitectura REST", "Principios de los servicios web...", "Estado", "Stateless", "Método", "GET/POST"),
                    GenerateLesson("Controllers", "Punto de entrada de las peticiones...", "Atributo", "ApiController", "Ruta", "Route"),
                    GenerateLesson("Inyección de Dependencias", "Desacoplamiento de componentes...", "Contenedor", "ServiceCollection", "Ciclo", "Scoped"),
                    GenerateLesson("Entity Framework Core", "El ORM oficial de Microsoft...", "Contexto", "DbContext", "Traducción", "SQL"),
                    GenerateLesson("DTOs", "Transferencia de datos segura...", "Mapeo", "AutoMapper", "Capa", "Application"),
                    GenerateLesson("Middleware", "Pipeline de procesamiento de requests...", "Orden", "Pipeline", "Registro", "App.Use"),
                    GenerateLesson("Seguridad JWT", "Autenticación basada en tokens...", "Header", "Authorization", "Firma", "Secret Key"),
                    GenerateLesson("Validación y Errores", "Manejo global de respuestas...", "Validación", "FluentValidation", "Código", "400/500")
                })
            };
        }

        private class CategorySeedMap
        {
            public string Name, Description, Icon, Color;
            public List<LessonSeedMap> Lessons;
            public CategorySeedMap(string n, string d, string i, string c, List<LessonSeedMap> l)
            {
                Name = n; Description = d; Icon = i; Color = c; Lessons = l;
            }
        }

        private class LessonSeedMap
        {
            public string Title, Content;
            public List<QuestionSeedMap> Questions;
        }

        private class QuestionSeedMap
        {
            public string Text;
            public List<OptionSeedMap> Options;
        }

        private class OptionSeedMap
        {
            public string Text; public bool IsCorrect;
        }

        private static LessonSeedMap GenerateLesson(string title, string content, string q1T, string q1A, string q2T, string q2A)
        {
            var lesson = new LessonSeedMap { Title = title, Content = content, Questions = new List<QuestionSeedMap>() };

            for (int i = 1; i <= 3; i++)
            {
                var isEven = i % 2 == 0;
                lesson.Questions.Add(new QuestionSeedMap
                {
                    Text = $"Pregunta {i}: Sobre {(isEven ? q1T : q2T)} en {title}?",
                    Options = new List<OptionSeedMap> {
                        new OptionSeedMap { Text = (isEven ? q1A : q2A), IsCorrect = true },
                        new OptionSeedMap { Text = "Opción incorrecta A", IsCorrect = false },
                        new OptionSeedMap { Text = "Opción incorrecta B", IsCorrect = false }
                    }
                });
            }
            return lesson;
        }
    }
}