using NovusCap.Domain.Entities;

namespace NovusCap.Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User> Users { get; }
        IRepository<Role> Roles { get; }
        IRepository<Organization> Organizations { get; }
        IRepository<OrganizationDetail> OrganizationDetails { get; }
        IRepository<OrganizationType> OrganizationTypes { get; }
        IRepository<Location> Locations { get; }
        IRepository<Log> Logs { get; }
        IRepository<Report> Reports { get; }
        IRepository<UserLog> UserLogs { get; }
        IRepository<Suggestion> Suggestions { get; }

        Task<int> SaveChangesAsync();
        void SaveChanges();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
    }
}