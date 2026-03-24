// Performance optimization utilities
import { lazy, Suspense, memo, useState, useEffect, useCallback } from 'react';
import Loading from '../components/common/Loading';

// Lazy loading utility for components
export const lazyLoad = (importFn, fallback = <Loading />) => {
  const LazyComponent = lazy(importFn);
  
  return memo((props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  ));
};

// Debounce hook for performance optimization
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isIntersecting];
};

// Local storage hook with performance optimization
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Memoized component wrapper
export const withMemo = (Component, arePropsEqual) => {
  return memo(Component, arePropsEqual);
};

// Performance monitoring utility
export const performanceMonitor = {
  startTiming: (label) => {
    if (process.env.NODE_ENV === 'development') {
      performance.mark(`${label}-start`);
    }
  },
  
  endTiming: (label) => {
    if (process.env.NODE_ENV === 'development') {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
      
      const measure = performance.getEntriesByName(label)[0];
      console.log(`⏱️ ${label}: ${measure.duration.toFixed(2)}ms`);
    }
  },
  
  clearTimings: () => {
    if (process.env.NODE_ENV === 'development') {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }
};

// Image optimization utility
export const optimizeImage = (src, options = {}) => {
  const {
    width,
    height,
    quality = 80,
    format = 'webp'
  } = options;

  // This would typically integrate with a service like Cloudinary or similar
  // For now, return the original src
  return src;
};

// Bundle size analysis utility (development only)
export const bundleAnalyzer = {
  logComponentSize: (componentName, Component) => {
    if (process.env.NODE_ENV === 'development') {
      const componentString = Component.toString();
      const sizeInKB = (new Blob([componentString]).size / 1024).toFixed(2);
      console.log(`📦 Component ${componentName}: ~${sizeInKB}KB`);
    }
    return Component;
  }
};
