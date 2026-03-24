using System.Collections.Generic;
using System.Security.Claims;

namespace NovusCap.Domain.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(string userId, string? email, IEnumerable<string> roles);
        string GenerateRefreshToken();
        bool ValidateToken(string token);
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
    }
}
