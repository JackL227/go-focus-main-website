
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare fbq for TypeScript
declare global {
  interface Window {
    fbq: any;
  }
}

interface MetaPixelTrackerProps {
  children?: React.ReactNode;
  eventName?: string;
}

const MetaPixelTracker = ({ children, eventName }: MetaPixelTrackerProps) => {
  const location = useLocation();

  // Track page views when route changes
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
      console.log('Meta Pixel: PageView event fired on route change');
    }
  }, [location.pathname]);

  // Track custom event if provided
  useEffect(() => {
    if (eventName && window.fbq) {
      window.fbq('track', eventName);
      console.log(`Meta Pixel: ${eventName} event fired`);
    }
  }, [eventName]);

  return <>{children}</>;
};

export default MetaPixelTracker;
