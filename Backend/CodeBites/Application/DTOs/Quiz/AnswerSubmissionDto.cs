using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Quiz
{
    public class AnswerSubmissionDto
    {
        public Guid QuestionId { get; set; }
        public Guid SelectedOptionId { get; set; }
    }
}
