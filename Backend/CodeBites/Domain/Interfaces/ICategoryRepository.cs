using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task<IEnumerable<Category>> GetAllWithLessonsAndSubscriptionsAsync();
        Task<Category?> GetByIdWithLessonsAsync(Guid id);
    }
}
