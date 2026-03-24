import api from './api';

const userService = {    // Get paginated users (Admin only)
    getUsers: async (params = {}) => {
        try {
            const response = await api.get('/api/users', { params });
            // Backend returns PagedResult, so we need to return the items array
            return response.data.items || [];
        } catch (error) {
            throw error;
        }
    },

    // Get user by ID
    getUserById: async (id) => {
        try {
            const response = await api.get(`/api/users/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get current user profile
    getCurrentUserProfile: async () => {
        try {
            const response = await api.get('/api/users/profile');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user profile
    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/api/users/profile', profileData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user (Admin only)
    updateUser: async (id, userData) => {
        try {
            const response = await api.put(`/api/users/${id}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Activate user (Admin only)
    activateUser: async (id) => {
        try {
            const response = await api.post(`/api/users/${id}/activate`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Deactivate user (Admin only)
    deactivateUser: async (id) => {
        try {
            const response = await api.post(`/api/users/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Add role to user (Admin only)
    addRoleToUser: async (userId, role) => {
        try {
            const response = await api.post(`/api/users/${userId}/roles/${role}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Remove role from user (Admin only)
    removeRoleFromUser: async (userId, role) => {
        try {
            const response = await api.delete(`/api/users/${userId}/roles/${role}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get user roles
    getUserRoles: async (userId) => {
        try {
            const response = await api.get(`/api/users/${userId}/roles`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Alias for getCurrentUserProfile
    getProfile: async () => {
        return userService.getCurrentUserProfile();
    }
};

export default userService;
