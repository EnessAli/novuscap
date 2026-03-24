using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NovusCap.Domain.Entities;
using NovusCap.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using NovusCap.Infrastructure.Data;

namespace NovusCap.Infrastructure.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<IEnumerable<User>> GetActiveUsersAsync()
        {
            return await _context.Users
                .Where(u => u.IsActive)
                .ToListAsync();
        }
    }
}