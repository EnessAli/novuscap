using AutoMapper;
using NovusCap.Application.DTOs;
using NovusCap.Application.DTOs.Auth;
using NovusCap.Domain.Entities;

namespace NovusCap.Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User mappings
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Roles, opt => opt.Ignore());
            CreateMap<RegisterDto, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false));

            // Organization mappings
            CreateMap<Organization, OrganizationDto>()
                .ForMember(dest => dest.Website, opt => opt.MapFrom(src => src.WebsiteUrl));
            CreateMap<OrganizationDto, Organization>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.OrganizationType, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedByUser, opt => opt.Ignore())
                .ForMember(dest => dest.OrganizationDetail, opt => opt.Ignore());

            // OrganizationType mappings
            CreateMap<OrganizationType, OrganizationTypeDto>();
            CreateMap<OrganizationTypeDto, OrganizationType>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.Organizations, opt => opt.Ignore());

            // OrganizationDetail mappings
            CreateMap<OrganizationDetail, OrganizationDetailDto>();
            CreateMap<OrganizationDetailDto, OrganizationDetail>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.Organization, opt => opt.Ignore())
                .ForMember(dest => dest.Location, opt => opt.Ignore());

            // Location mappings
            CreateMap<Location, LocationDto>();
            CreateMap<LocationDto, Location>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.OrganizationDetails, opt => opt.Ignore());

            // Report mappings
            CreateMap<Report, ReportDto>()
                .ForMember(dest => dest.CreatedByUserName, opt => opt.MapFrom(src => 
                    src.CreatedByUser.FirstName + " " + src.CreatedByUser.LastName));
            CreateMap<ReportDto, Report>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.CreatedByUser, opt => opt.Ignore());
        }
    }
}
