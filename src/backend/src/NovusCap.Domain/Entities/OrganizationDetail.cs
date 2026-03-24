using System.ComponentModel.DataAnnotations;

namespace NovusCap.Domain.Entities
{
    public class OrganizationDetail : BaseEntity
    {
        public Guid OrganizationId { get; set; }
        
        [MaxLength(500)]
        public string Address { get; set; } = string.Empty;
        
        [MaxLength(20)]
        public string Phone { get; set; } = string.Empty;
        
        [MaxLength(256)]
        public string Email { get; set; } = string.Empty;
        
        public string ContentHtml { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string ContactPerson { get; set; } = string.Empty;
        
        public Guid? LocationId { get; set; }
        
        // Navigation Properties
        public virtual Organization Organization { get; set; } = null!;
        public virtual Location? Location { get; set; }
    }
}