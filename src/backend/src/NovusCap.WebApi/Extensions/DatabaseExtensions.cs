using Microsoft.EntityFrameworkCore;
using NovusCap.Domain.Entities;
using NovusCap.Infrastructure.Data;

namespace NovusCap.WebApi.Extensions
{
    public static class DatabaseExtensions
    {
        public static async Task InitializeDatabaseAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            
            try
            {
                // Ensure database is created
                await context.Database.EnsureCreatedAsync();
                
                // Seed data if empty
                await SeedDataAsync(context);
            }
            catch (Exception ex)
            {
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred while initializing the database");
            }
        }
        
        private static async Task SeedDataAsync(ApplicationDbContext context)
        {
            // Seed Organization Types
            if (!await context.OrganizationTypes.AnyAsync())
            {
                var organizationTypes = new List<OrganizationType>
                {
                    new OrganizationType
                    {
                        Id = Guid.NewGuid(),
                        Name = "Startup",
                        Description = "Yeni kurulan teknoloji şirketleri",
                        Color = "#FF6B6B",
                        Icon = "rocket",
                        CreatedAt = DateTime.UtcNow
                    },
                    new OrganizationType
                    {
                        Id = Guid.NewGuid(),
                        Name = "Investor",
                        Description = "Yatırım şirketleri ve fonları",
                        Color = "#4ECDC4",
                        Icon = "dollar-sign",
                        CreatedAt = DateTime.UtcNow
                    },
                    new OrganizationType
                    {
                        Id = Guid.NewGuid(),
                        Name = "R&D Center",
                        Description = "Araştırma ve geliştirme merkezleri",
                        Color = "#45B7D1",
                        Icon = "flask",
                        CreatedAt = DateTime.UtcNow
                    },
                    new OrganizationType
                    {
                        Id = Guid.NewGuid(),
                        Name = "Technopark",
                        Description = "Teknoloji parkları",
                        Color = "#96CEB4",
                        Icon = "building",
                        CreatedAt = DateTime.UtcNow
                    },
                    new OrganizationType
                    {
                        Id = Guid.NewGuid(),
                        Name = "Incubator",
                        Description = "Kuluçka merkezleri",
                        Color = "#FFEAA7",
                        Icon = "egg",
                        CreatedAt = DateTime.UtcNow
                    },
                    new OrganizationType
                    {
                        Id = Guid.NewGuid(),
                        Name = "Community",
                        Description = "Girişimcilik toplulukları",
                        Color = "#DDA0DD",
                        Icon = "users",
                        CreatedAt = DateTime.UtcNow
                    },
                    new OrganizationType
                    {
                        Id = Guid.NewGuid(),
                        Name = "Co-working Space",
                        Description = "Ortak çalışma alanları",
                        Color = "#F39C12",
                        Icon = "coffee",
                        CreatedAt = DateTime.UtcNow
                    }
                };
                
                await context.OrganizationTypes.AddRangeAsync(organizationTypes);
                await context.SaveChangesAsync();
            }
            
            // Seed Locations
            if (!await context.Locations.AnyAsync())
            {
                var locations = new List<Location>
                {
                    new Location
                    {
                        Id = Guid.NewGuid(),
                        City = "İstanbul",
                        District = "Şişli",
                        Latitude = 41.0578m,
                        Longitude = 28.9869m,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Location
                    {
                        Id = Guid.NewGuid(),
                        City = "İstanbul",
                        District = "Beyoğlu",
                        Latitude = 41.0362m,
                        Longitude = 28.9852m,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Location
                    {
                        Id = Guid.NewGuid(),
                        City = "Ankara",
                        District = "Çankaya",
                        Latitude = 39.9208m,
                        Longitude = 32.8541m,
                        CreatedAt = DateTime.UtcNow
                    },
                    new Location
                    {
                        Id = Guid.NewGuid(),
                        City = "İzmir",
                        District = "Konak",
                        Latitude = 38.4189m,
                        Longitude = 27.1287m,
                        CreatedAt = DateTime.UtcNow
                    }
                };
                
                await context.Locations.AddRangeAsync(locations);
                await context.SaveChangesAsync();
            }
        }
    }
}
