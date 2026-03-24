using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using NovusCap.Application.DTOs;
using NovusCap.Application.Interfaces;
using NovusCap.Domain.Entities;
using NovusCap.Domain.Interfaces;

namespace NovusCap.Application.Services
{
    public class OrganizationTypeService : IOrganizationTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrganizationTypeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<OrganizationTypeDto> CreateOrganizationTypeAsync(OrganizationTypeDto organizationTypeDto)
        {
            var organizationType = _mapper.Map<OrganizationType>(organizationTypeDto);
            organizationType.Id = Guid.NewGuid();
            // CreatedAt otomatik olarak BaseEntity'de ayarlanıyor

            await _unitOfWork.OrganizationTypes.AddAsync(organizationType);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<OrganizationTypeDto>(organizationType);
        }

        public async Task<OrganizationTypeDto> GetOrganizationTypeByIdAsync(Guid id)
        {
            var organizationType = await _unitOfWork.OrganizationTypes.GetByIdAsync(id);
            if (organizationType == null)
            {
                throw new ArgumentException("Organization type not found.");
            }

            return _mapper.Map<OrganizationTypeDto>(organizationType);
        }

        public async Task<IEnumerable<OrganizationTypeDto>> GetAllOrganizationTypesAsync()
        {
            var organizationTypes = await _unitOfWork.OrganizationTypes.GetAllAsync();
            return _mapper.Map<IEnumerable<OrganizationTypeDto>>(organizationTypes);
        }

        public async Task<OrganizationTypeDto> UpdateOrganizationTypeAsync(Guid id, OrganizationTypeDto organizationTypeDto)
        {
            var organizationType = await _unitOfWork.OrganizationTypes.GetByIdAsync(id);
            if (organizationType == null)
            {
                throw new ArgumentException("Organization type not found.");
            }

            _mapper.Map(organizationTypeDto, organizationType);
            organizationType.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.OrganizationTypes.UpdateAsync(organizationType);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<OrganizationTypeDto>(organizationType);
        }

        public async Task DeleteOrganizationTypeAsync(Guid id)
        {
            var organizationType = await _unitOfWork.OrganizationTypes.GetByIdAsync(id);
            if (organizationType == null)
            {
                throw new ArgumentException("Organization type not found.");
            }

            await _unitOfWork.OrganizationTypes.DeleteAsync(organizationType);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<bool> OrganizationTypeExistsAsync(Guid id)
        {
            var organizationType = await _unitOfWork.OrganizationTypes.GetByIdAsync(id);
            return organizationType != null;
        }
    }
}
