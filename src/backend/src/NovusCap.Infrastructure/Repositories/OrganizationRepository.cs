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
    public class OrganizationRepository : Repository<Organization>
    {
        public OrganizationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Organization?> GetByIdWithDetailsAsync(Guid id)
        {
            return await _context.Organizations
                .Include(o => o.OrganizationDetail)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Organization>> GetAllWithDetailsAsync()
        {
            return await _context.Organizations
                .Include(o => o.OrganizationDetail)
                .ToListAsync();
        }
    }
}