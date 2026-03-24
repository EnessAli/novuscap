using System.ComponentModel.DataAnnotations;

namespace NovusCap.Domain.Entities
{
    public class Location : BaseEntity
    {
        [Required]
        [MaxLength(50)]
        public string City { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        public string District { get; set; } = string.Empty;
        
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(250)]
        public string? Address { get; set; }
        
        // Navigation Properties
        public virtual ICollection<OrganizationDetail> OrganizationDetails { get; set; } = new List<OrganizationDetail>();
    }
}