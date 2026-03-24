using System.ComponentModel.DataAnnotations;

namespace NovusCap.Domain.Entities
{
    public class OrganizationType : BaseEntity
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(256)]
        public string Description { get; set; } = string.Empty;
        
        [MaxLength(20)]
        public string Color { get; set; } = string.Empty;
        
        [MaxLength(256)]
        public string Icon { get; set; } = string.Empty;
        
        // Navigation Properties
        public virtual ICollection<Organization> Organizations { get; set; } = new List<Organization>();
    }
}