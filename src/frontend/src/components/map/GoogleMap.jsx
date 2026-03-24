import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle, Autocomplete } from '@react-google-maps/api';
import { useMap } from '../../contexts/MapContext';
import { locationService } from '../../services/locationService';

const ISTANBUL_CENTER = { lat: 41.0082, lng: 28.9784 };

const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: true,
  fullscreenControl: true,
  gestureHandling: 'cooperative',
  mapTypeId: 'roadmap'
};

// Google Maps için gerekli kütüphaneler component dışında tanımlandı
const GOOGLE_MAP_LIBRARIES = ['places', 'geometry'];

const GoogleMapComponent = ({ organizations = [], selectedOrganization, onMarkerClick, onLocationSelect }) => {
  // Eğer organizations bir nesne ise, items dizisini kullan
  const orgs = Array.isArray(organizations) ? organizations : (organizations.items ?? []);

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { filters, searchRadius, setUserLocation: setContextUserLocation } = useMap();
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
    mapRef.current = mapInstance;
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
    mapRef.current = null;
  }, []);

  // Get user's current location
  const getCurrentLocation = useCallback(() => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          setContextUserLocation(userPos);
          if (map) {
            map.panTo(userPos);
            map.setZoom(15);
          }
          setIsLoading(false);
        },
        (error) => {
          console.error('Konum alınamadı:', error);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      console.error('Geolocation desteklenmiyor');
      setIsLoading(false);
    }
  }, [map, setContextUserLocation]);

  // Calculate distance between two points
  const calculateDistance = useCallback((lat1, lng1, lat2, lng2) => {
    if (window.google && window.google.maps && window.google.maps.geometry) {
      const point1 = new window.google.maps.LatLng(lat1, lng1);
      const point2 = new window.google.maps.LatLng(lat2, lng2);
      return window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000; // km
    }
    // Fallback Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  // Filter organizations based on current filters and location
  const filteredOrganizations = orgs.filter(org => {
    if (filters.organizationType && org.organizationType !== filters.organizationType) {
      return false;
    }
    if (filters.city && org.address?.city !== filters.city) {
      return false;
    }
    if (searchRadius && userLocation) {
      const distance = calculateDistance(
        userLocation.lat, userLocation.lng,
        org.latitude, org.longitude
      );
      if (distance > searchRadius) {
        return false;
      }
    }
    return true;
  });

  // Handle marker click
  const handleMarkerClick = useCallback((organization) => {
    setSelectedMarker(organization);
    if (onMarkerClick) {
      onMarkerClick(organization);
    }
  }, [onMarkerClick]);

  // Handle search box places changed
  const onPlacesChanged = useCallback(() => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setUserLocation(location);
        setContextUserLocation(location);
        if (map) {
          map.panTo(location);
          map.setZoom(15);
        }
        if (onLocationSelect) {
          onLocationSelect(location, place);
        }
      }
    }
  }, [searchBox, map, setContextUserLocation, onLocationSelect]);

  // Get marker icon based on organization type
  const getMarkerIcon = useCallback((orgType) => {
    const iconMap = {
      'NGO': { color: '#10B981', symbol: 'N' },
      'Company': { color: '#3B82F6', symbol: 'C' },
      'Government': { color: '#F59E0B', symbol: 'G' },
      'Educational': { color: '#8B5CF6', symbol: 'E' }
    };
    
    const config = iconMap[orgType] || iconMap['Company'];
    
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: config.color,
      fillOpacity: 0.8,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: 10,
      labelOrigin: new window.google.maps.Point(0, 0)
    };
  }, []);

  // Center map on selected organization
  useEffect(() => {
    if (selectedOrganization && map) {
      const location = {
        lat: selectedOrganization.latitude,
        lng: selectedOrganization.longitude
      };
      map.panTo(location);
      map.setZoom(15);
      setSelectedMarker(selectedOrganization);
    }
  }, [selectedOrganization, map]);

  return (
    <LoadScript 
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_MAP_LIBRARIES}
      loadingElement={<div className="flex justify-center items-center h-64">Harita yükleniyor...</div>}
    >
      <div className="relative">
        {/* Search and controls */}
        <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3 space-y-2">
          <Autocomplete
            onLoad={setSearchBox}
            onPlaceChanged={onPlacesChanged}
            options={{
              types: ['geocode'],
              componentRestrictions: { country: 'tr' }
            }}
          >
            <input
              ref={searchBoxRef}
              type="text"
              placeholder="Adres ara..."
              className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Autocomplete>
          
          <button
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Konum Alınıyor...' : 'Konumumu Bul'}
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || ISTANBUL_CENTER}
          zoom={userLocation ? 15 : 11}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {/* User location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3,
                scale: 8,
              }}
              title="Konumunuz"
            />
          )}

          {/* Search radius circle */}
          {searchRadius && userLocation && (
            <Circle
              center={userLocation}
              radius={searchRadius * 1000}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.15,
              }}
            />
          )}

          {/* Organization markers */}
          {filteredOrganizations.map((org) => {
            const distance = userLocation ? 
              calculateDistance(userLocation.lat, userLocation.lng, org.latitude, org.longitude) : 
              null;

            return (
              <Marker
                key={org.id}
                position={{
                  lat: org.latitude,
                  lng: org.longitude
                }}
                onClick={() => handleMarkerClick(org)}
                icon={getMarkerIcon(org.organizationType)}
                label={{
                  text: org.organizationType.charAt(0),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}
                title={`${org.name} ${distance ? `(${distance.toFixed(1)} km)` : ''}`}
              />
            );
          })}

          {/* Info window for selected marker */}
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-4 max-w-sm">
                <h3 className="font-bold text-lg mb-2">{selectedMarker.name}</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                  {selectedMarker.organizationType}
                </span>
                <p className="text-sm mb-2 text-gray-700">{selectedMarker.description}</p>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="flex items-center">
                    <span className="font-medium">Adres:</span> {selectedMarker.address?.street}
                  </p>
                  <p>{selectedMarker.address?.city}, {selectedMarker.address?.country}</p>
                  {selectedMarker.phone && (
                    <p className="flex items-center">
                      <span className="font-medium">Tel:</span> 
                      <a href={`tel:${selectedMarker.phone}`} className="ml-1 text-blue-600 hover:underline">
                        {selectedMarker.phone}
                      </a>
                    </p>
                  )}
                  {selectedMarker.email && (
                    <p className="flex items-center">
                      <span className="font-medium">Email:</span>
                      <a href={`mailto:${selectedMarker.email}`} className="ml-1 text-blue-600 hover:underline">
                        {selectedMarker.email}
                      </a>
                    </p>
                  )}
                  {selectedMarker.website && (
                    <p>
                      <a 
                        href={selectedMarker.website.startsWith('http') ? selectedMarker.website : `https://${selectedMarker.website}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Website'yi Ziyaret Et
                      </a>
                    </p>
                  )}
                  {userLocation && (
                    <p className="text-green-600 font-medium">
                      Uzaklık: {calculateDistance(
                        userLocation.lat, userLocation.lng,
                        selectedMarker.latitude, selectedMarker.longitude
                      ).toFixed(1)} km
                    </p>
                  )}
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.latitude},${selectedMarker.longitude}`,
                      '_blank'
                    )}
                    className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex-1"
                  >
                    Yol Tarifi
                  </button>
                  <button
                    onClick={() => {
                      const coords = `${selectedMarker.latitude},${selectedMarker.longitude}`;
                      navigator.clipboard.writeText(coords);
                      alert('Koordinatlar kopyalandı!');
                    }}
                    className="bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700"
                  >
                    Koordinat
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;
