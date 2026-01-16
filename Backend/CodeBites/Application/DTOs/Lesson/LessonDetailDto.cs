using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Lesson
{
    public class LessonDetailDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? CodeExample { get; set; }
        public int Points { get; set; }
        public int Order { get; set; }
        public bool IsCompleted { get; set; }
        public Guid? NextLessonId { get; set; }
    }
}
