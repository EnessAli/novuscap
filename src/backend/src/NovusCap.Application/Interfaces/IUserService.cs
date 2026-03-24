using NovusCap.Application.DTOs;
using NovusCap.Application.DTOs.Auth;
using NovusCap.Domain.Models;

namespace NovusCap.Application.Interfaces
{
    public interface IUserService
    {
        // Basic user operations
        Task<UserDto?> GetUserByIdAsync(Guid userId);
        Task<PaginatedResult<UserDto>> GetAllUsersAsync(int page = 1, int pageSize = 10);
        Task<PagedResult<UserDto>> GetUsersAsync(int page, int pageSize, string? searchTerm = null);
        Task<UserDto> CreateUserAsync(RegisterDto registerDto);
        Task<UserDto> UpdateUserAsync(Guid userId, UserDto userDto);
        Task<bool> DeleteUserAsync(Guid userId);
        Task<bool> UserExistsAsync(Guid userId);
        
        // User lookup operations
        Task<UserDto?> GetUserByEmailAsync(string email);
        Task<UserDto?> GetUserByUserNameAsync(string userName);
        
        // Role management
        Task<bool> AssignRoleToUserAsync(Guid userId, string roleName);
        Task<bool> RemoveRoleFromUserAsync(Guid userId, string roleName);
        Task<List<string>> GetUserRolesAsync(Guid userId);
        Task<bool> IsInRoleAsync(Guid userId, string roleName);
        
        // Account management
        Task<UserDto> RegisterUserAsync(RegisterDto registerDto);
        Task ActivateUserAsync(Guid userId);
        Task DeactivateUserAsync(Guid userId);
    }
}