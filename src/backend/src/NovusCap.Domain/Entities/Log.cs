using System.ComponentModel.DataAnnotations;

namespace NovusCap.Domain.Entities
{
    public class Log : BaseEntity
    {
        public Guid UserId { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Action { get; set; } = string.Empty;
        
        [MaxLength(36)]
        public string EntityId { get; set; } = string.Empty;
        
        [MaxLength(50)]
        public string EntityType { get; set; } = string.Empty;
        
        public string OldValues { get; set; } = string.Empty; // JSON format
        public string NewValues { get; set; } = string.Empty; // JSON format
        
        [MaxLength(50)]
        public string IP { get; set; } = string.Empty;
        
        public string UserAgent { get; set; } = string.Empty;
        
        // Navigation Properties
        public virtual User User { get; set; } = null!;
    }
}