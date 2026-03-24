using System.ComponentModel.DataAnnotations;

namespace NovusCap.Domain.Entities
{
    public class Report : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;
        
        public string Data { get; set; } = string.Empty; // JSON format
        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        public Guid CreatedByUserId { get; set; }
        
        // Navigation Properties
        public virtual User CreatedByUser { get; set; } = null!;
    }
}