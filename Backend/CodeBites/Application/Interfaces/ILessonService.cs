using Application.DTOs.Lesson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ILessonService
    {
        Task<LessonDetailDto> GetLessonDetailAsync(Guid lessonId, Guid userId);
        Task<int> CompleteLessonAsync(Guid lessonId, Guid userId);
        
    }
}
