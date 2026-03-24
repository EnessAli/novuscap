import { format, parseISO } from 'date-fns';
import { DATE_FORMATS, VALIDATION_RULES } from './constants';

// Date formatting helpers
export const formatDate = (date, formatPattern = DATE_FORMATS.DISPLAY) => {
    if (!date) return '';
    try {
        const parsedDate = typeof date === 'string' ? parseISO(date) : date;
        return format(parsedDate, formatPattern);
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
};

export const formatDateTime = (date) => {
    return formatDate(date, DATE_FORMATS.DISPLAY_WITH_TIME);
};

// String helpers
export const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const generateSlug = (text) => {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

// Validation helpers
export const validateEmail = (email) => {
    return VALIDATION_RULES.EMAIL.test(email);
};

export const validatePassword = (password) => {
    return password && password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

export const validatePhone = (phone) => {
    return VALIDATION_RULES.PHONE.test(phone);
};

export const validateUrl = (url) => {
    return VALIDATION_RULES.URL.test(url);
};

// Number helpers
export const formatNumber = (num, decimals = 0) => {
    if (num === null || num === undefined) return '';
    return Number(num).toLocaleString('tr-TR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};

export const formatCurrency = (amount, currency = 'TRY') => {
    if (amount === null || amount === undefined) return '';
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

// Object helpers
export const isEmpty = (obj) => {
    if (obj === null || obj === undefined) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    if (typeof obj === 'string') return obj.trim().length === 0;
    return false;
};

export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
};

// Array helpers
export const sortByProperty = (array, property, direction = 'asc') => {
    return [...array].sort((a, b) => {
        const aValue = a[property];
        const bValue = b[property];
        
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
};

export const uniqueByProperty = (array, property) => {
    const seen = new Set();
    return array.filter(item => {
        const value = item[property];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
};

// URL helpers
export const buildQueryString = (params) => {
    const query = new URLSearchParams();
    Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            query.append(key, params[key]);
        }
    });
    return query.toString();
};

export const parseQueryString = (queryString) => {
    const params = new URLSearchParams(queryString);
    const result = {};
    for (const [key, value] of params.entries()) {
        result[key] = value;
    }
    return result;
};

// File helpers
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Error handling helpers
export const getErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    if (error?.response?.data?.message) return error.response.data.message;
    if (error?.message) return error.message;
    return 'An unexpected error occurred';
};

// Storage helpers
export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting localStorage:', error);
    }
};

export const getLocalStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error getting localStorage:', error);
        return defaultValue;
    }
};

export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing localStorage:', error);
    }
};

// Debounce helper
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};