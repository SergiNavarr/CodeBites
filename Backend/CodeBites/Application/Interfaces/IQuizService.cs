using Application.DTOs.Quiz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IQuizService
    {
        Task<QuizDetailDto?> GetQuizByLessonIdAsync(Guid lessonId);
        Task<QuizResultDto> SubmitQuizAsync(QuizSubmissionDto submission, Guid userId);
    }
}
