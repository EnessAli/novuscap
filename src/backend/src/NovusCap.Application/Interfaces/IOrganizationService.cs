using NovusCap.Application.DTOs;
using NovusCap.Domain.Models;

namespace NovusCap.Application.Interfaces
{
    public interface IOrganizationService
    {
        // Basic CRUD operations
        Task<PaginatedResult<OrganizationDto>> GetAllOrganizationsAsync(int page = 1, int pageSize = 10);
        Task<OrganizationDto?> GetOrganizationByIdAsync(Guid id);
        Task<OrganizationDto> CreateOrganizationAsync(OrganizationDto organizationDto, Guid createdByUserId = default);
        Task<OrganizationDto> UpdateOrganizationAsync(Guid id, OrganizationDto organizationDto);
        Task<bool> DeleteOrganizationAsync(Guid id);
        Task<bool> OrganizationExistsAsync(Guid id);
        
        // Filtering and searching
        Task<PaginatedResult<OrganizationDto>> GetOrganizationsAsync(int page = 1, int pageSize = 10, string? searchTerm = null, Guid? typeId = null);
        Task<PaginatedResult<OrganizationDto>> GetOrganizationsByTypeAsync(Guid typeId, int page = 1, int pageSize = 10);
        Task<PaginatedResult<OrganizationDto>> GetOrganizationsByLocationAsync(string city, string? district = null, int page = 1, int pageSize = 10);
        Task<PaginatedResult<OrganizationDto>> SearchOrganizationsAsync(string searchTerm, int page = 1, int pageSize = 10);
        Task<List<OrganizationDto>> GetNearbyOrganizationsAsync(decimal latitude, decimal longitude, int radiusKm = 50);
        
        // Admin operations
        Task<PaginatedResult<OrganizationDto>> GetPendingOrganizationsAsync(int page = 1, int pageSize = 10);
        Task<OrganizationDto> ApproveOrganizationAsync(Guid id, Guid approvedByUserId);
        Task<OrganizationDto> RejectOrganizationAsync(Guid id, Guid rejectedByUserId);
    }
}