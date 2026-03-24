using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NovusCap.Domain.Entities;

namespace NovusCap.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Organization> Organizations { get; set; }
        public DbSet<OrganizationDetail> OrganizationDetails { get; set; }
        public DbSet<OrganizationType> OrganizationTypes { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<UserLog> UserLogs { get; set; }
        public DbSet<Suggestion> Suggestions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure entity relationships and constraints
            ConfigureOrganization(modelBuilder);
            ConfigureOrganizationDetail(modelBuilder);
            ConfigureLocation(modelBuilder);
            ConfigureLog(modelBuilder);
            ConfigureReport(modelBuilder);
            ConfigureUserLog(modelBuilder);
            ConfigureSuggestion(modelBuilder);
            
            // Configure indexes for performance
            ConfigureIndexes(modelBuilder);
        }

        private static void ConfigureOrganization(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Organization>(entity =>
            {
                entity.HasOne(o => o.OrganizationType)
                    .WithMany(ot => ot.Organizations)
                    .HasForeignKey(o => o.OrganizationTypeId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(o => o.CreatedByUser)
                    .WithMany(u => u.Organizations)
                    .HasForeignKey(o => o.CreatedByUserId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(o => o.OrganizationDetail)
                    .WithOne(od => od.Organization)
                    .HasForeignKey<OrganizationDetail>(od => od.OrganizationId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }

        private static void ConfigureOrganizationDetail(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrganizationDetail>(entity =>
            {
                entity.HasOne(od => od.Location)
                    .WithMany(l => l.OrganizationDetails)
                    .HasForeignKey(od => od.LocationId)
                    .OnDelete(DeleteBehavior.SetNull);
            });
        }

        private static void ConfigureLocation(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>(entity =>
            {
                entity.Property(l => l.Latitude)
                    .HasPrecision(18, 6);
                entity.Property(l => l.Longitude)
                    .HasPrecision(18, 6);
            });
        }

        private static void ConfigureLog(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Log>(entity =>
            {
                entity.HasOne(l => l.User)
                    .WithMany(u => u.Logs)
                    .HasForeignKey(l => l.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }

        private static void ConfigureReport(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasOne(r => r.CreatedByUser)
                    .WithMany(u => u.Reports)
                    .HasForeignKey(r => r.CreatedByUserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }

        private static void ConfigureUserLog(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserLog>(entity =>
            {
                entity.HasOne(ul => ul.User)
                    .WithMany(u => u.UserLogs)
                    .HasForeignKey(ul => ul.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }

        private static void ConfigureSuggestion(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Suggestion>(entity =>
            {
                entity.HasOne(s => s.User)
                    .WithMany(u => u.Suggestions)
                    .HasForeignKey(s => s.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }

        private static void ConfigureIndexes(ModelBuilder modelBuilder)
        {
            // User indexes
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            
            modelBuilder.Entity<User>()
                .HasIndex(u => u.UserName)
                .IsUnique();

            // Organization indexes
            modelBuilder.Entity<Organization>()
                .HasIndex(o => o.Name);
            
            modelBuilder.Entity<Organization>()
                .HasIndex(o => o.OrganizationTypeId);
            
            modelBuilder.Entity<Organization>()
                .HasIndex(o => o.IsPublic);

            // OrganizationType indexes
            modelBuilder.Entity<OrganizationType>()
                .HasIndex(ot => ot.Name)
                .IsUnique();

            // Location indexes
            modelBuilder.Entity<Location>()
                .HasIndex(l => l.City);
            
            modelBuilder.Entity<Location>()
                .HasIndex(l => new { l.Latitude, l.Longitude });

            // Log indexes
            modelBuilder.Entity<Log>()
                .HasIndex(l => l.UserId);
            
            modelBuilder.Entity<Log>()
                .HasIndex(l => l.Action);
            
            modelBuilder.Entity<Log>()
                .HasIndex(l => l.CreatedAt);

            // Report indexes
            modelBuilder.Entity<Report>()
                .HasIndex(r => r.Type);
            
            modelBuilder.Entity<Report>()
                .HasIndex(r => r.CreatedByUserId);
        }
    }
}