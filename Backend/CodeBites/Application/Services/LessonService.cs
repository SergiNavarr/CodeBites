using Application.Interfaces;
using Application.DTOs.Lesson; // Asegúrate de que este namespace coincida con tus DTOs
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services
{
    public class LessonService : ILessonService
    {
        private readonly ILessonRepository _lessonRepo;
        private readonly IGenericRepository<UserProgress> _progressRepo;
        private readonly IGenericRepository<User> _userRepo;
        private readonly IMapper _mapper;
        private readonly IAchievementService _achievementService;

        public LessonService(
            ILessonRepository lessonRepo,
            IGenericRepository<UserProgress> progressRepo,
            IGenericRepository<User> userRepo,
            IMapper mapper,
            IAchievementService achievementService)
        {
            _lessonRepo = lessonRepo;
            _progressRepo = progressRepo;
            _userRepo = userRepo;
            _mapper = mapper;
            _achievementService = achievementService;
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

                var today = DateTime.UtcNow.Date;
                var lastActivityDate = user.LastActivityAt?.Date;

                if (lastActivityDate == null)
                {
                    user.CurrentStreak = 1;
                }
                else if (lastActivityDate == today)
                {
                    // Ya hizo actividad hoy, mantenemos la racha
                }
                else if (lastActivityDate == today.AddDays(-1))
                {
                    // Hizo actividad ayer, sumamos racha
                    user.CurrentStreak++;
                }
                else
                {
                    // Rompió la racha
                    user.CurrentStreak = 1;
                }

                user.LastActivityAt = DateTime.UtcNow;
                _userRepo.Update(user);
            }

            await _userRepo.SaveChangesAsync();
            await _achievementService.CheckAndUnlockAchievementsAsync(userId);

            return lesson.PointsReward;
        }

        public async Task<LessonDetailDto> CreateLessonAsync(CreateLessonDto dto)
        {
            var lesson = new Lesson
            {
                Id = Guid.NewGuid(),
                CategoryId = dto.CategoryId,
                Title = dto.Title,
                Content = dto.Content,
                Order = dto.Order,
                PointsReward = dto.PointsReward,
                Difficulty = dto.Difficulty,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            await _lessonRepo.AddAsync(lesson);
            await _lessonRepo.SaveChangesAsync();

            return new LessonDetailDto
            {
                Id = lesson.Id,
                Title = lesson.Title,
                Content = lesson.Content,
                Points = lesson.PointsReward,
                IsCompleted = false,
                NextLessonId = null,
                QuizId = null
            };
        }

        public async Task<LessonDetailDto?> UpdateLessonAsync(Guid id, UpdateLessonDto dto)
        {
            var lesson = await _lessonRepo.GetByIdAsync(id);
            if (lesson == null) return null;

            lesson.Title = dto.Title;
            lesson.Content = dto.Content;
            lesson.Order = dto.Order;
            lesson.PointsReward = dto.PointsReward;
            lesson.Difficulty = dto.Difficulty;
            lesson.IsActive = dto.IsActive;

            _lessonRepo.Update(lesson);
            await _lessonRepo.SaveChangesAsync();

            return new LessonDetailDto
            {
                Id = lesson.Id,
                Title = lesson.Title,
                Content = lesson.Content,
                Points = lesson.PointsReward,
                Order = lesson.Order,
                IsCompleted = false,
                NextLessonId = null,
                QuizId = null
            };
        }

        public async Task<bool> DeleteLessonAsync(Guid id)
        {
            var lesson = await _lessonRepo.GetByIdAsync(id);
            if (lesson == null) return false;

            _lessonRepo.Delete(lesson);
            await _lessonRepo.SaveChangesAsync();

            return true;
        }
    }
}