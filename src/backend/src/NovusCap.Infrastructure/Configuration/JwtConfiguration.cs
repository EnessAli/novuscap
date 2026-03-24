namespace NovusCap.Infrastructure.Configuration
{
    public class JwtConfiguration
    {
        public const string SectionName = "Jwt";
        
        public string SecretKey { get; set; } = string.Empty;
        public int ExpirationInMinutes { get; set; } = 60;
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public int RefreshTokenExpirationInDays { get; set; } = 7;
    }
}