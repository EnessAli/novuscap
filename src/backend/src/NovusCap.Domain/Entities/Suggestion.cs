using System.ComponentModel.DataAnnotations;

namespace NovusCap.Domain.Entities
{
    public class Suggestion : BaseEntity
    {
        [Required]
        [MaxLength(200)]
        public string Subject { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(1000)]
        public string Message { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? Email { get; set; }
        
        [MaxLength(100)]
        public string? Name { get; set; }
        
        public bool IsProcessed { get; set; } = false;
        
        [MaxLength(500)]
        public string? AdminResponse { get; set; }
        
        public DateTime? ProcessedAt { get; set; }
        
        // Foreign Keys
        public Guid? UserId { get; set; }
        public Guid? ProcessedByUserId { get; set; }
        
        // Navigation Properties
        public virtual User? User { get; set; }
        public virtual User? ProcessedByUser { get; set; }
    }
}
