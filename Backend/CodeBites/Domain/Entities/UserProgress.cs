using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class UserProgress : BaseEntity
    {
        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public Guid LessonId { get; set; }
        public virtual Lesson Lesson { get; set; } = null!;
        public int Score { get; set; }
        public DateTime CompletedAt { get; set; } = DateTime.UtcNow;
    }
}
