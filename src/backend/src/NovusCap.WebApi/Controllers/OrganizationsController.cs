using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NovusCap.Application.Common.Models;
using NovusCap.Application.DTOs;
using NovusCap.Application.Interfaces;
using System.Security.Claims;

namespace NovusCap.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrganizationsController : ControllerBase
    {
        private readonly IOrganizationService _organizationService;

        public OrganizationsController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        /// <summary>
        /// Get all organizations with pagination and filtering
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetOrganizations(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? searchTerm = null,
            [FromQuery] Guid? typeId = null,
            [FromQuery] string? organizationType = null,
            [FromQuery] string? location = null,
            [FromQuery] double? radius = null)
        {
            try
            {
                // Convert organizationType string to typeId if provided
                Guid? actualTypeId = typeId;
                if (!string.IsNullOrEmpty(organizationType) && !typeId.HasValue)
                {
                    // This is a simplified approach - in real implementation,
                    // you'd lookup the organization type by name
                    // For now, just use the provided typeId
                }

                var organizations = await _organizationService.GetOrganizationsAsync(page, pageSize, searchTerm, actualTypeId);
                return Ok(organizations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get organization by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrganization(Guid id)
        {
            try
            {
                var organization = await _organizationService.GetOrganizationByIdAsync(id);
                if (organization == null)
                {
                    return NotFound(new { message = "Organization not found" });
                }
                return Ok(organization);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Create new organization
        /// </summary>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateOrganization([FromBody] OrganizationDto organizationDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var organization = await _organizationService.CreateOrganizationAsync(organizationDto);
                return CreatedAtAction(nameof(GetOrganization), new { id = organization.Id }, organization);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update organization
        /// </summary>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateOrganization(Guid id, [FromBody] OrganizationDto organizationDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedOrganization = await _organizationService.UpdateOrganizationAsync(id, organizationDto);
                return Ok(updatedOrganization);
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Organization not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Delete organization
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> DeleteOrganization(Guid id)
        {
            try
            {
                await _organizationService.DeleteOrganizationAsync(id);
                return NoContent();
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Organization not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get organizations by type
        /// </summary>
        [HttpGet("by-type/{typeId}")]
        public async Task<IActionResult> GetOrganizationsByType(Guid typeId)
        {
            try
            {
                var organizations = await _organizationService.GetOrganizationsByTypeAsync(typeId);
                return Ok(organizations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Search organizations
        /// </summary>
        [HttpGet("search")]
        public async Task<IActionResult> SearchOrganizations([FromQuery] string searchTerm)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(searchTerm))
                {
                    return BadRequest(new { message = "Search term is required" });
                }

                var organizations = await _organizationService.SearchOrganizationsAsync(searchTerm);
                return Ok(organizations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get organizations by location
        /// </summary>
        [HttpGet("by-location")]
        public async Task<IActionResult> GetOrganizationsByLocation(
            [FromQuery] string city,
            [FromQuery] string? district = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                var organizations = await _organizationService.GetOrganizationsByLocationAsync(city, district, page, pageSize);
                return Ok(organizations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get nearby organizations
        /// </summary>
        [HttpGet("nearby")]
        public async Task<IActionResult> GetNearbyOrganizations(
            [FromQuery] decimal latitude,
            [FromQuery] decimal longitude,
            [FromQuery] int radiusKm = 50)
        {
            try
            {
                var organizations = await _organizationService.GetNearbyOrganizationsAsync(latitude, longitude, radiusKm);
                return Ok(organizations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get pending organizations for approval
        /// </summary>
        [HttpGet("pending")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> GetPendingOrganizations()
        {
            try
            {
                var organizations = await _organizationService.GetPendingOrganizationsAsync();
                return Ok(organizations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Approve organization
        /// </summary>
        [HttpPost("{id}/approve")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> ApproveOrganization(Guid id)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Invalid user" });
                }

                var organization = await _organizationService.ApproveOrganizationAsync(id, Guid.Parse(userId));
                return Ok(organization);
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Organization not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Reject organization
        /// </summary>
        [HttpPost("{id}/reject")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> RejectOrganization(Guid id)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Invalid user" });
                }

                var organization = await _organizationService.RejectOrganizationAsync(id, Guid.Parse(userId));
                return Ok(organization);
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Organization not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Check if organization exists
        /// </summary>
        [HttpHead("{id}")]
        public async Task<IActionResult> OrganizationExists(Guid id)
        {
            try
            {
                var exists = await _organizationService.OrganizationExistsAsync(id);
                return exists ? Ok() : NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}