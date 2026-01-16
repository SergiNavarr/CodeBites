using Application.DTOs.Lesson;
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
    public class LessonService : ILessonService
    {
        private readonly ILessonRepository _lessonRepo;
        private readonly IGenericRepository<UserProgress> _progressRepo;
        private readonly IGenericRepository<User> _userRepo;
        private readonly IMapper _mapper;

        public LessonService(
            ILessonRepository lessonRepo,
            IGenericRepository<UserProgress> progressRepo,
            IGenericRepository<User> userRepo,
            IMapper mapper)
        {
            _lessonRepo = lessonRepo;
            _progressRepo = progressRepo;
            _userRepo = userRepo;
            _mapper = mapper;
        }

        public async Task<LessonDetailDto?> GetLessonDetailAsync(Guid lessonId, Guid userId)
        {
            var lesson = await _lessonRepo.GetByIdAsync(lessonId);
            if (lesson == null) return null;

            var categoryLessons = await _lessonRepo.GetLessonsByCategoryAsync(lesson.CategoryId);

            var nextLesson = categoryLessons
                .Where(l => l.Order > lesson.Order)
                .OrderBy(l => l.Order)
                .FirstOrDefault();

            var userProgress = await _progressRepo.FindAsync(p =>
                p.UserId == userId && p.LessonId == lessonId);

            var dto = _mapper.Map<LessonDetailDto>(lesson);
            dto.IsCompleted = userProgress.Any();
            dto.NextLessonId = nextLesson?.Id;

            return dto;
        }

        public async Task<int> CompleteLessonAsync(Guid lessonId, Guid userId)
        {
            var lesson = await _lessonRepo.GetByIdAsync(lessonId);
            if (lesson == null) return 0;

            var alreadyCompleted = (await _progressRepo.FindAsync(p =>
                p.UserId == userId && p.LessonId == lessonId)).Any();

            if (alreadyCompleted) return 0;

            var progress = new UserProgress
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                LessonId = lessonId,
                CompletedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };
            await _progressRepo.AddAsync(progress);

            var user = await _userRepo.GetByIdAsync(userId);
            if (user != null)
            {
                user.TotalPoints += lesson.PointsReward;
                _userRepo.Update(user);
            }

            await _userRepo.SaveChangesAsync();

            return lesson.PointsReward;
        }
    }
}
