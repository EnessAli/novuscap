using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NovusCap.Application.Common.Models;
using NovusCap.Application.DTOs;
using NovusCap.Application.Interfaces;

namespace NovusCap.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationsController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationsController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        /// <summary>
        /// Get all locations with pagination
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetLocations(
           [FromQuery] int page = 1,
           [FromQuery] int pageSize = 10)
        {
            try
            {
                var pagedLocations = await _locationService.GetLocationsAsync(page, pageSize);
                return Ok(pagedLocations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get location by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocation(Guid id)
        {
            try
            {
                var location = await _locationService.GetLocationByIdAsync(id);
                if (location == null)
                {
                    return NotFound(new { message = "Location not found" });
                }
                return Ok(location);
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Location not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Create new location
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> CreateLocation([FromBody] LocationDto locationDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var location = await _locationService.CreateLocationAsync(locationDto);
                return CreatedAtAction(nameof(GetLocation), new { id = location.Id }, location);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update location
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> UpdateLocation(Guid id, [FromBody] LocationDto locationDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updatedLocation = await _locationService.UpdateLocationAsync(id, locationDto);
                return Ok(updatedLocation);
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Location not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Delete location
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteLocation(Guid id)
        {
            try
            {
                await _locationService.DeleteLocationAsync(id);
                return NoContent();
            }
            catch (ArgumentException)
            {
                return NotFound(new { message = "Location not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get locations by city
        /// </summary>
        [HttpGet("by-city")]
        public async Task<IActionResult> GetLocationsByCity([FromQuery] string city)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(city))
                {
                    return BadRequest(new { message = "City is required" });
                }

                var locations = await _locationService.GetLocationsByCityAsync(city);
                return Ok(locations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get locations within bounds
        /// </summary>
        [HttpGet("within-bounds")]
        public async Task<IActionResult> GetLocationsWithinBounds(
            [FromQuery] decimal northLat,
            [FromQuery] decimal southLat,
            [FromQuery] decimal eastLng,
            [FromQuery] decimal westLng)
        {
            try
            {
                var locations = await _locationService.GetLocationsByBoundsAsync(
                    northLat, southLat, eastLng, westLng);
                return Ok(locations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get nearby locations
        /// </summary>
        [HttpGet("nearby")]
        public async Task<IActionResult> GetNearbyLocations(
            [FromQuery] decimal latitude,
            [FromQuery] decimal longitude,
            [FromQuery] double radiusKm = 50)
        {
            try
            {
                var locations = await _locationService.GetNearbyLocationsAsync(latitude, longitude, radiusKm);
                return Ok(locations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Search locations
        /// </summary>
        [HttpGet("search")]
        public async Task<IActionResult> SearchLocations([FromQuery] string searchTerm)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(searchTerm))
                {
                    return BadRequest(new { message = "Search term is required" });
                }
                
                var results = await _locationService.SearchLocationsAsync(searchTerm);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Check if location exists
        /// </summary>
        [HttpHead("{id}")]
        public async Task<IActionResult> LocationExists(Guid id)
        {
            try
            {
                var exists = await _locationService.LocationExistsAsync(id);
                return exists ? Ok() : NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


    }
}
