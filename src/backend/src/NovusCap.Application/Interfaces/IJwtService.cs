// This interface has been moved to NovusCap.Domain.Interfaces.IJwtService
// This file exists only for backward compatibility
using NovusCap.Domain.Interfaces;

namespace NovusCap.Application.Interfaces
{
    public interface IJwtService : NovusCap.Domain.Interfaces.IJwtService
    {
        // Implementation is delegated to the Domain interface
    }
}
