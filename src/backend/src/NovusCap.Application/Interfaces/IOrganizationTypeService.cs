using NovusCap.Application.DTOs;

namespace NovusCap.Application.Interfaces
{
    public interface IOrganizationTypeService
    {
        Task<OrganizationTypeDto> CreateOrganizationTypeAsync(OrganizationTypeDto organizationTypeDto);
        Task<OrganizationTypeDto> GetOrganizationTypeByIdAsync(Guid id);
        Task<IEnumerable<OrganizationTypeDto>> GetAllOrganizationTypesAsync();
        Task<OrganizationTypeDto> UpdateOrganizationTypeAsync(Guid id, OrganizationTypeDto organizationTypeDto);
        Task DeleteOrganizationTypeAsync(Guid id);
        Task<bool> OrganizationTypeExistsAsync(Guid id);
    }
}
