# Backend Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5002
ENV ASPNETCORE_URLS=http://+:5002

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["src/NovusCap.WebApi/NovusCap.WebApi.csproj", "src/NovusCap.WebApi/"]
COPY ["src/NovusCap.Application/NovusCap.Application.csproj", "src/NovusCap.Application/"]
COPY ["src/NovusCap.Infrastructure/NovusCap.Infrastructure.csproj", "src/NovusCap.Infrastructure/"]
COPY ["src/NovusCap.Domain/NovusCap.Domain.csproj", "src/NovusCap.Domain/"]

RUN dotnet restore "src/NovusCap.WebApi/NovusCap.WebApi.csproj"

# Copy source code
COPY . .

# Build the application
WORKDIR "/src/src/NovusCap.WebApi"
RUN dotnet build "NovusCap.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NovusCap.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

ENTRYPOINT ["dotnet", "NovusCap.WebApi.dll"]
