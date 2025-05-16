import React, { useEffect, useCallback, useState, useRef } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { type ButtonProps } from '@/components/ui/button';
import { trackEvent } from '@/utils/metaPixel';

// Add type declaration for the Cal object on the window
declare global {
  interface Window {
    Cal: any;
  }
}

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
      // Initialize Cal.com with the namespace from the embed code
      const cal = await getCalApi();
      // Use window.Cal instead of Cal directly
      window.Cal("init", "30min", {origin:"https://cal.com"});
      window.Cal.ns["30min"]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view"
      });
      
      calInitialized.current = true;
      
      // Track the booking intent when calendar opens
      cal.on('bookingPageLoaded', () => {
        trackEvent('InitiateBooking');
        console.log("Meta Pixel: Tracked InitiateBooking event");
      });
      
      // Track successful booking
      cal.on('bookingSuccessful', () => {
        trackEvent('Schedule');
        console.log("Meta Pixel: Tracked Schedule event");
      });
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

  // Load Cal.com script if needed
  useEffect(() => {
    // Add the Cal.com script to the head if not already present
    if (!document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) {
      const script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      document.head.appendChild(script);
      
      // Global initialization
      window.Cal = window.Cal || function() {
        const cal = window.Cal;
        const args = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          script.onload = function() {
            cal.loaded = true;
          };
        }
        cal.q.push(args);
      };
    }
  }, []);

  const handleClick = () => {
    trackEvent('BookingButtonClick');
    console.log("Meta Pixel: Tracked BookingButtonClick event");
    
    try {
      // Use window.Cal instead of Cal directly
      window.Cal.ns["30min"]("showModal", { calLink: "gofocus.ai/30min" });
    } catch (error) {
      console.error("Error opening Cal.com modal:", error);
    }
  };

  return (
    <Button 
      ref={buttonRef}
      data-cal-link="gofocus.ai/30min"
      data-cal-namespace="30min"
      data-cal-config='{"layout":"month_view"}'
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

export default BookingWidget;
