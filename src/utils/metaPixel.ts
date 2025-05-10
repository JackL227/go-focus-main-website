
// Meta Pixel tracking utilities

/**
 * Track a page view event
 * @param path Optional path to include in logging
 */
export const trackPageView = (path?: string): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', 'PageView');
      if (import.meta.env.DEV) {
        console.log(`Meta Pixel: PageView tracked${path ? ` for ${path}` : ''}`);
      }
    } catch (error) {
      // Silent error handling in production
      if (import.meta.env.DEV) {
        console.error('Error tracking PageView:', error);
      }
    }
  }
};

/**
 * Track a specific event with optional parameters
 */
export const trackEvent = (
  eventName: string, 
  parameters?: Record<string, unknown>
): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', eventName, parameters);
      if (import.meta.env.DEV) {
        console.log(`Meta Pixel: "${eventName}" tracked`, parameters);
      }
    } catch (error) {
      // Silent error handling in production
      if (import.meta.env.DEV) {
        console.error(`Error tracking ${eventName}:`, error);
      }
    }
  }
};

/**
 * Track a custom event with optional parameters
 */
export const trackCustomEvent = (
  eventName: string, 
  parameters?: Record<string, unknown>
): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('trackCustom', eventName, parameters);
      if (import.meta.env.DEV) {
        console.log(`Meta Pixel: Custom "${eventName}" tracked`, parameters);
      }
    } catch (error) {
      // Silent error handling in production
      if (import.meta.env.DEV) {
        console.error(`Error tracking custom event ${eventName}:`, error);
      }
    }
  }
};
