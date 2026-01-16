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
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        private readonly CodebitesDbContext _context;

        public CategoryRepository(CodebitesDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllWithLessonsAndSubscriptionsAsync()
        {
            return await _context.Categories
                .Include(c => c.Lessons)
                .Include(c => c.UserCategories)
                .ToListAsync();
        }

        public async Task<Category?> GetByIdWithLessonsAsync(Guid id)
        {
            return await _context.Categories
                .Include(c => c.Lessons)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
