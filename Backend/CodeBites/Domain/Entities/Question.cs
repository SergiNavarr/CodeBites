using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Question : BaseEntity
    {
        public string Text { get; set; } = string.Empty;
        public Guid QuizId { get; set; }
        public virtual Quiz Quiz { get; set; } = null!;

        public virtual ICollection<Option> Options { get; set; } = new List<Option>();
    }
}
