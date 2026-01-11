using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class UserAchievement : BaseEntity
    {
        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public Guid AchievementId { get; set; }
        public virtual Achievement Achievement { get; set; } = null!;
        public DateTime UnlockedAt { get; set; } = DateTime.UtcNow;
    }
}
