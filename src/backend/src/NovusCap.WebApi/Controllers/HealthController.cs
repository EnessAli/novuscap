using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NovusCap.Infrastructure.Data;
using System.Diagnostics;

namespace NovusCap.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        /// <summary>
        /// Health check endpoint
        /// </summary>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { 
                status = "Healthy", 
                timestamp = DateTime.UtcNow,
                environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Unknown",
                version = "1.0.0"
            });
        }

        /// <summary>
        /// Database health check
        /// </summary>
        [HttpGet("database")]
        public async Task<IActionResult> Database([FromServices] ApplicationDbContext dbContext)
        {
            try
            {
                await dbContext.Database.CanConnectAsync();
                return Ok(new { status = "Database connection healthy", timestamp = DateTime.UtcNow });
            }
            catch (Exception ex)
            {
                return ServiceUnavailable(new { status = "Database connection failed", error = ex.Message, timestamp = DateTime.UtcNow });
            }
        }

        private IActionResult ServiceUnavailable(object value)
        {
            return StatusCode(503, value);
        }
    }
}
