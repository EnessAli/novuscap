using NovusCap.Application.DTOs;
using NovusCap.Application.DTOs.Auth;

namespace NovusCap.Application.Interfaces
{
    public interface IAuthService
    {
        // Authentication operations
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<bool> LogoutAsync(Guid userId);
        Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
        Task<bool> ValidateTokenAsync(string token);
        
        // Password management
        Task<bool> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword);
        Task<bool> ForgotPasswordAsync(string email);
        Task<bool> ResetPasswordAsync(string token, string newPassword);
        
        // User profile
        Task<UserDto?> GetCurrentUserAsync(Guid userId);
    }
}