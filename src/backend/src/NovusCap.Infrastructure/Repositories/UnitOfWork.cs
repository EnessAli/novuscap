using Microsoft.EntityFrameworkCore.Storage;
using NovusCap.Domain.Entities;
using NovusCap.Domain.Interfaces;
using NovusCap.Infrastructure.Data;

namespace NovusCap.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IDbContextTransaction? _transaction;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        private IRepository<User>? _users;
        public IRepository<User> Users => _users ??= new Repository<User>(_context);

        private IRepository<Role>? _roles;
        public IRepository<Role> Roles => _roles ??= new Repository<Role>(_context);

        private IRepository<Organization>? _organizations;
        public IRepository<Organization> Organizations => _organizations ??= new Repository<Organization>(_context);

        private IRepository<OrganizationDetail>? _organizationDetails;
        public IRepository<OrganizationDetail> OrganizationDetails => _organizationDetails ??= new Repository<OrganizationDetail>(_context);

        private IRepository<OrganizationType>? _organizationTypes;
        public IRepository<OrganizationType> OrganizationTypes => _organizationTypes ??= new Repository<OrganizationType>(_context);

        private IRepository<Location>? _locations;
        public IRepository<Location> Locations => _locations ??= new Repository<Location>(_context);

        private IRepository<Log>? _logs;
        public IRepository<Log> Logs => _logs ??= new Repository<Log>(_context);

        private IRepository<Report>? _reports;
        public IRepository<Report> Reports => _reports ??= new Repository<Report>(_context);

        private IRepository<UserLog>? _userLogs;
        public IRepository<UserLog> UserLogs => _userLogs ??= new Repository<UserLog>(_context);

        private IRepository<Suggestion>? _suggestions;
        public IRepository<Suggestion> Suggestions => _suggestions ??= new Repository<Suggestion>(_context);

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async Task RollbackTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public void Dispose()
        {
            _transaction?.Dispose();
            _context.Dispose();
        }
    }
}
