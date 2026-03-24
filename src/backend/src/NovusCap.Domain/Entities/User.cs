using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace NovusCap.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public DateTime? LastLoginDate { get; set; }
        
        public bool IsActive => !IsDeleted;
        public string Username => UserName;
        
        // Navigation Properties
        public virtual ICollection<Organization> Organizations { get; set; } = new List<Organization>();
        public virtual ICollection<UserLog> UserLogs { get; set; } = new List<UserLog>();
        public virtual ICollection<Suggestion> Suggestions { get; set; } = new List<Suggestion>();
        public virtual ICollection<Log> Logs { get; set; } = new List<Log>();
        public virtual ICollection<Report> Reports { get; set; } = new List<Report>();
    }
}