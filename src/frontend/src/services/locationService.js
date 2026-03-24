import api from './api';

const locationService = {    // Get all locations
    getLocations: async (params = {}) => {
        try {
            const response = await api.get('/api/locations', { params });
            // Backend returns PagedResult, so we need to return the items array
            return response.data.items || [];
        } catch (error) {
            throw error;
        }
    },

    // Get location by ID
    getLocationById: async (id) => {
        try {
            const response = await api.get(`/api/locations/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Search locations by name
    searchLocations: async (name) => {
        try {
            const response = await api.get('/api/locations/search', {
                params: { name }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get nearby locations
    getNearbyLocations: async (latitude, longitude, radiusKm = 50) => {
        try {
            const response = await api.get('/api/locations/nearby', {
                params: { latitude, longitude, radiusKm }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get locations within boundary
    getLocationsWithinBoundary: async (northEast, southWest) => {
        try {
            const response = await api.get('/api/locations/boundary', {
                params: {
                    'northEast.latitude': northEast.latitude,
                    'northEast.longitude': northEast.longitude,
                    'southWest.latitude': southWest.latitude,
                    'southWest.longitude': southWest.longitude
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create location (Admin only)
    createLocation: async (locationData) => {
        try {
            const response = await api.post('/api/locations', locationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update location (Admin only)
    updateLocation: async (id, locationData) => {
        try {
            const response = await api.put(`/api/locations/${id}`, locationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete location (Admin only)
    deleteLocation: async (id) => {
        try {
            const response = await api.delete(`/api/locations/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default locationService;
