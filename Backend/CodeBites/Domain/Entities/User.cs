using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public int TotalPoints { get; set; } = 0;
        public int CurrentStreak { get; set; } = 0;

        public Guid RoleId { get; set; }
        public virtual Role Role { get; set; } = null!;

        public virtual ICollection<UserProgress> Progress {get; set; } = new List<UserProgress>();
        public virtual ICollection<UserAchievement> Achievements { get; set; } = new List<UserAchievement>();
    }
}
