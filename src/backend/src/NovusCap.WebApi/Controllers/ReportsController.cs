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
    [Authorize]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        /// <summary>
        /// Get all reports with pagination and filtering
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> GetReports(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? type = null,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            try
            {
                var reports = await _reportService.GetReportsAsync(page, pageSize, type, startDate, endDate);
                return Ok(reports);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get report by ID
        /// </summary>
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> GetReport(Guid id)
        {
            try
            {
                var report = await _reportService.GetReportByIdAsync(id);
                if (report == null)
                {
                    return NotFound(new { message = "Report not found" });
                }
                return Ok(report);
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Report not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Create new report
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> CreateReport([FromBody] ReportDto reportDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Invalid user" });
                }

                var userGuid = Guid.Parse(userId);
                var report = await _reportService.CreateReportAsync(reportDto, userGuid);
                return CreatedAtAction(nameof(GetReport), new { id = report.Id }, report);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update report
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> UpdateReport(Guid id, [FromBody] ReportDto reportDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedReport = await _reportService.UpdateReportAsync(id, reportDto);
                return Ok(updatedReport);
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Report not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Delete report
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteReport(Guid id)
        {
            try
            {
                await _reportService.DeleteReportAsync(id);
                return NoContent();
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Report not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Generate organization report
        /// </summary>
        [HttpPost("organization-report")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> GenerateOrganizationReport(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate,
            [FromQuery] Guid organizationId)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Invalid user" });
                }

                var report = await _reportService.GenerateOrganizationReportAsync(startDate, endDate, organizationId);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Generate user activity report
        /// </summary>
        [HttpPost("user-activity-report")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> GenerateUserActivityReport(
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Invalid user" });
                }

                var report = await _reportService.GenerateUserActivityReportAsync(startDate, endDate);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Generate location statistics report
        /// </summary>
        [HttpPost("location-stats-report")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> GenerateLocationStatsReport(
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Invalid user" });
                }

                var report = await _reportService.GenerateLocationStatsReportAsync(startDate, endDate);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Check if report exists
        /// </summary>
        [HttpHead("{id}")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> ReportExists(Guid id)
        {
            try
            {
                var exists = await _reportService.ReportExistsAsync(id);
                return exists ? Ok() : NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
