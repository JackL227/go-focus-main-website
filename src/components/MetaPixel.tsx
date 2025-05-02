
import React, { useEffect } from 'react';

declare global {
  interface Window {
    fbq: any;
  }
}

interface MetaPixelProps {
  event?: 'PageView' | 'InitiateCheckout' | 'Schedule' | 'CompleteRegistration' | 'Contact';
  options?: Record<string, any>;
}

const MetaPixel: React.FC<MetaPixelProps> = ({ event = 'PageView', options = {} }) => {
  useEffect(() => {
    if (window.fbq) {
      console.log(`🔍 Tracking Meta Pixel event: ${event}`, options);
      window.fbq('track', event, options);
    } else {
      console.warn('Meta Pixel not initialized. Event not tracked:', event);
    }
  }, [event, options]);

  return null; // This component doesn't render anything
};

export default MetaPixel;
