import api from './api';

const organizationService = {
    // Get paginated organizations with filters
    getOrganizations: async (params = {}) => {
        try {
            const response = await api.get('/api/organizations', { params });
            // Backend returns PagedResult, so we need to return the items array
            return response.data.items || [];
        } catch (error) {
            throw error;
        }
    },

    // Get organization by ID
    getOrganizationById: async (id) => {
        try {
            const response = await api.get(`/api/organizations/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Search organizations
    searchOrganizations: async (searchParams) => {
        try {
            const response = await api.get('/api/organizations/search', { params: searchParams });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get nearby organizations
    getNearbyOrganizations: async (latitude, longitude, radiusKm = 10, pageNumber = 1, pageSize = 10) => {
        try {
            const response = await api.get('/api/organizations/nearby', {
                params: { latitude, longitude, radiusKm, pageNumber, pageSize }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get organizations by type
    getOrganizationsByType: async (typeId, pageNumber = 1, pageSize = 10) => {
        try {
            const response = await api.get(`/api/organizations/by-type/${typeId}`, {
                params: { pageNumber, pageSize }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get organizations by location
    getOrganizationsByLocation: async (locationId, pageNumber = 1, pageSize = 10) => {
        try {
            const response = await api.get(`/api/organizations/by-location/${locationId}`, {
                params: { pageNumber, pageSize }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create organization
    createOrganization: async (organizationData) => {
        try {
            const response = await api.post('/api/organizations', organizationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update organization
    updateOrganization: async (id, organizationData) => {
        try {
            const response = await api.put(`/api/organizations/${id}`, organizationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete organization
    deleteOrganization: async (id) => {
        try {
            const response = await api.delete(`/api/organizations/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Approve organization (Admin only)
    approveOrganization: async (id) => {
        try {
            const response = await api.post(`/api/organizations/${id}/approve`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Reject organization (Admin only)
    rejectOrganization: async (id) => {
        try {
            const response = await api.post(`/api/organizations/${id}/reject`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Alias functions
    getAll: async () => {
        // getOrganizations fonksiyonunu kullanarak tüm organizasyonları getir
        return organizationService.getOrganizations();
    },
    create: async (organizationData) => {
        // createOrganization fonksiyonunu kullan
        return organizationService.createOrganization(organizationData);
    }
};

export default organizationService;