using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services
{
    public class AchievementService : IAchievementService
    {
        private readonly IUserRepository _userRepository;
        private readonly IGenericRepository<Achievement> _achievementRepository;
        private readonly IGenericRepository<UserAchievement> _userAchievementRepository;

        public AchievementService(
            IUserRepository userRepository,
            IGenericRepository<Achievement> achievementRepository,
            IGenericRepository<UserAchievement> userAchievementRepository)
        {
            _userRepository = userRepository;
            _achievementRepository = achievementRepository;
            _userAchievementRepository = userAchievementRepository;
        }

        public async Task CheckAndUnlockAchievementsAsync(Guid userId)
        {
            var user = await _userRepository.GetUserWithDetailsAsync(userId);
            if (user == null) return;

            var allAchievements = await _achievementRepository.GetAllAsync();

            var existingAchievementIds = user.Achievements.Select(ua => ua.AchievementId).ToHashSet();

            bool newUnlock = false;

            foreach (var achievement in allAchievements)
            {
                if (existingAchievementIds.Contains(achievement.Id)) continue;

                bool criteriaMet = false;

                switch (achievement.Type)
                {
                    case AchievementType.FirstLesson:
                        criteriaMet = user.Progress.Any();
                        break;

                    case AchievementType.TotalPoints:
                        criteriaMet = user.TotalPoints >= achievement.TargetValue;
                        break;

                    case AchievementType.Streak:
                        criteriaMet = user.CurrentStreak >= achievement.TargetValue;
                        break;
                }

                if (criteriaMet)
                {
                    await _userAchievementRepository.AddAsync(new UserAchievement
                    {
                        Id = Guid.NewGuid(),
                        UserId = userId,
                        AchievementId = achievement.Id,
                        UnlockedAt = DateTime.UtcNow
                    });
                    newUnlock = true;
                }
            }

            if (newUnlock)
            {
                await _userAchievementRepository.SaveChangesAsync();
            }
        }
    }
}