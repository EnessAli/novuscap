import axios from 'axios';
import { toast } from 'react-toastify';

// API base URL - development ortamında backend port 5002'de çalışıyor
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002';

// Create an instance of axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, {
                        refreshToken: refreshToken
                    });

                    const { token, refreshToken: newRefreshToken } = response.data;
                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    // Retry the original request with new token
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // Handle other errors
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else if (error.message) {
            toast.error(error.message);
        } else {
            toast.error('Bir hata oluştu');
        }

        // API'den dönen hata mesajını logla
        if (error.response && error.response.data && error.response.data.message) {
            console.error('API Hatası:', error.response.data.message);
        } else {
            console.error('API Hatası:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;