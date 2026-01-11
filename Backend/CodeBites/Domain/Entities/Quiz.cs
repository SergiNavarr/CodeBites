using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Quiz : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        
        public Guid LessonId { get; set; }
        public virtual Lesson Lesson { get; set; } = null!;

        public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
