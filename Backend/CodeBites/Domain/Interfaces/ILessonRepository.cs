using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ILessonRepository : IGenericRepository<Lesson>
    {
        Task<IEnumerable<Lesson>> GetLessonsByCategoryAsync(Guid categoryId);
    }
}
