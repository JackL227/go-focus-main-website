
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { type ButtonProps } from '@/components/ui/button';
import { trackEvent } from '@/utils/metaPixel';

interface BookingWidgetProps extends Omit<ButtonProps, 'onClick'> {
  className?: string;
  children?: React.ReactNode;
  isDemoButton?: boolean;
}

const BookingWidget = ({ 
  className, 
  variant = "default", 
  size = "default",
  children, 
  isDemoButton,
  ...props 
}: BookingWidgetProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const calInitialized = useRef(false);

  const initCalCom = useCallback(async () => {
    if (calInitialized.current) return;
    
    try {
      const cal = await getCalApi();
      if (!cal) {
        console.error("Cal.com API not available");
        return;
      }
      
      // Initialize Cal.com with proper configuration
      cal("init", {
        origin: "https://app.cal.com",
      });
      
      // Track events via direct cal api methods
      cal("on", {
        action: "BOOKING_PAGE_LOADED",
        callback: () => {
          trackEvent('InitiateBooking');
          console.log("Meta Pixel: Tracked InitiateBooking event");
        }
      });
      
      cal("on", {
        action: "BOOKING_SUCCESSFUL",
        callback: () => {
          trackEvent('Schedule');
          console.log("Meta Pixel: Tracked Schedule event");
        }
      });
      
      calInitialized.current = true;
    } catch (error) {
      console.error("Error initializing Cal.com:", error);
    }
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    observer.observe(buttonRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Initialize Cal.com when the button is in viewport or close
  useEffect(() => {
    if (isIntersecting) {
      initCalCom();
    }
  }, [isIntersecting, initCalCom]);

  const handleClick = () => {
    trackEvent('BookingButtonClick');
    console.log("Meta Pixel: Tracked BookingButtonClick event");
    
    try {
      // Use the getCalApi to access the Cal instance properly
      getCalApi().then((cal) => {
        if (!cal) {
          console.error("Cal.com API not available");
          return;
        }
        
        cal("showModal", {
          calLink: "gofocus.ai/30min",
          config: {
            hideEventTypeDetails: false,
            layout: "month_view"
          }
        });
      });
    } catch (error) {
      console.error("Error opening Cal.com modal:", error);
    }
  };

  return (
    <Button 
      ref={buttonRef}
      className={`transform transition-all duration-300 hover:scale-105 hover:shadow-glow ${className}`}
      variant={variant}
      size={size}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};

// Add Cal to the window object for TypeScript
declare global {
  interface Window {
    Cal?: any;
  }
}

export default BookingWidget;
