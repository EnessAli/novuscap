import api from './api';

const authService = {
    // Login user
    login: async (loginData) => {
        try {
            const response = await api.post('/api/auth/login', loginData);
            const { user, token, refreshToken } = response.data;

            // Store tokens and user data
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Register user
    register: async (registerData) => {
        try {
            const response = await api.post('/api/auth/register', registerData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Logout user
    logout: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                await api.post('/api/auth/logout', { refreshToken });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage regardless of API call result
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        }
    },

    // Refresh token
    refreshToken: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await api.post('/api/auth/refresh-token', {
                refreshToken: refreshToken
            });

            const { token, refreshToken: newRefreshToken } = response.data;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', newRefreshToken);

            return response.data;
        } catch (error) {
            // If refresh fails, clear all auth data
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            throw error;
        }
    },

    // Validate token
    validateToken: async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return false;
            }

            const response = await api.post('/api/auth/validate-token', { token });
            return response.data.isValid;
        } catch (error) {
            return false;
        }
    },

    // Change password
    changePassword: async (changePasswordData) => {
        try {
            const response = await api.post('/api/auth/change-password', changePasswordData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get current user
    getCurrentUser: () => {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            return null;
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const token = localStorage.getItem('accessToken');
        const user = authService.getCurrentUser();
        return !!(token && user);
    },

    // Get access token
    getAccessToken: () => {
        return localStorage.getItem('accessToken');
    },

    // Get refresh token
    getRefreshToken: () => {
        return localStorage.getItem('refreshToken');
    },

    // Check if user has role
    hasRole: (role) => {
        const user = authService.getCurrentUser();
        return user && user.roles && user.roles.includes(role);
    },

    // Check if user is admin
    isAdmin: () => {
        return authService.hasRole('Admin');
    }
};

export default authService;