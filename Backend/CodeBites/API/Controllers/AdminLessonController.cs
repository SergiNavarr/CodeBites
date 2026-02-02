using Application.DTOs.Lesson;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/admin/lessons")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminLessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        public AdminLessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        // POST: api/admin/lessons
        [HttpPost]
        public async Task<ActionResult<LessonDetailDto>> Create([FromBody] CreateLessonDto dto)
        {
            try
            {
                var result = await _lessonService.CreateLessonAsync(dto);

                return CreatedAtAction(nameof(GetByIdPlaceholder), new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Error al crear la lección. Verifica que el CategoryId exista.");
            }
        }

        // PUT: api/admin/lessons/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateLessonDto dto)
        {
            var result = await _lessonService.UpdateLessonAsync(id, dto);
            if (result == null) return NotFound("Lección no encontrada");

            return Ok(result);
        }

        // DELETE: api/admin/lessons/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _lessonService.DeleteLessonAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }

        [HttpGet("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetByIdPlaceholder(Guid id) => Ok();
    }
}
