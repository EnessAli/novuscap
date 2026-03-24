namespace NovusCap.Application.DTOs
{
    public class LocationDto
    {
        public Guid Id { get; set; }
        public string City { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Address { get; set; }
    }
}
