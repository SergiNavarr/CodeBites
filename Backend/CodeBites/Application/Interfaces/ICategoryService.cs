using Application.DTOs.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryResponseDto>> GetAllWithProgressAsync(Guid userId);
        Task<CategoryDetailDto> GetByIdWithDetailsAsync(Guid userId, Guid categoryId);
        Task FollowCategoryAsync(Guid userId, Guid categoryId);
    }
}
