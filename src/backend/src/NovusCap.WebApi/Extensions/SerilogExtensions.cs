using Serilog;
using Serilog.Events;

namespace NovusCap.WebApi.Extensions
{
    public static class SerilogExtensions
    {
        public static void ConfigureSerilog(this WebApplicationBuilder builder)
        {
            var logLevel = builder.Environment.IsProduction() 
                ? LogEventLevel.Warning 
                : LogEventLevel.Information;

            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Is(logLevel)
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Error)
                .Enrich.FromLogContext()
                .Enrich.WithProperty("Application", "NovusCap")
                .Enrich.WithProperty("Environment", builder.Environment.EnvironmentName)
                .WriteTo.Console(
                    outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} <s:{SourceContext}>{NewLine}{Exception}")
                .WriteTo.File(
                    path: "logs/novuscap-.log",
                    rollingInterval: RollingInterval.Day,
                    retainedFileCountLimit: 30,
                    fileSizeLimitBytes: 10_000_000,
                    rollOnFileSizeLimit: true,
                    outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} {Level:u3}] {Message:lj} <s:{SourceContext}> <id:{CorrelationId}>{NewLine}{Exception}")
                .CreateLogger();

            builder.Host.UseSerilog();
        }        public static void AddStructuredLogging(this IServiceCollection services)
        {
            services.AddScoped<Microsoft.Extensions.Logging.ILogger>(provider => 
                provider.GetRequiredService<Microsoft.Extensions.Logging.ILogger<Program>>());
        }
    }
}
