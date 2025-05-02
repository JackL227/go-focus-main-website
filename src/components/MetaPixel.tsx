
import { useEffect } from 'react';
import { Script } from './ui/script';

interface MetaPixelProps {
  event?: 'PageView' | 'InitiateCheckout' | 'Schedule';
  pixelId?: string;
}

declare global {
  interface Window {
    fbq: any;
  }
}

export const MetaPixel: React.FC<MetaPixelProps> = ({ 
  event = 'PageView', 
  pixelId = '1090380949802626'  // Default to landing page pixel ID
}) => {
  useEffect(() => {
    // Initialize fbq if not already done
    if (window.fbq) {
      window.fbq('track', event);
      console.log(`Meta Pixel: Tracked ${event} event with pixel ID ${pixelId}`);
    }
  }, [event, pixelId]);

  return (
    <Script>
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', '${event}');
      `}
    </Script>
  );
};
