using Application.DTOs.Quiz;
using Application.DTOs.User;
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
    public class QuizService : IQuizService
    {
        private readonly IQuizRepository _quizRepo;
        private readonly ILessonService _lessonService;
        private readonly IMapper _mapper;

        public QuizService(
            IQuizRepository quizRepo,
            ILessonService lessonService,
            IMapper mapper)
        {
            _quizRepo = quizRepo;
            _lessonService = lessonService;
            _mapper = mapper;
        }

        public async Task<QuizDetailDto?> GetQuizByLessonIdAsync(Guid lessonId)
        {
            var quiz = await _quizRepo.GetQuizWithQuestionsAsync(lessonId);

            if (quiz == null) return null;

            return _mapper.Map<QuizDetailDto>(quiz);
        }
        public async Task<QuizResultDto> SubmitQuizAsync(QuizSubmissionDto submission, Guid userId)
        {
            var quiz = await _quizRepo.GetQuizWithQuestionsAsync(submission.QuizId);

            if (quiz == null) return new QuizResultDto { Success = false, Message = "Quiz no encontrado." };

            int correctCount = 0;
            int totalQuestions = quiz.Questions.Count;

            // Validar cada respuesta enviada
            foreach (var answer in submission.Answers)
            {
                var question = quiz.Questions.FirstOrDefault(q => q.Id == answer.QuestionId);
                if (question != null)
                {
                    var correctOption = question.Options.FirstOrDefault(o => o.IsCorrect);
                    if (correctOption != null && correctOption.Id == answer.SelectedOptionId)
                    {
                        correctCount++;
                    }
                }
            }

            double percentage = (double)correctCount / totalQuestions;
            bool passed = percentage >= 0.6;

            int pointsEarned = 0;
            var newAchievements = new List<UserAchievementDto>();

            if (passed)
            {
                var result = await _lessonService.CompleteLessonAsync(quiz.LessonId, userId);
                pointsEarned = result.Points;
                newAchievements = result.NewAchievements;
            }

            return new QuizResultDto
            {
                Success = passed,
                PointsEarned = pointsEarned,
                CorrectAnswersCount = correctCount,
                TotalQuestions = totalQuestions,
                NewAchievements = newAchievements,
                Message = passed
                    ? "¡Increíble! Has dominado esta lección."
                    : "Casi lo tienes. Revisa el contenido e inténtalo de nuevo."
            };
        }
    }
}
