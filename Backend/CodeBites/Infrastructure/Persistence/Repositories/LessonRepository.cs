using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class LessonRepository : GenericRepository<Lesson>, ILessonRepository
    {
        public LessonRepository(CodebitesDbContext context) : base(context) { }

        public async Task<IEnumerable<Lesson>> GetLessonsByCategoryAsync(Guid categoryId)
        {
            return await _context.Lessons
                .Where(l => l.CategoryId == categoryId)
                .ToListAsync();
        }
    }
}
