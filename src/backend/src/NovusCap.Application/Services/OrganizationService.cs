using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NovusCap.Domain.Models;
using NovusCap.Application.DTOs;
using NovusCap.Application.Interfaces;
using NovusCap.Domain.Entities;
using NovusCap.Domain.Interfaces;

namespace NovusCap.Application.Services
{
    public class OrganizationService : IOrganizationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrganizationService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<OrganizationDto>> GetAllOrganizationsAsync(int page = 1, int pageSize = 10)
        {
            var organizations = await _unitOfWork.Organizations.GetPagedAsync(
                page, pageSize, 
                filter: null,
                orderBy: q => q.OrderBy(o => o.Name));

            var organizationDtos = _mapper.Map<List<OrganizationDto>>(organizations.Items);

            return new PaginatedResult<OrganizationDto>
            {
                Items = organizationDtos,
                TotalCount = organizations.TotalCount,
                PageNumber = organizations.Page,
                PageSize = organizations.PageSize
                // TotalPages özelliği otomatik hesaplanıyor
            };
        }

        public async Task<OrganizationDto> CreateAsync(CreateOrganizationDto createDto)
        {
            var organization = new Organization
            {
                Name = createDto.Name,
                Description = createDto.Description ?? string.Empty,
                LogoUrl = createDto.LogoUrl ?? string.Empty,
                WebsiteUrl = createDto.Website ?? string.Empty
            };

            await _unitOfWork.Organizations.AddAsync(organization);
            
            return new OrganizationDto
            {
                Id = organization.Id,
                Name = organization.Name,
                Description = organization.Description ?? string.Empty,
                LogoUrl = organization.LogoUrl ?? string.Empty,
                Website = organization.WebsiteUrl ?? string.Empty
            };
        }

        public async Task<OrganizationDto?> GetOrganizationByIdAsync(Guid id)
        {
            var organization = await _unitOfWork.Organizations.GetByIdAsync(id);

            if (organization == null)
            {
                return null;
            }

            return _mapper.Map<OrganizationDto>(organization);
        }

        public async Task<OrganizationDto> CreateOrganizationAsync(OrganizationDto organizationDto, Guid createdByUserId)
        {
            var organization = _mapper.Map<Organization>(organizationDto);
            organization.Id = Guid.NewGuid();
            // CreatedAt otomatik olarak BaseEntity'de ayarlanıyor
            organization.CreatedByUserId = createdByUserId;

            await _unitOfWork.Organizations.AddAsync(organization);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<OrganizationDto>(organization);
        }

        public async Task<OrganizationDto> UpdateOrganizationAsync(Guid id, OrganizationDto organizationDto)
        {
            var organization = await _unitOfWork.Organizations.GetByIdAsync(id);
            if (organization == null)
            {
                throw new ArgumentException("Organization not found.");
            }

            _mapper.Map(organizationDto, organization);
            organization.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.Organizations.UpdateAsync(organization);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<OrganizationDto>(organization);
        }

        public async Task<bool> DeleteOrganizationAsync(Guid id)
        {
            var organization = await _unitOfWork.Organizations.GetByIdAsync(id);
            if (organization == null)
            {
                return false;
            }

            await _unitOfWork.Organizations.DeleteAsync(organization);
            await _unitOfWork.SaveChangesAsync();
            
            return true;
        }

        public async Task<PaginatedResult<OrganizationDto>> GetOrganizationsByTypeAsync(Guid organizationTypeId, int page = 1, int pageSize = 10)
        {
            var organizations = await _unitOfWork.Organizations.GetPagedAsync(
                page, pageSize, 
                filter: o => o.OrganizationTypeId == organizationTypeId,
                orderBy: q => q.OrderBy(o => o.Name));

            var organizationDtos = _mapper.Map<List<OrganizationDto>>(organizations.Items);

            return new PaginatedResult<OrganizationDto>
            {
                Items = organizationDtos,
                TotalCount = organizations.TotalCount,
                PageNumber = page,
                PageSize = pageSize
                // TotalPages özelliği otomatik hesaplanıyor
            };
        }

        public async Task<PaginatedResult<OrganizationDto>> GetOrganizationsByLocationAsync(string city, string? district = null, int page = 1, int pageSize = 10)
        {
            Expression<Func<Organization, bool>> filter;

            if (!string.IsNullOrEmpty(district))
            {
                filter = o => o.OrganizationDetail != null &&
                               o.OrganizationDetail.Location != null &&
                               o.OrganizationDetail.Location.City == city &&
                               o.OrganizationDetail.Location.District == district;
            }
            else
            {
                filter = o => o.OrganizationDetail != null && 
                               o.OrganizationDetail.Location != null && 
                               o.OrganizationDetail.Location.City == city;
            }

            var organizations = await _unitOfWork.Organizations.GetPagedAsync(
                page, pageSize,
                filter: filter,
                orderBy: q => q.OrderBy(o => o.Name));

            var organizationDtos = _mapper.Map<List<OrganizationDto>>(organizations.Items);

            return new PaginatedResult<OrganizationDto>
            {
                Items = organizationDtos,
                TotalCount = organizations.TotalCount,
                PageNumber = page,
                PageSize = pageSize
                // TotalPages özelliği otomatik hesaplanıyor
            };
        }

