using System.ComponentModel.DataAnnotations;

namespace NovusCap.Application.DTOs.Auth
{
    public class ValidateTokenDto
    {
        [Required]
        public string Token { get; set; } = string.Empty;
    }
}
