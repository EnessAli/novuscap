using System.ComponentModel.DataAnnotations;

namespace NovusCap.WebApi.Configuration
{
    public class EnvironmentValidator
    {
        public static void ValidateProductionEnvironment(IConfiguration configuration, IWebHostEnvironment environment)
        {
            var errors = new List<string>();

            if (environment.IsProduction())
            {
                // Database connection validation
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                if (string.IsNullOrEmpty(connectionString) || connectionString.Contains("localhost"))
                {
                    errors.Add("Production database connection string must be set and not use localhost");
                }

                // JWT secret validation
                var jwtSecret = configuration["Jwt:SecretKey"];
                if (string.IsNullOrEmpty(jwtSecret) || jwtSecret.Length < 32)
                {
                    errors.Add("JWT SecretKey must be at least 32 characters long in production");
                }

                // HTTPS validation
                var allowedHosts = configuration["AllowedHosts"];
                if (string.IsNullOrEmpty(allowedHosts) || allowedHosts == "*")
                {
                    errors.Add("AllowedHosts must be configured in production (not *)");
                }

                // Email settings validation
                var smtpHost = configuration["EmailSettings:Host"];
                if (string.IsNullOrEmpty(smtpHost))
                {
                    errors.Add("Email settings must be configured in production");
                }

                if (errors.Any())
                {
                    var errorMessage = "Production environment validation failed:\n" + 
                                     string.Join("\n", errors.Select(e => $"- {e}"));
                    throw new InvalidOperationException(errorMessage);
                }
            }
        }
    }
}
