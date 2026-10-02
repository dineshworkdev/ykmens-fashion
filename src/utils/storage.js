/**
 * Safe Local Storage Utility
 * Handles serialization, parsing, error recovery, and SSR/incognito environment checks.
 */

export const safeStorage = {
  get: (key, fallback = null) => {
    try {
      if (typeof window === 'undefined') return fallback;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.warn(`[safeStorage] Failed to read key "${key}":`, error);
      return fallback;
    }
  },

  set: (key, value) => {
    try {
      if (typeof window === 'undefined') return false;
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`[safeStorage] Failed to set key "${key}":`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      if (typeof window === 'undefined') return false;
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`[safeStorage] Failed to remove key "${key}":`, error);
      return false;
    }
  },

  clear: () => {
    try {
      if (typeof window === 'undefined') return false;
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.warn('[safeStorage] Failed to clear localStorage:', error);
      return false;
    }
  },
};
