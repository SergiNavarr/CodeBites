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
    public class QuizRepository : GenericRepository<Quiz>, IQuizRepository
    {
        public QuizRepository(CodebitesDbContext context) : base(context) { }

        public async Task<Quiz?> GetQuizWithQuestionsAsync(Guid quizId)
        {
            return await _context.Quizzes
                .Include(q => q.Questions)
                    .ThenInclude(ques => ques.Options)
                .FirstOrDefaultAsync(q => q.Id == quizId);
        }
    }
}
