using Application.DTOs.Quiz;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class QuizzesController : ControllerBase
    {
        private readonly IQuizService _quizService;

        public QuizzesController(IQuizService quizService)
        {
            _quizService = quizService;
        }

        /// <summary>
        /// Obtiene el quiz asociado a una lección específica.
        /// </summary>
        [HttpGet("lesson/{lessonId}")]
        public async Task<ActionResult<QuizDetailDto>> GetByLesson(Guid lessonId)
        {
            var quiz = await _quizService.GetQuizByLessonIdAsync(lessonId);

            if (quiz == null)
            {
                return NotFound(new { message = "Esta lección no tiene un quiz asociado." });
            }

            return Ok(quiz);
        }

        /// <summary>
        /// Valida las respuestas del usuario y otorga puntos/racha si es correcto.
        /// </summary>
        [HttpPost("submit")]
        public async Task<ActionResult<QuizResultDto>> Submit(QuizSubmissionDto submission)
        {
            // Obtenemos el ID del usuario desde el Token JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized();
            }

            var userId = Guid.Parse(userIdClaim);
            var result = await _quizService.SubmitQuizAsync(submission, userId);

            return Ok(result);
        }
    }
}
