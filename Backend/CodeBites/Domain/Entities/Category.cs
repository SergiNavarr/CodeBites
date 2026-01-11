using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public virtual string IconUrl { get; set; } = string.Empty;
        public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
    }
}
