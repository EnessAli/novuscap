using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using NovusCap.Application.Common.Models;
using NovusCap.Application.DTOs;
using NovusCap.Application.Interfaces;
using NovusCap.Domain.Entities;
using NovusCap.Domain.Interfaces;

namespace NovusCap.Application.Services
{
    public class LocationService : ILocationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public LocationService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<LocationDto> CreateLocationAsync(LocationDto locationDto)
        {
            var location = _mapper.Map<Location>(locationDto);
            location.Id = Guid.NewGuid();
            // CreatedAt otomatik olarak BaseEntity'de ayarlanıyor

            await _unitOfWork.Locations.AddAsync(location);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<LocationDto>(location);
        }

        public async Task<LocationDto?> GetLocationByIdAsync(Guid id)
        {
            var location = await _unitOfWork.Locations.GetByIdAsync(id);
            if (location == null)
            {
                return null;
            }

            return _mapper.Map<LocationDto>(location);
        }

        public async Task<List<LocationDto>> GetAllLocationsAsync()
        {
            var locations = await _unitOfWork.Locations.GetAllAsync();
            return _mapper.Map<List<LocationDto>>(locations);
        }

        public async Task<LocationDto> UpdateLocationAsync(Guid id, LocationDto locationDto)
        {
            var location = await _unitOfWork.Locations.GetByIdAsync(id);
            if (location == null)
            {
                throw new ArgumentException("Location not found.");
            }

            _mapper.Map(locationDto, location);
            location.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.Locations.UpdateAsync(location);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<LocationDto>(location);
        }

        public async Task<bool> DeleteLocationAsync(Guid id)
        {
            var location = await _unitOfWork.Locations.GetByIdAsync(id);
            if (location == null)
            {
                return false;
            }

            await _unitOfWork.Locations.DeleteAsync(location);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> LocationExistsAsync(Guid id)
        {
            var location = await _unitOfWork.Locations.GetByIdAsync(id);
            return location != null;
        }

        public async Task<List<LocationDto>> GetLocationsByBoundsAsync(decimal northLat, decimal southLat, decimal eastLng, decimal westLng)
        {
            var locations = await _unitOfWork.Locations.FindAsync(l =>
                l.Latitude >= southLat && l.Latitude <= northLat &&
                l.Longitude >= westLng && l.Longitude <= eastLng);

            return _mapper.Map<List<LocationDto>>(locations);
        }

        public async Task<List<LocationDto>> GetNearbyLocationsAsync(decimal latitude, decimal longitude, double radiusKm)
        {
            // Calculate approximate degree differences for the given radius
            var latDiff = (decimal)(radiusKm / 111.0); // Approximately 111 km per degree of latitude
            var lonDiff = (decimal)(radiusKm / (111.0 * Math.Cos((double)latitude * Math.PI / 180.0)));

            var locations = await _unitOfWork.Locations.FindAsync(l =>
                Math.Abs(l.Latitude - latitude) <= latDiff &&
                Math.Abs(l.Longitude - longitude) <= lonDiff);

            return _mapper.Map<List<LocationDto>>(locations);
        }

        public async Task<List<LocationDto>> GetLocationsByCityAsync(string city)
        {
            var locations = await _unitOfWork.Locations.FindAsync(l => l.City.ToLower() == city.ToLower());
            return _mapper.Map<List<LocationDto>>(locations);
        }

        // Note: Since Location entity doesn't have a Country property, we'll use City as the filter
        public async Task<List<LocationDto>> GetLocationsByCountryAsync(string city)
        {
            var locations = await _unitOfWork.Locations.FindAsync(l => l.City.ToLower() == city.ToLower());
            return _mapper.Map<List<LocationDto>>(locations);
        }

        public async Task<List<string>> GetAllCitiesAsync()
        {
            var locations = await _unitOfWork.Locations.GetAllAsync();
            return locations.Select(l => l.City).Distinct().OrderBy(c => c).ToList();
        }

        // Note: Since Location entity doesn't have a Country property, we'll return distinct cities instead
        public async Task<List<string>> GetDistinctCitiesAsync()
        {
            var locations = await _unitOfWork.Locations.GetAllAsync();
            return locations.Select(l => l.City).Distinct().OrderBy(c => c).ToList();
        }
        
        public async Task<List<string>> GetDistrictsByCityAsync(string city)
        {
            var locations = await _unitOfWork.Locations.FindAsync(l => l.City.ToLower() == city.ToLower());
            return locations.Select(l => l.District).Where(d => !string.IsNullOrEmpty(d)).Distinct().OrderBy(d => d).ToList();
        }

        public async Task<List<LocationDto>> SearchLocationsAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                throw new ArgumentException("Search term cannot be empty.");
            }

            var locations = await _unitOfWork.Locations.FindAsync(
                l => l.Name.Contains(searchTerm) || 
                    l.City.Contains(searchTerm) || 
                    (l.District != null && l.District.Contains(searchTerm)) || 
                    (l.Address != null && l.Address.Contains(searchTerm)));

            return _mapper.Map<List<LocationDto>>(locations);
        }

        public async Task<PagedResult<LocationDto>> GetLocationsAsync(int page = 1, int pageSize = 10)
        {
            var locations = await _unitOfWork.Locations.GetPagedAsync(
                page, pageSize,
                filter: null,
                orderBy: q => q.OrderBy(l => l.Name));

            var locationDtos = _mapper.Map<List<LocationDto>>(locations.Items);

            return new PagedResult<LocationDto>
            {
                Items = locationDtos,
                TotalCount = locations.TotalCount,
                Page = page,
                PageSize = pageSize
            };
        }
    }
}
