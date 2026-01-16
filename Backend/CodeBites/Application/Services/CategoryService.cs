using Application.DTOs.Category;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepo;
        private readonly IGenericRepository<UserCategory> _userCategoryRepo;
        private readonly IGenericRepository<UserProgress> _userProgressRepo;
        private readonly IMapper _mapper;

        public CategoryService(
            ICategoryRepository categoryRepo,
            IGenericRepository<UserCategory> userCategoryRepo,
            IGenericRepository<UserProgress> userProgressRepo,
            IMapper mapper)
        {
            _categoryRepo = categoryRepo;
            _userCategoryRepo = userCategoryRepo;
            _userProgressRepo = userProgressRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryResponseDto>> GetAllWithProgressAsync(Guid userId)
        {
            var categories = await _categoryRepo.GetAllWithLessonsAndSubscriptionsAsync();

            var userProgress = await _userProgressRepo.FindAsync(up => up.UserId == userId);
            var completedLessonIds = userProgress.Select(up => up.LessonId).ToHashSet();

            return categories.Select(c => new CategoryResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                Icon = c.Icon,
                Color = c.Color,
                LessonsCount = c.Lessons.Count,
                IsFollowing = c.UserCategories.Any(uc => uc.UserId == userId),
                CompletedLessons = c.Lessons.Count(l => completedLessonIds.Contains(l.Id))
            });
        }

        public async Task FollowCategoryAsync(Guid userId, Guid categoryId)
        {
            var existing = await _userCategoryRepo.FindAsync(uc => uc.UserId == userId && uc.CategoryId == categoryId);
            if (existing.Any()) return;

            var userCategory = new UserCategory
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                CategoryId = categoryId,
                EnrolledAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            await _userCategoryRepo.AddAsync(userCategory);
            await _userCategoryRepo.SaveChangesAsync();
        }

        public async Task<CategoryDetailDto> GetByIdWithDetailsAsync(Guid userId, Guid categoryId)
        {
            var category = await _categoryRepo.GetByIdWithLessonsAsync(categoryId);
            if (category == null) return null;

            var userProgress = await _userProgressRepo.FindAsync(up => up.UserId == userId);
            var completedLessonIds = userProgress.Select(up => up.LessonId).ToHashSet();

            var dto = _mapper.Map<CategoryDetailDto>(category);

            foreach (var lesson in dto.Lessons)
            {
                lesson.IsCompleted = completedLessonIds.Contains(lesson.Id);
            }

            return dto;
        }
    }
}
