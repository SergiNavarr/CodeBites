using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class UserCategory : BaseEntity
    {
        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;

        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; } = null!;

        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
    }
}
