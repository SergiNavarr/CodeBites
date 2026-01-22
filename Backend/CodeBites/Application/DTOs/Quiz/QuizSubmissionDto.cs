using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Quiz
{
    public class QuizSubmissionDto
    {
        public Guid QuizId { get; set; }
        public List<AnswerSubmissionDto> Answers { get; set; } = new();
    }
}
