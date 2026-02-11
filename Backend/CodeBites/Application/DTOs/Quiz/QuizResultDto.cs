using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.User;

namespace Application.DTOs.Quiz
{
    public class QuizResultDto
    {
        public bool Success { get; set; }
        public int PointsEarned { get; set; }
        public int CorrectAnswersCount { get; set; }
        public int TotalQuestions { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<UserAchievementDto> NewAchievements { get; set; } = new();
    }
}
