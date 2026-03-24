using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using NovusCap.Infrastructure.Data;
using NovusCap.Domain.Entities;
using System.Net.Http.Json;
using FluentAssertions;
using Xunit;

namespace NovusCap.IntegrationTests.Controllers;

public class OrganizationsControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public OrganizationsControllerTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetOrganizations_ShouldReturnOkResult()
    {
        // Arrange
        // Test verisi zaten seed edilmiş olmalı

        // Act
        var response = await _client.GetAsync("/api/organizations");

        // Assert
        response.Should().NotBeNull();
        response.IsSuccessStatusCode.Should().BeTrue();
    }

    [Fact]
    public async Task GetOrganizations_ShouldReturnJsonContent()
    {
        // Act
        var response = await _client.GetAsync("/api/organizations");
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.IsSuccessStatusCode.Should().BeTrue();
        content.Should().NotBeNullOrEmpty();
        response.Content.Headers.ContentType?.MediaType.Should().Be("application/json");
    }

    [Fact]
    public async Task HealthCheck_ShouldReturnOk()
    {
        // Act
        var response = await _client.GetAsync("/health");

        // Assert
        response.IsSuccessStatusCode.Should().BeTrue();
    }
}
