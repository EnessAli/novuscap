namespace NovusCap.Application.DTOs
{
    public class OrganizationDetailDto
    {
        public Guid Id { get; set; }
        public Guid OrganizationId { get; set; }
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ContentHtml { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public LocationDto? Location { get; set; }
    }
}
