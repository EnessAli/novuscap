using System;
using System.Collections.Generic;
using System.Linq;
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
    public class ReportService : IReportService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReportService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ReportDto> CreateReportAsync(ReportDto reportDto, Guid createdByUserId)
        {
            var report = _mapper.Map<Report>(reportDto);
            report.Id = Guid.NewGuid();
            // CreatedAt is automatically set in BaseEntity
            report.CreatedByUserId = createdByUserId;

            await _unitOfWork.Reports.AddAsync(report);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ReportDto>(report);
        }

        public async Task<ReportDto?> GetReportByIdAsync(Guid id)
        {
            var report = await _unitOfWork.Reports.GetByIdAsync(id);

            if (report == null)
            {
                return null;
            }

            return _mapper.Map<ReportDto>(report);
        }

        public async Task<PaginatedResult<ReportDto>> GetAllReportsAsync(int page = 1, int pageSize = 10)
        {
            var reports = await _unitOfWork.Reports.GetPagedAsync(
                page, pageSize,
                filter: null,
                orderBy: q => q.OrderByDescending(r => r.CreatedAt));

            var reportDtos = _mapper.Map<List<ReportDto>>(reports.Items);

            return new PaginatedResult<ReportDto>
            {
                Items = reportDtos,
                TotalCount = reports.TotalCount,
                PageNumber = page,
                PageSize = pageSize
                // TotalPages özelliği otomatik hesaplanıyor
            };
        }

        public async Task<PagedResult<ReportDto>> GetReportsAsync(int page, int pageSize, string? type = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            var reports = await _unitOfWork.Reports.GetPagedAsync(
                page, pageSize,
                filter: r => (string.IsNullOrEmpty(type) || r.Type == type) &&
                            (!startDate.HasValue || r.StartDate >= startDate.Value) &&
                            (!endDate.HasValue || r.EndDate <= endDate.Value),
                orderBy: q => q.OrderByDescending(r => r.CreatedAt));

            var reportDtos = _mapper.Map<IEnumerable<ReportDto>>(reports.Items);

            return new PagedResult<ReportDto>
            {
                Items = reportDtos,
                TotalCount = reports.TotalCount,
                Page = page,
                PageSize = pageSize
            };
        }

        public async Task<ReportDto> UpdateReportAsync(Guid id, ReportDto reportDto)
        {
            var report = await _unitOfWork.Reports.GetByIdAsync(id);
            if (report == null)
            {
                throw new ArgumentException("Report not found.");
            }

            _mapper.Map(reportDto, report);
            // CreatedAt is automatically set in BaseEntity

            await _unitOfWork.Reports.UpdateAsync(report);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ReportDto>(report);
        }

        public async Task<bool> DeleteReportAsync(Guid id)
        {
            var report = await _unitOfWork.Reports.GetByIdAsync(id);
            if (report == null)
            {
                return false;
            }

            await _unitOfWork.Reports.DeleteAsync(report);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ReportExistsAsync(Guid id)
        {
            var report = await _unitOfWork.Reports.GetByIdAsync(id);
            return report != null;
        }

        public async Task<PaginatedResult<ReportDto>> GetReportsByTypeAsync(string type, int page = 1, int pageSize = 10)
        {
            var reports = await _unitOfWork.Reports.GetPagedAsync(
                page, pageSize,
                filter: r => r.Type == type,
                orderBy: q => q.OrderByDescending(r => r.CreatedAt));

            var reportDtos = _mapper.Map<List<ReportDto>>(reports.Items);

            return new PaginatedResult<ReportDto>
            {
                Items = reportDtos,
                TotalCount = reports.TotalCount,
                PageNumber = page,
                PageSize = pageSize
                // TotalPages özelliği otomatik hesaplanıyor
            };
        }
        
        public async Task<PaginatedResult<ReportDto>> GetReportsByUserAsync(Guid userId, int page = 1, int pageSize = 10)
        {
            var reports = await _unitOfWork.Reports.GetPagedAsync(
                page, pageSize,
                filter: r => r.CreatedByUserId == userId,
                orderBy: q => q.OrderByDescending(r => r.CreatedAt));

            var reportDtos = _mapper.Map<List<ReportDto>>(reports.Items);

            return new PaginatedResult<ReportDto>
            {
                Items = reportDtos,
                TotalCount = reports.TotalCount,
                PageNumber = page,
                PageSize = pageSize
                // TotalPages özelliği otomatik hesaplanıyor
            };
        }

        public async Task<IEnumerable<ReportDto>> GetReportsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            var reports = await _unitOfWork.Reports.FindAsync(
                r => r.StartDate >= startDate && r.EndDate <= endDate);

            return _mapper.Map<IEnumerable<ReportDto>>(reports);
        }

        public async Task<ReportDto> GenerateOrganizationStatsReportAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var actualStartDate = startDate ?? DateTime.UtcNow.AddMonths(-1);
            var actualEndDate = endDate ?? DateTime.UtcNow;
            
            var organizations = await _unitOfWork.Organizations.FindAsync(
                o => o.CreatedAt >= actualStartDate && o.CreatedAt <= actualEndDate);

            var reportData = new
            {
                TotalOrganizations = organizations.Count(),
                OrganizationsByType = organizations.GroupBy(o => o.OrganizationType?.Name ?? "Unclassified")
                    .Select(g => new { Type = g.Key, Count = g.Count() }),
                PublicOrganizations = organizations.Count(o => o.IsPublic),
                PrivateOrganizations = organizations.Count(o => !o.IsPublic)
            };

            var report = new Report
            {
                Id = Guid.NewGuid(),
                Name = $"Organization Statistics Report - {actualStartDate:yyyy-MM-dd} to {actualEndDate:yyyy-MM-dd}",
                Type = "OrganizationStats",
                Description = "Statistical report of organizations created within the specified date range",
                Data = System.Text.Json.JsonSerializer.Serialize(reportData),
                StartDate = actualStartDate,
                EndDate = actualEndDate,
                CreatedByUserId = Guid.Parse("00000000-0000-0000-0000-000000000001") // System user
                // CreatedAt is automatically set in BaseEntity
            };

            await _unitOfWork.Reports.AddAsync(report);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ReportDto>(report);
        }

        public async Task<ReportDto> GenerateUserActivityReportAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var actualStartDate = startDate ?? DateTime.UtcNow.AddMonths(-1);
            var actualEndDate = endDate ?? DateTime.UtcNow;
            
            var users = await _unitOfWork.Users.FindAsync(
                u => u.CreatedAt >= actualStartDate && u.CreatedAt <= actualEndDate);

            var reportData = new
            {
                TotalUsers = users.Count(),
                ActiveUsers = users.Count(u => !u.IsDeleted),
                InactiveUsers = users.Count(u => u.IsDeleted),
                UsersWithOrganizations = users.Count(u => u.Organizations.Any()),
                NewUsersPerDay = users.GroupBy(u => u.CreatedAt.Date)
                    .Select(g => new { Date = g.Key.ToString("yyyy-MM-dd"), Count = g.Count() })
            };

            var report = new Report
            {
                Id = Guid.NewGuid(),
                Name = $"User Activity Report - {actualStartDate:yyyy-MM-dd} to {actualEndDate:yyyy-MM-dd}",
                Type = "UserActivity",
                Description = "Statistical report of user activity within the specified date range",
                Data = System.Text.Json.JsonSerializer.Serialize(reportData),
                StartDate = actualStartDate,
                EndDate = actualEndDate,
                CreatedByUserId = Guid.Parse("00000000-0000-0000-0000-000000000001") // System user
                // CreatedAt is automatically set in BaseEntity
            };

            await _unitOfWork.Reports.AddAsync(report);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ReportDto>(report);
        }

        public async Task<IEnumerable<string>> GetDistinctReportTypesAsync()
        {
            var reports = await _unitOfWork.Reports.GetAllAsync();
            return reports.Select(r => r.Type).Distinct().OrderBy(t => t);
        }

        public async Task<ReportDto> GenerateLocationStatsReportAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var actualStartDate = startDate ?? DateTime.UtcNow.AddMonths(-1);
            var actualEndDate = endDate ?? DateTime.UtcNow;
            
            var locations = await _unitOfWork.Locations.FindAsync(
                l => l.CreatedAt >= actualStartDate && l.CreatedAt <= actualEndDate);

            var reportData = new
            {
                TotalLocations = locations.Count(),
                LocationsByCity = locations.GroupBy(l => l.City ?? "Unclassified")
                    .Select(g => new { City = g.Key, Count = g.Count() }),
                LocationsByDistrict = locations.GroupBy(l => l.District ?? "Unclassified")
                    .Select(g => new { District = g.Key, Count = g.Count() }),
                NewLocationsPerDay = locations.GroupBy(l => l.CreatedAt.Date)
                    .Select(g => new { Date = g.Key.ToString("yyyy-MM-dd"), Count = g.Count() })
            };

            var report = new Report
            {
                Id = Guid.NewGuid(),
                Name = $"Location Statistics Report - {actualStartDate:yyyy-MM-dd} to {actualEndDate:yyyy-MM-dd}",
                Type = "LocationStats",
                Description = "Statistical report of locations created within the specified date range",
                Data = System.Text.Json.JsonSerializer.Serialize(reportData),
                StartDate = actualStartDate,
                EndDate = actualEndDate,
                CreatedByUserId = Guid.Parse("00000000-0000-0000-0000-000000000001") // System user
            };

            await _unitOfWork.Reports.AddAsync(report);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ReportDto>(report);
        }

        public async Task<ReportDto> GenerateOrganizationReportAsync(DateTime startDate, DateTime endDate, Guid organizationId)
        {
            // Get the organization
            var organization = await _unitOfWork.Organizations.GetByIdAsync(organizationId);
            
            if (organization == null)
            {
                throw new ArgumentException($"Organization with ID {organizationId} not found");
            }

            // Get organization-specific data within date range
            var reports = await _unitOfWork.Reports.FindAsync(
                r => r.CreatedAt >= startDate && r.CreatedAt <= endDate && 
                     r.Data.Contains(organizationId.ToString()));

            var reportData = new
            {
                OrganizationId = organization.Id,
                OrganizationName = organization.Name,
                OrganizationType = organization.OrganizationType?.Name ?? "Unclassified",
                DateRange = new { Start = startDate, End = endDate },
                ActivitySummary = new
                {
                    TotalReports = reports.Count(),
                    ReportsByType = reports.GroupBy(r => r.Type)
                        .Select(g => new { Type = g.Key, Count = g.Count() })
                }
            };

            var report = new Report
            {
                Id = Guid.NewGuid(),
                Name = $"Organization Report - {organization.Name} - {startDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd}",
                Type = "OrganizationReport",
                Description = $"Detailed report for organization {organization.Name} within the specified date range",
                Data = System.Text.Json.JsonSerializer.Serialize(reportData),
                StartDate = startDate,
                EndDate = endDate,
                CreatedByUserId = Guid.Parse("00000000-0000-0000-0000-000000000001") // System user
            };

            await _unitOfWork.Reports.AddAsync(report);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ReportDto>(report);
        }
    }
}
