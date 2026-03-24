using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace NovusCap.WebApi.Middlewares
{
    public class SecurityHeadersMiddleware
    {
        private readonly RequestDelegate _next;

        public SecurityHeadersMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Security Headers
            context.Response.Headers.Add("X-Frame-Options", "DENY");
            context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
            context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
            context.Response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin");
            context.Response.Headers.Add("Content-Security-Policy", 
                "default-src 'self'; " +
                "script-src 'self' 'unsafe-inline' https://maps.googleapis.com; " +
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                "font-src 'self' https://fonts.gstatic.com; " +
                "connect-src 'self' https://maps.googleapis.com; " +
                "img-src 'self' data: https:;");

            // Remove Server header
            context.Response.Headers.Remove("Server");

            await _next(context);
        }
    }

    public class RateLimitingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Dictionary<string, DateTime> _requestHistory = new();
        private readonly Dictionary<string, int> _requestCounts = new();
        private readonly int _requestLimit = 100; // requests per minute
        private readonly TimeSpan _timeWindow = TimeSpan.FromMinutes(1);

        public RateLimitingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var clientIp = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var now = DateTime.UtcNow;

            // Clean old entries
            CleanOldEntries(now);

            // Check rate limit
            if (IsRateLimited(clientIp, now))
            {
                context.Response.StatusCode = 429; // Too Many Requests
                await context.Response.WriteAsync("Rate limit exceeded. Please try again later.");
                return;
            }

            await _next(context);
        }

        private void CleanOldEntries(DateTime now)
        {
            var expiredKeys = _requestHistory
                .Where(kvp => now - kvp.Value > _timeWindow)
                .Select(kvp => kvp.Key)
                .ToList();

            foreach (var key in expiredKeys)
            {
                _requestHistory.Remove(key);
                _requestCounts.Remove(key);
            }
        }

        private bool IsRateLimited(string clientIp, DateTime now)
        {
            if (!_requestHistory.ContainsKey(clientIp))
            {
                _requestHistory[clientIp] = now;
                _requestCounts[clientIp] = 1;
                return false;
            }

            if (now - _requestHistory[clientIp] > _timeWindow)
            {
                _requestHistory[clientIp] = now;
                _requestCounts[clientIp] = 1;
                return false;
            }

            _requestCounts[clientIp]++;
            return _requestCounts[clientIp] > _requestLimit;
        }
    }

    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var startTime = DateTime.UtcNow;
            var requestId = Guid.NewGuid().ToString();

            // Log request start
            _logger.LogInformation(
                "Request {RequestId} started: {Method} {Path} from {ClientIP}",
                requestId,
                context.Request.Method,
                context.Request.Path,
                context.Connection.RemoteIpAddress);

            try
            {
                await _next(context);
            }
            finally
            {
                var duration = DateTime.UtcNow - startTime;
                
                // Log request completion
                _logger.LogInformation(
                    "Request {RequestId} completed: {StatusCode} in {Duration}ms",
                    requestId,
                    context.Response.StatusCode,
                    duration.TotalMilliseconds);
            }
        }
    }
}
