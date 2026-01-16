using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    private Guid CurrentUserId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new UnauthorizedAccessException("Usuario no identificado en el token"));

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    /// <summary>
    /// Lista todas las categorías con progreso calculado
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _categoryService.GetAllWithProgressAsync(CurrentUserId);
        return Ok(categories);
    }

    /// <summary>
    /// Obtiene el detalle de una categoría y sus lecciones
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var category = await _categoryService.GetByIdWithDetailsAsync(CurrentUserId, id);

        if (category == null)
            return NotFound(new { message = "La categoría solicitada no existe." });

        return Ok(category);
    }

    /// <summary>
    /// Registra al usuario en una categoría
    /// </summary>
    [HttpPost("{id}/follow")]
    public async Task<IActionResult> Follow(Guid id)
    {
        try
        {
            await _categoryService.FollowCategoryAsync(CurrentUserId, id);
            return Ok(new { message = "Ahora sigues esta categoría con éxito." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "No se pudo procesar la suscripción.", error = ex.Message });
        }
    }
}