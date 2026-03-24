// API endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
        REFRESH: '/api/auth/refresh',
        VALIDATE: '/api/auth/validate',
    },
    ORGANIZATIONS: {
        LIST: '/api/organizations',
        CREATE: '/api/organizations',
        UPDATE: (id) => `/api/organizations/${id}`,
        DELETE: (id) => `/api/organizations/${id}`,
        DETAILS: (id) => `/api/organizations/${id}`,
    },
    USERS: {
        LIST: '/api/users',
        PROFILE: '/api/users/profile',
        UPDATE_PROFILE: '/api/users/profile',
        CHANGE_PASSWORD: '/api/users/change-password',
    },
    LOCATIONS: '/api/locations',
    ORGANIZATION_TYPES: '/api/organization-types',
    REPORTS: '/api/reports',
    MAP: '/api/map',
};

// Application constants
export const APP_CONFIG = {
    APP_NAME: 'NovusCap',
    VERSION: '1.0.0',
    DESCRIPTION: 'Platform for visualizing the entrepreneurship ecosystem in Turkey',
    DEFAULT_PAGE_SIZE: 10,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
};

// User roles
export const USER_ROLES = {
    ADMIN: 'Admin',
    USER: 'User',
    MODERATOR: 'Moderator',
};

// Organization types
export const ORGANIZATION_TYPES = {
    STARTUP: 'Startup',
    INVESTOR: 'Investor',
    ACCELERATOR: 'Accelerator',
    INCUBATOR: 'Incubator',
    UNIVERSITY: 'University',
    GOVERNMENT: 'Government',
    CORPORATION: 'Corporation',
    NGO: 'NGO',
};

// Map constants
export const MAP_CONFIG = {
    DEFAULT_CENTER: {
        lat: 39.9334,
        lng: 32.8597, // Turkey center
    },
    DEFAULT_ZOOM: 6,
    MIN_ZOOM: 5,
    MAX_ZOOM: 18,
};

// Toast notification types
export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

// Local storage keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    USER: 'user',
    THEME: 'theme',
    LANGUAGE: 'language',
};

// Validation rules
export const VALIDATION_RULES = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 8,
    PHONE: /^[+]?[\d\s\-\(\)]{10,}$/,
    URL: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
};

// Date formats
export const DATE_FORMATS = {
    DISPLAY: 'dd/MM/yyyy',
    DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
    ISO: 'yyyy-MM-dd',
    TIME: 'HH:mm',
};

// Error messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error occurred. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    NOT_FOUND: 'The requested resource was not found.',
};