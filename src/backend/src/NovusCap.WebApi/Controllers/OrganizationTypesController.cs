using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NovusCap.Application.DTOs;
using NovusCap.Application.Interfaces;

namespace NovusCap.WebApi.Controllers
{
    [ApiController]
    [Route("api/organization-types")]
    public class OrganizationTypesController : ControllerBase
    {
        private readonly IOrganizationTypeService _organizationTypeService;

        public OrganizationTypesController(IOrganizationTypeService organizationTypeService)
        {
            _organizationTypeService = organizationTypeService;
        }

        /// <summary>
        /// Get all organization types
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetOrganizationTypes()
        {
            try
            {
                var organizationTypes = await _organizationTypeService.GetAllOrganizationTypesAsync();
                return Ok(organizationTypes);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get organization type by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrganizationType(Guid id)
        {
            try
            {
                var organizationType = await _organizationTypeService.GetOrganizationTypeByIdAsync(id);
                if (organizationType == null)
                {
                    return NotFound(new { message = "Organization type not found" });
                }
                return Ok(organizationType);
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Organization type not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Create new organization type
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateOrganizationType([FromBody] OrganizationTypeDto organizationTypeDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var organizationType = await _organizationTypeService.CreateOrganizationTypeAsync(organizationTypeDto);
                return CreatedAtAction(nameof(GetOrganizationType), new { id = organizationType.Id }, organizationType);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update organization type
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateOrganizationType(Guid id, [FromBody] OrganizationTypeDto organizationTypeDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedOrganizationType = await _organizationTypeService.UpdateOrganizationTypeAsync(id, organizationTypeDto);
                return Ok(updatedOrganizationType);
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Organization type not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Delete organization type
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteOrganizationType(Guid id)
        {
            try
            {
                await _organizationTypeService.DeleteOrganizationTypeAsync(id);
                return NoContent();
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Organization type not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Check if organization type exists
        /// </summary>
        [HttpHead("{id}")]
        public async Task<IActionResult> OrganizationTypeExists(Guid id)
        {
            try
            {
                var exists = await _organizationTypeService.OrganizationTypeExistsAsync(id);
                return exists ? Ok() : NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
