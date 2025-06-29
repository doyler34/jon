// Essential-only cookie management with daily data wiping

export interface CookieConsent {
  essential: boolean;
  timestamp: number;
}

export interface CookiePreferences {
  consent: CookieConsent;
  lastWipe: number;
}

const COOKIE_PREFERENCES_KEY = 'js_cookie_preferences';
const CONSENT_BANNER_KEY = 'js_consent_banner_shown';

// Get current timestamp for daily wiping
const getCurrentDay = (): number => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
};

// Check if cookies should be wiped (daily reset)
export const shouldWipeCookies = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const preferences = getCookiePreferences();
  const currentDay = getCurrentDay();
  
  return preferences.lastWipe < currentDay;
};

// Get cookie preferences from localStorage
export const getCookiePreferences = (): CookiePreferences => {
  if (typeof window === 'undefined') {
    return {
      consent: { essential: true, timestamp: Date.now() },
      lastWipe: getCurrentDay()
    };
  }

  try {
    const stored = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (stored) {
      const preferences = JSON.parse(stored) as CookiePreferences;
      
      // Check if we need to wipe cookies (daily reset)
      if (shouldWipeCookies()) {
        wipeAllCookies();
        return {
          consent: { essential: true, timestamp: Date.now() },
          lastWipe: getCurrentDay()
        };
      }
      
      return preferences;
    }
  } catch (error) {
    console.warn('Failed to parse cookie preferences:', error);
  }

  return {
    consent: { essential: true, timestamp: Date.now() },
    lastWipe: getCurrentDay()
  };
};

// Save cookie preferences to localStorage
export const saveCookiePreferences = (consent: CookieConsent): void => {
  if (typeof window === 'undefined') return;

  const preferences: CookiePreferences = {
    consent,
    lastWipe: getCurrentDay()
  };

  try {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save cookie preferences:', error);
  }
};

// Check if consent banner has been shown
export const hasConsentBannerBeenShown = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    return localStorage.getItem(CONSENT_BANNER_KEY) === 'true';
  } catch (error) {
    return false;
  }
};

// Mark consent banner as shown
export const markConsentBannerShown = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CONSENT_BANNER_KEY, 'true');
  } catch (error) {
    console.warn('Failed to mark consent banner as shown:', error);
  }
};

// Wipe all non-essential cookies
export const wipeAllCookies = (): void => {
  if (typeof window === 'undefined') return;

  // Clear localStorage except for essential preferences
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (!key.startsWith('js_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }

  // Clear sessionStorage
  try {
    sessionStorage.clear();
  } catch (error) {
    console.warn('Failed to clear sessionStorage:', error);
  }

  // Clear cookies except essential ones
  try {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      // Keep essential cookies (admin_token, etc.)
      if (!name.startsWith('admin_') && name !== 'js_essential') {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  } catch (error) {
    console.warn('Failed to clear cookies:', error);
  }
};

// Set a cookie (only essential cookies allowed)
export const setCookie = (name: string, value: string, days: number = 1): void => {
  if (typeof window === 'undefined') return;

  const preferences = getCookiePreferences();
  
  // Only set cookies if essential consent is given
  if (preferences.consent.essential) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
  }
};

// Get a cookie value
export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;

  const preferences = getCookiePreferences();
  
  // Only return cookies if essential consent is given
  if (!preferences.consent.essential) return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Initialize cookie management (call this on app startup)
export const initializeCookieManagement = (): void => {
  if (typeof window === 'undefined') return;

  // Check if we need to wipe cookies (daily reset)
  if (shouldWipeCookies()) {
    wipeAllCookies();
    
    // Reset preferences to default (only essential cookies allowed)
    saveCookiePreferences({
      essential: true,
      timestamp: Date.now()
    });
  }
};

// Manual reset function for testing
export const resetCookiesForTesting = (): void => {
  if (typeof window === 'undefined') return;

  // Clear all cookies and storage
  wipeAllCookies();
  
  // Clear the consent banner flag
  try {
    localStorage.removeItem('js_consent_banner_shown');
  } catch (error) {
    console.warn('Failed to clear consent banner flag:', error);
  }
  
  // Reset preferences to default
  saveCookiePreferences({
    essential: true,
    timestamp: Date.now()
  });
  
  // Reload the page to show the banner again
  window.location.reload();
}; 