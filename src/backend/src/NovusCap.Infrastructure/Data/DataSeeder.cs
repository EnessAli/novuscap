using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NovusCap.Domain.Entities;
using NovusCap.Domain.Enums;

namespace NovusCap.Infrastructure.Data
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            // Ensure database is created
            await context.Database.EnsureCreatedAsync();

            // Seed Roles
            await SeedRolesAsync(roleManager);

            // Seed Users
            await SeedUsersAsync(userManager);

            // Seed Organization Types
            await SeedOrganizationTypesAsync(context);

            // Seed Locations
            await SeedLocationsAsync(context);            await context.SaveChangesAsync();
        }

        private static async Task SeedRolesAsync(RoleManager<Role> roleManager)
        {
            var roles = new[]
            {
                UserRoles.SuperAdmin,
                UserRoles.Admin,
                UserRoles.Editor,
                UserRoles.GirisimTemsilcisi,
                UserRoles.Gozlemci
            };

            foreach (var roleName in roles)
            {                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    var role = new Role
                    {
                        Id = Guid.NewGuid(),
                        Name = roleName,
                        NormalizedName = roleName.ToUpper(),
                        Description = GetRoleDescription(roleName)
                    };
                    await roleManager.CreateAsync(role);
                }
            }
        }

        private static async Task SeedUsersAsync(UserManager<User> userManager)
        {
            // Create Super Admin User
            const string adminEmail = "admin@novuscap.com";            if (await userManager.FindByEmailAsync(adminEmail) == null)
            {
                var adminUser = new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Super",
                    LastName = "Admin",
                    UserName = "superadmin",
                    Email = adminEmail,
                    EmailConfirmed = true
                };var result = await userManager.CreateAsync(adminUser, "Admin123!");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, UserRoles.SuperAdmin);
                    await userManager.AddToRoleAsync(adminUser, UserRoles.Admin);
                }
            }

            // Create Editor User
            const string editorEmail = "editor@novuscap.com";
            if (await userManager.FindByEmailAsync(editorEmail) == null)
            {                var editorUser = new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Content",
                    LastName = "Editor",
                    UserName = "editor",
                    Email = editorEmail,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(editorUser, "Editor123!");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(editorUser, UserRoles.Editor);
                }
            }
        }

        private static async Task SeedOrganizationTypesAsync(ApplicationDbContext context)
        {
            if (!context.OrganizationTypes.Any())
            {
                var organizationTypes = new[]
                {
                    new OrganizationType
                    {
                        Name = "Startup",
                        Description = "Teknoloji tabanlı yeni kurulan şirketler",
                        Color = "#FF6B6B",
                        Icon = "startup-icon.svg"
                    },
                    new OrganizationType
                    {
                        Name = "Yatırımcı",
                        Description = "Girişimlere yatırım yapan kurum ve kişiler",
                        Color = "#4ECDC4",
                        Icon = "investor-icon.svg"
                    },
                    new OrganizationType
                    {
                        Name = "Teknopark",
                        Description = "Teknoloji geliştirme bölgeleri",
                        Color = "#45B7D1",
                        Icon = "technopark-icon.svg"
                    },
                    new OrganizationType
                    {
                        Name = "İnkübatör",
                        Description = "Girişim kuluçka merkezleri",
                        Color = "#F9CA24",
                        Icon = "incubator-icon.svg"
                    },
                    new OrganizationType
                    {
                        Name = "Topluluk",
                        Description = "Girişimcilik toplulukları ve organizasyonları",
                        Color = "#6C5CE7",
                        Icon = "community-icon.svg"
                    },
                    new OrganizationType
                    {
                        Name = "Co-working Space",
                        Description = "Ortak çalışma alanları",
                        Color = "#A29BFE",
                        Icon = "coworking-icon.svg"
                    },
                    new OrganizationType
                    {
                        Name = "Ar-Ge Merkezi",
                        Description = "Araştırma ve geliştirme merkezleri",
                        Color = "#E17055",
                        Icon = "rnd-icon.svg"
                    }
                };

                await context.OrganizationTypes.AddRangeAsync(organizationTypes);
            }
        }

        private static async Task SeedLocationsAsync(ApplicationDbContext context)
        {
            if (!context.Locations.Any())
            {
                var locations = new[]
                {
                    new Location { City = "İstanbul", District = "Beyoğlu", Latitude = 41.0370m, Longitude = 28.9859m },
                    new Location { City = "İstanbul", District = "Kadıköy", Latitude = 40.9833m, Longitude = 29.0167m },
                    new Location { City = "İstanbul", District = "Beşiktaş", Latitude = 41.0422m, Longitude = 29.0060m },
                    new Location { City = "Ankara", District = "Çankaya", Latitude = 39.9208m, Longitude = 32.8541m },
                    new Location { City = "Ankara", District = "Kızılay", Latitude = 39.9190m, Longitude = 32.8540m },
                    new Location { City = "İzmir", District = "Konak", Latitude = 38.4189m, Longitude = 27.1287m },
                    new Location { City = "İzmir", District = "Karşıyaka", Latitude = 38.4592m, Longitude = 27.1287m },
                    new Location { City = "Bursa", District = "Osmangazi", Latitude = 40.1885m, Longitude = 29.0610m },
                    new Location { City = "Antalya", District = "Muratpaşa", Latitude = 36.8969m, Longitude = 30.7133m },
                    new Location { City = "Adana", District = "Seyhan", Latitude = 37.0000m, Longitude = 35.3213m }
                };

                await context.Locations.AddRangeAsync(locations);
            }
        }

        private static string GetRoleDescription(string roleName)
        {
            return roleName switch
            {
                UserRoles.SuperAdmin => "Sistem yöneticisi - Tüm yetkilere sahip",
                UserRoles.Admin => "Yönetici - Admin paneline erişebilir",
                UserRoles.Editor => "İçerik editörü - Organizasyon bilgilerini düzenleyebilir",
                UserRoles.GirisimTemsilcisi => "Girişim temsilcisi - Kendi organizasyonunu yönetebilir",
                UserRoles.Gozlemci => "Gözlemci - Sadece görüntüleme yetkisi",
                _ => "Kullanıcı rolü"
            };
        }
    }
}
