import {
  validateEmail,
  validatePassword,
  validateRequired,
  validatePhoneNumber,
  validateOrganizationName,
  validateUrl,
  validatePasswordStrength
} from '../utils/validators';

describe('Validators', () => {
  describe('validateEmail', () => {
    test('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('test+tag@example.org')).toBe(true);
    });

    test('rejects invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(null)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('validates passwords with minimum length', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('12345678')).toBe(true);
    });

    test('rejects passwords that are too short', () => {
      expect(validatePassword('123')).toBe(false);
      expect(validatePassword('pass')).toBe(false);
      expect(validatePassword('')).toBe(false);
      expect(validatePassword(null)).toBe(false);
    });
  });

  describe('validateRequired', () => {
    test('validates non-empty values', () => {
      expect(validateRequired('test')).toBe(true);
      expect(validateRequired('0')).toBe(true);
      expect(validateRequired(['item'])).toBe(true);
    });

    test('rejects empty values', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
      expect(validateRequired(null)).toBe(false);
      expect(validateRequired(undefined)).toBe(false);
      expect(validateRequired([])).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    test('evaluates password strength correctly', () => {
      const strongPassword = validatePasswordStrength('StrongPass123!');
      expect(strongPassword.isValid).toBe(true);
      expect(strongPassword.strength).toBe('strong');

      const weakPassword = validatePasswordStrength('weak');
      expect(weakPassword.isValid).toBe(false);
      expect(weakPassword.errors.length).toBeGreaterThan(0);
    });
  });

  describe('validateUrl', () => {
    test('validates correct URLs', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://test.org')).toBe(true);
      expect(validateUrl('ftp://files.example.com')).toBe(true);
    });

    test('rejects invalid URLs', () => {
      expect(validateUrl('not-a-url')).toBe(false);
      expect(validateUrl('example.com')).toBe(false);
      expect(validateUrl('')).toBe(false);
    });
  });
});
