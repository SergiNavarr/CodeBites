using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LessonsController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        private Guid CurrentUserId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new UnauthorizedAccessException("Usuario no identificado"));

        public LessonsController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        /// <summary>
        /// Obtiene el contenido detallado de una lección.
        /// GET: /api/Lessons/{id}
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var lesson = await _lessonService.GetLessonDetailAsync(id, CurrentUserId);

            if (lesson == null)
                return NotFound(new { message = "La lección no existe." });

            return Ok(lesson);
        }

        /// <summary>
        /// Marca una lección como completada y otorga los puntos.
        /// POST: /api/Lessons/{id}/complete
        /// </summary>
        [HttpPost("{id}/complete")]
        public async Task<IActionResult> Complete(Guid id)
        {
            try
            {
                var pointsEarned = await _lessonService.CompleteLessonAsync(id, CurrentUserId);

                return Ok(new
                {
                    message = "¡Lección completada!",
                    points = pointsEarned
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al completar la lección.", error = ex.Message });
            }
        }
    }
}