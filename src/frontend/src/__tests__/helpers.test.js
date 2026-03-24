import {
  formatDate,
  capitalizeFirst,
  truncateText,
  validateEmail,
  isEmpty,
  deepClone,
  formatNumber,
  getErrorMessage
} from '../utils/helpers';

describe('Helper Functions', () => {
  describe('capitalizeFirst', () => {
    test('capitalizes first letter correctly', () => {
      expect(capitalizeFirst('hello')).toBe('Hello');
      expect(capitalizeFirst('WORLD')).toBe('World');
      expect(capitalizeFirst('test')).toBe('Test');
    });

    test('handles empty strings', () => {
      expect(capitalizeFirst('')).toBe('');
      expect(capitalizeFirst(null)).toBe('');
      expect(capitalizeFirst(undefined)).toBe('');
    });
  });

  describe('truncateText', () => {
    test('truncates text correctly', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long ...');
    });

    test('returns original text if shorter than limit', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });

    test('handles empty text', () => {
      expect(truncateText('', 10)).toBe('');
      expect(truncateText(null, 10)).toBe('');
    });
  });

  describe('isEmpty', () => {
    test('correctly identifies empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    test('correctly identifies non-empty values', () => {
      expect(isEmpty('test')).toBe(false);
      expect(isEmpty(['item'])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty(0)).toBe(false);
    });
  });

  describe('deepClone', () => {
    test('creates deep copy of objects', () => {
      const original = { 
        name: 'test', 
        nested: { value: 123 },
        array: [1, 2, 3]
      };
      const cloned = deepClone(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.nested).not.toBe(original.nested);
    });

    test('handles primitive values', () => {
      expect(deepClone(null)).toBe(null);
      expect(deepClone('string')).toBe('string');
      expect(deepClone(123)).toBe(123);
    });
  });

  describe('formatNumber', () => {
    test('formats numbers correctly', () => {
      expect(formatNumber(1234)).toBe('1.234');
      expect(formatNumber(1234.56, 2)).toBe('1.234,56');
    });

    test('handles null and undefined', () => {
      expect(formatNumber(null)).toBe('');
      expect(formatNumber(undefined)).toBe('');
    });
  });

  describe('getErrorMessage', () => {
    test('extracts error messages correctly', () => {
      expect(getErrorMessage('Simple error')).toBe('Simple error');
      expect(getErrorMessage({ message: 'Error object' })).toBe('Error object');
      expect(getErrorMessage({ 
        response: { 
          data: { 
            message: 'API error' 
          } 
        } 
      })).toBe('API error');
    });

    test('returns default message for unknown errors', () => {
      expect(getErrorMessage({})).toBe('An unexpected error occurred');
    });
  });
});
