using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace NovusCap.Domain.Entities
{
    public class Role : IdentityRole<Guid>
    {
        [MaxLength(256)]
        public string Description { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}