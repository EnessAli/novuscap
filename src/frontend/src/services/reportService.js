import api from './api';

const reportService = {    // Get all reports
    getReports: async (params = {}) => {
        try {
            const response = await api.get('/api/reports', { params });
            // Backend returns PagedResult, so we need to return the items array
            return response.data.items || [];
        } catch (error) {
            throw error;
        }
    },

    // Get report by ID
    getReportById: async (id) => {
        try {
            const response = await api.get(`/api/reports/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create report
    createReport: async (reportData) => {
        try {
            const response = await api.post('/api/reports', reportData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update report
    updateReport: async (id, reportData) => {
        try {
            const response = await api.put(`/api/reports/${id}`, reportData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete report (Admin only)
    deleteReport: async (id) => {
        try {
            const response = await api.delete(`/api/reports/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default reportService;
