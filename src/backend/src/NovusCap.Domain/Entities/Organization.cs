using System;
using System.ComponentModel.DataAnnotations;

namespace NovusCap.Domain.Entities
{
    public class Organization : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;
        
        [MaxLength(256)]
        public string LogoUrl { get; set; } = string.Empty;
        
        [MaxLength(256)]
        public string WebsiteUrl { get; set; } = string.Empty;
        
        public Guid OrganizationTypeId { get; set; }
        public Guid CreatedByUserId { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsPublic { get; set; } = true;
        
        // Navigation Properties
        public virtual OrganizationType OrganizationType { get; set; } = null!;
        public virtual User CreatedByUser { get; set; } = null!;
        public virtual OrganizationDetail? OrganizationDetail { get; set; }
    }
}