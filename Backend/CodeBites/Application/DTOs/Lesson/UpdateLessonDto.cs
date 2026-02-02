using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Lesson
{
    public class UpdateLessonDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public int Order { get; set; }
        public int PointsReward { get; set; }
        public int Difficulty { get; set; }
        public bool IsActive { get; set; }
    }
}
