using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.User
{
    public class UserProfileDto
    {

        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public int TotalPoints { get; set; }
        public int CurrentStreak { get; set; }
        public int ActiveCategoriesCount { get; set; }

        public int CompletedLessonsCount { get; set; }
        public int Rank { get; set; }
        public string LevelName { get; set; } = "Bite Learner";

        public List<UserAchievementDto> Achievements { get; set; } = new();
        public List<RecentActivityDto> RecentActivities { get; set; } = new();
    }
}
