using NovusCap.Application.DTOs;
using NovusCap.Domain.Models;

namespace NovusCap.Application.Interfaces
{
    public interface IReportService
    {
        // Basic report operations
        Task<PaginatedResult<ReportDto>> GetAllReportsAsync(int page = 1, int pageSize = 10);
        Task<ReportDto?> GetReportByIdAsync(Guid id);
        Task<ReportDto> CreateReportAsync(ReportDto reportDto, Guid createdByUserId);
        Task<ReportDto> UpdateReportAsync(Guid id, ReportDto reportDto);
        Task<bool> DeleteReportAsync(Guid id);
        Task<bool> ReportExistsAsync(Guid id);
        
        // Filtered report queries
        Task<PaginatedResult<ReportDto>> GetReportsByTypeAsync(string type, int page = 1, int pageSize = 10);
        Task<PaginatedResult<ReportDto>> GetReportsByUserAsync(Guid userId, int page = 1, int pageSize = 10);
        Task<IEnumerable<ReportDto>> GetReportsByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<PagedResult<ReportDto>> GetReportsAsync(int page, int pageSize, string? type = null, DateTime? startDate = null, DateTime? endDate = null);
        
        // Report generation
        Task<ReportDto> GenerateOrganizationStatsReportAsync(DateTime? startDate = null, DateTime? endDate = null);
        Task<ReportDto> GenerateUserActivityReportAsync(DateTime? startDate = null, DateTime? endDate = null);
        Task<ReportDto> GenerateLocationStatsReportAsync(DateTime? startDate = null, DateTime? endDate = null);
        Task<ReportDto> GenerateOrganizationReportAsync(DateTime startDate, DateTime endDate, Guid organizationId);
        
        // Utility methods
        Task<IEnumerable<string>> GetDistinctReportTypesAsync();
    }
}
