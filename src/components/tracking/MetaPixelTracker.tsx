
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/metaPixel';

/**
 * Component to handle Meta Pixel page view tracking across the app
 * This should be mounted once at the app level
 */
const MetaPixelTracker: React.FC = () => {
  const location = useLocation();

  // Track page views when route changes
  useEffect(() => {
    // Small timeout to ensure DOM is fully loaded
    const timeoutId = setTimeout(() => {
      trackPageView(location.pathname);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // The component doesn't render anything
  return null;
};

export default MetaPixelTracker;
