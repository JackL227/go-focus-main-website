
// Meta Pixel tracking utilities

/**
 * Track a page view event
 */
export const trackPageView = (): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
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
    window.fbq('track', eventName, parameters);
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
    window.fbq('trackCustom', eventName, parameters);
  }
};
