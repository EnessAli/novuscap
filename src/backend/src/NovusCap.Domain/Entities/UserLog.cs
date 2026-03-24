using System.ComponentModel.DataAnnotations;

namespace NovusCap.Domain.Entities
{
    public class UserLog : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Action { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? Description { get; set; }
        
        [MaxLength(45)]
        public string? IpAddress { get; set; }
        
        [MaxLength(500)]
        public string? UserAgent { get; set; }
        
        // Foreign Keys
        public Guid UserId { get; set; }
        
        // Navigation Properties
        public virtual User User { get; set; } = null!;
    }
}
