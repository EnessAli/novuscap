using NovusCap.Application.Common.Models;
using NovusCap.Application.DTOs;

namespace NovusCap.Application.Interfaces
{
    public interface ILocationService
    {
        // Basic location operations
        Task<List<LocationDto>> GetAllLocationsAsync();
        Task<LocationDto?> GetLocationByIdAsync(Guid id);
        Task<LocationDto> CreateLocationAsync(LocationDto locationDto);
        Task<LocationDto> UpdateLocationAsync(Guid id, LocationDto locationDto);
        Task<bool> DeleteLocationAsync(Guid id);
        Task<bool> LocationExistsAsync(Guid id);
        
        // Location retrieval by geographical criteria
        Task<List<LocationDto>> GetLocationsByBoundsAsync(decimal northLat, decimal southLat, decimal eastLng, decimal westLng);
        Task<List<LocationDto>> GetNearbyLocationsAsync(decimal latitude, decimal longitude, double radiusKm);
        Task<List<LocationDto>> GetLocationsByCityAsync(string city);
        Task<List<LocationDto>> GetLocationsByCountryAsync(string city);
        Task<List<LocationDto>> SearchLocationsAsync(string searchTerm);
        Task<PagedResult<LocationDto>> GetLocationsAsync(int page = 1, int pageSize = 10);
        
        // City and district operations
        Task<List<string>> GetAllCitiesAsync();
        Task<List<string>> GetDistinctCitiesAsync();
        Task<List<string>> GetDistrictsByCityAsync(string city);
    }
}
