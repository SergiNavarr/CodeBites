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
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(CodebitesDbContext context) : base(context)
        {
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<User?> GetUserWithDetailsAsync(Guid userId)
        {
            return await _context.Users
                .Include(u => u.UserCategories)

                .Include(u => u.Progress)
                    .ThenInclude(p => p.Lesson)

                .Include(u => u.Achievements)
                    .ThenInclude(ua => ua.Achievement)

                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
