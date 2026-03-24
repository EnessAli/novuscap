import organizationService from './organizationService';
import locationService from './locationService';

// Google Maps utilities
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const mapService = {
    // Load Google Maps script
    loadGoogleMapsScript: () => {
        return new Promise((resolve, reject) => {
            if (window.google && window.google.maps) {
                resolve(window.google.maps);
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve(window.google.maps);
            script.onerror = () => reject(new Error('Google Maps script yüklenemedi'));
            document.head.appendChild(script);
        });
    },

    // Get organizations for map display
    getOrganizationsForMap: async (filters = {}) => {
        try {
            const response = await organizationService.getOrganizations(filters);
            return response.data || response;
        } catch (error) {
            throw new Error('Harita için organizasyonlar alınırken bir hata oluştu: ' + error.message);
        }
    },

    // Get nearby organizations
    getNearbyOrganizations: async (latitude, longitude, radiusKm = 10) => {
        try {
            const response = await organizationService.getNearbyOrganizations(latitude, longitude, radiusKm);
            return response.data || response;
        } catch (error) {
            throw new Error('Yakındaki organizasyonlar alınırken bir hata oluştu: ' + error.message);
        }
    },

    // Get organization details for marker popup
    getOrganizationDetails: async (id) => {
        try {
            const response = await organizationService.getOrganizationById(id);
            return response;
        } catch (error) {
            throw new Error('Organizasyon detayları alınırken bir hata oluştu: ' + error.message);
        }
    },

    // Create new organization marker
    createOrganizationMarker: async (organizationData) => {
        try {
            const response = await organizationService.createOrganization(organizationData);
            return response;
        } catch (error) {
            throw new Error('Organizasyon oluşturulurken bir hata oluştu: ' + error.message);
        }
    },

    // Update organization marker
    updateOrganizationMarker: async (id, organizationData) => {
        try {
            const response = await organizationService.updateOrganization(id, organizationData);
            return response;
        } catch (error) {
            throw new Error('Organizasyon güncellenirken bir hata oluştu: ' + error.message);
        }
    },

    // Delete organization marker
    deleteOrganizationMarker: async (id) => {
        try {
            await organizationService.deleteOrganization(id);
        } catch (error) {
            throw new Error('Organizasyon silinirken bir hata oluştu: ' + error.message);
        }
    },

    // Get locations for map
    getLocationsForMap: async () => {
        try {
            const response = await locationService.getLocations();
            return response.data || response;
        } catch (error) {
            throw new Error('Konumlar alınırken bir hata oluştu: ' + error.message);
        }
    },

    // Search locations
    searchLocations: async (query) => {
        try {
            const response = await locationService.searchLocations(query);
            return response.data || response;
        } catch (error) {
            throw new Error('Konum araması yapılırken bir hata oluştu: ' + error.message);
        }
    },

    // Get user's current location
    getCurrentLocation: () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation desteklenmiyor'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    reject(new Error('Konum alınamadı: ' + error.message));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }
            );
        });
    },

    // Default map center (Turkey)
    getDefaultCenter: () => {
        return {
            latitude: 39.925533,
            longitude: 32.866287
        };
    },

    // Calculate distance between two points
    calculateDistance: (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
};

export default mapService;