        public async Task<PaginatedResult<OrganizationDto>> SearchOrganizationsAsync(string searchTerm, int page = 1, int pageSize = 10)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                throw new ArgumentException("Search term cannot be empty.");
            }

            var organizations = await _unitOfWork.Organizations.GetPagedAsync(
                page, pageSize,
                filter: o => o.Name.Contains(searchTerm) ||
                     (o.Description != null && o.Description.Contains(searchTerm)) ||
                     (o.OrganizationDetail != null && o.OrganizationDetail.Address != null && o.OrganizationDetail.Address.Contains(searchTerm)),
                orderBy: q => q.OrderBy(o => o.Name));

            var organizationDtos = _mapper.Map<List<OrganizationDto>>(organizations.Items);

            return new PaginatedResult<OrganizationDto>
            {
                Items = organizationDtos,
                TotalCount = organizations.TotalCount,
                PageNumber = page,
                PageSize = pageSize
                // TotalPages özelliği otomatik hesaplanıyor
            };
        }

        public async Task<List<OrganizationDto>> GetNearbyOrganizationsAsync(decimal latitude, decimal longitude, int radiusKm = 50)
        {
            // Bu method, koordinat hesaplamaları gerektiriyor
            // Basit bir yaklaşım olarak, tüm organizasyonları alıp aralarında mesafe hesaplaması yapabiliriz
            // veya veritabanında spatial veri tipi kullanıyorsak SQL sorgusunda mesafe hesaplayabiliriz
            
            // Şimdilik basit bir dummy implementasyon yapıyorum
            var organizations = await _unitOfWork.Organizations.FindAsync(
                o => true);
            
            // Gerçek uygulamada burada konum hesaplaması yapılacaktır
            // Örnek: Haversine formülü ile mesafe hesaplaması
            
            return _mapper.Map<List<OrganizationDto>>(organizations.Take(10)); // Şimdilik sadece ilk 10 organizasyonu döndürüyorum
        }

        public async Task<bool> OrganizationExistsAsync(Guid id)
        {
            return await _unitOfWork.Organizations.ExistsAsync(o => o.Id == id);
        }

        public async Task<PaginatedResult<OrganizationDto>> GetOrganizationsAsync(int page = 1, int pageSize = 10, string? searchTerm = null, Guid? organizationTypeId = null)
        {
            Expression<Func<Organization, bool>> filter = o => true;

            if (!string.IsNullOrEmpty(searchTerm))
            {
                filter = o => o.Name.Contains(searchTerm) ||
                    (o.Description != null && o.Description.Contains(searchTerm));
            }

            if (organizationTypeId.HasValue)
            {
                var typedFilter = filter;
                filter = o => typedFilter.Compile()(o) && o.OrganizationTypeId == organizationTypeId.Value;
            }

            var organizations = await _unitOfWork.Organizations.GetPagedAsync(
                page, pageSize,
                filter: filter,
                orderBy: q => q.OrderBy(o => o.Name));

            var organizationDtos = _mapper.Map<List<OrganizationDto>>(organizations.Items);

            return new PaginatedResult<OrganizationDto>
            {
                Items = organizationDtos,
                TotalCount = organizations.TotalCount,
                PageNumber = page,
                PageSize = pageSize
            };
        }

        public async Task<PaginatedResult<OrganizationDto>> GetPendingOrganizationsAsync(int page = 1, int pageSize = 10)
        {
            var organizations = await _unitOfWork.Organizations.GetPagedAsync(
                page, pageSize,
                filter: o => !o.IsPublic,
                orderBy: q => q.OrderByDescending(o => o.CreatedAt));

            var organizationDtos = _mapper.Map<List<OrganizationDto>>(organizations.Items);

            return new PaginatedResult<OrganizationDto>
            {
                Items = organizationDtos,
                TotalCount = organizations.TotalCount,
                PageNumber = page,
                PageSize = pageSize
            };
        }

        public async Task<OrganizationDto> ApproveOrganizationAsync(Guid id, Guid approvedByUserId)
        {
            var organization = await _unitOfWork.Organizations.GetByIdAsync(id);
            if (organization == null)
            {
                throw new ArgumentException($"Organization with ID {id} not found");
            }

            organization.IsPublic = true;
            organization.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.Organizations.UpdateAsync(organization);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<OrganizationDto>(organization);
        }

        public async Task<OrganizationDto> RejectOrganizationAsync(Guid id, Guid rejectedByUserId)
        {
            var organization = await _unitOfWork.Organizations.GetByIdAsync(id);
            if (organization == null)
            {
                throw new ArgumentException($"Organization with ID {id} not found");
            }

            // You might want to set a status property or handle rejection differently
            // For now, we're just marking it as deleted
            organization.IsDeleted = true;
            organization.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.Organizations.UpdateAsync(organization);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<OrganizationDto>(organization);
        }
    }
}