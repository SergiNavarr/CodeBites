using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Category
{
    public class CategoryResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;

        // Datos de progreso
        public int LessonsCount { get; set; }
        public int CompletedLessons { get; set; }
        public bool IsFollowing { get; set; }
        public double ProgressPercentage => LessonsCount > 0
            ? (double)CompletedLessons / LessonsCount * 100
            : 0;
    }
}
