using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Lesson : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int Difficulty { get; set; }
        public int PointsReward { get; set; }
        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; } = null!;
        public virtual Quiz? Quiz { get; set; }
        public virtual ICollection<UserProgress> UserProgresses { get; set; } = new List<UserProgress>();
    }
}
