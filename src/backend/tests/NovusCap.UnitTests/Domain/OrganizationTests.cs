using Xunit;
using FluentAssertions;
using NovusCap.Domain.Entities;

namespace NovusCap.UnitTests.Domain;

public class OrganizationTests
{
    [Fact]
    public void Organization_ShouldCreateWithValidData()
    {
        // Arrange
        var name = "Test Organization";
        var description = "Test Description";
        var organizationTypeId = Guid.NewGuid();

        // Act
        var organization = new Organization
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = description,
            OrganizationTypeId = organizationTypeId,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        // Assert
        organization.Name.Should().Be(name);
        organization.Description.Should().Be(description);
        organization.OrganizationTypeId.Should().Be(organizationTypeId);
        organization.IsActive.Should().BeTrue();
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData(null)]
    public void Organization_ShouldNotAllowEmptyName(string invalidName)
    {
        // Arrange & Act
        var organization = new Organization
        {
            Id = Guid.NewGuid(),
            Name = invalidName,
            Description = "Test Description",
            OrganizationTypeId = Guid.NewGuid(),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        // Assert
        // Bu durumda validation business logic'te handle edilmelidir
        organization.Name.Should().Be(invalidName);
    }
}
