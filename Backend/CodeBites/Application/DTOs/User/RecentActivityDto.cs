using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.User
{
    public class RecentActivityDto
    {
        public string Title { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int PointsGained { get; set; }
    }
}
