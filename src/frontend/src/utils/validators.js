// validators.js
import { VALIDATION_RULES } from './constants';

// Basic validation functions
export const validateRequired = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== '';
    if (Array.isArray(value)) return value.length > 0;
    return true;
};

export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    return VALIDATION_RULES.EMAIL.test(email.toLowerCase());
};

export const validatePassword = (password) => {
    if (!password || typeof password !== 'string') return false;
    return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

export const validatePasswordStrength = (password) => {
    if (!password) return { isValid: false, errors: ['Password is required'] };
    
    const errors = [];
    
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        strength: getPasswordStrength(password)
    };
};

export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};

export const validatePhoneNumber = (phone) => {
    if (!phone || typeof phone !== 'string') return false;
    return VALIDATION_RULES.PHONE.test(phone);
};

export const validateUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    return VALIDATION_RULES.URL.test(url);
};

// Organization specific validators
export const validateOrganizationName = (name) => {
    if (!validateRequired(name)) return false;
    return name.trim().length >= 3 && name.trim().length <= 100;
};

export const validateOrganizationDescription = (description) => {
    if (!description) return true; // Optional field
    return description.trim().length <= 1000;
};

// User specific validators
export const validateFirstName = (firstName) => {
    if (!validateRequired(firstName)) return false;
    return firstName.trim().length >= 2 && firstName.trim().length <= 50;
};

export const validateLastName = (lastName) => {
    if (!validateRequired(lastName)) return false;
    return lastName.trim().length >= 2 && lastName.trim().length <= 50;
};

export const validateFullName = (fullName) => {
    if (!validateRequired(fullName)) return false;
    const trimmed = fullName.trim();
    return trimmed.length >= 4 && trimmed.length <= 100 && trimmed.includes(' ');
};

// Geographic validators
export const validateLatitude = (lat) => {
    const num = parseFloat(lat);
    return !isNaN(num) && num >= -90 && num <= 90;
};

export const validateLongitude = (lng) => {
    const num = parseFloat(lng);
    return !isNaN(num) && num >= -180 && num <= 180;
};

export const validateAddress = (address) => {
    if (!validateRequired(address)) return false;
    return address.trim().length >= 10 && address.trim().length <= 500;
};

export const validateCity = (city) => {
    if (!validateRequired(city)) return false;
    return city.trim().length >= 2 && city.trim().length <= 50;
};

export const validateCountry = (country) => {
    if (!validateRequired(country)) return false;
    return country.trim().length >= 2 && country.trim().length <= 50;
};

export const validatePostalCode = (postalCode) => {
    if (!postalCode) return true; // Optional field
    // Turkish postal codes are 5 digits
    return /^\d{5}$/.test(postalCode);
};

// File validators
export const validateFile = (file, maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/gif']) => {
    if (!file) return { isValid: false, errors: ['File is required'] };
    
    const errors = [];
    
    if (file.size > maxSize) {
        errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
    }
    
    if (!allowedTypes.includes(file.type)) {
        errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateImageFile = (file) => {
    return validateFile(file, 5 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
};

// Date validators
export const validateDate = (date) => {
    if (!date) return false;
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
};

export const validateFutureDate = (date) => {
    if (!validateDate(date)) return false;
    return new Date(date) > new Date();
};

export const validatePastDate = (date) => {
    if (!validateDate(date)) return false;
    return new Date(date) < new Date();
};

export const validateAge = (birthDate, minAge = 0, maxAge = 150) => {
    if (!validateDate(birthDate)) return false;
    
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    
    return age >= minAge && age <= maxAge;
};

// Number validators
export const validateNumber = (value, min = null, max = null) => {
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    
    if (min !== null && num < min) return false;
    if (max !== null && num > max) return false;
    
    return true;
};

export const validateInteger = (value, min = null, max = null) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num.toString() !== value.toString()) return false;
    
    if (min !== null && num < min) return false;
    if (max !== null && num > max) return false;
    
    return true;
};

export const validatePositiveNumber = (value) => {
    return validateNumber(value, 0);
};

// Form validation helpers
export const validateForm = (formData, validationRules) => {
    const errors = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(field => {
        const rules = validationRules[field];
        const value = formData[field];
        const fieldErrors = [];
        
        rules.forEach(rule => {
            if (typeof rule === 'function') {
                if (!rule(value)) {
                    fieldErrors.push(`${field} is invalid`);
                }
            } else if (typeof rule === 'object') {
                if (!rule.validator(value)) {
                    fieldErrors.push(rule.message || `${field} is invalid`);
                }
            }
        });
        
        if (fieldErrors.length > 0) {
            errors[field] = fieldErrors;
            isValid = false;
        }
    });
    
    return { isValid, errors };
};

// Helper functions
const getPasswordStrength = (password) => {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
};

// Validation rule builders
export const createValidationRule = (validator, message) => ({
    validator,
    message
});

export const required = (message = 'This field is required') => 
    createValidationRule(validateRequired, message);

export const email = (message = 'Please enter a valid email address') => 
    createValidationRule(validateEmail, message);

export const minLength = (length, message = `Must be at least ${length} characters`) => 
    createValidationRule(value => value && value.length >= length, message);

export const maxLength = (length, message = `Must be no more than ${length} characters`) => 
    createValidationRule(value => !value || value.length <= length, message);
