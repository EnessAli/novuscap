import api from './api';

const organizationTypeService = {
    // Get all organization types
    getOrganizationTypes: async (params = {}) => {
        try {
            const response = await api.get('/api/organization-types', { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get organization type by ID
    getOrganizationTypeById: async (id) => {
        try {
            const response = await api.get(`/api/organization-types/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create organization type (Admin only)
    createOrganizationType: async (typeData) => {
        try {
            const response = await api.post('/api/organization-types', typeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update organization type (Admin only)
    updateOrganizationType: async (id, typeData) => {
        try {
            const response = await api.put(`/api/organization-types/${id}`, typeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete organization type (Admin only)
    deleteOrganizationType: async (id) => {
        try {
            const response = await api.delete(`/api/organization-types/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default organizationTypeService;
