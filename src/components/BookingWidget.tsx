
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { type ButtonProps } from '@/components/ui/button';

interface BookingWidgetProps extends Omit<ButtonProps, 'onClick'> {
  className?: string;
  children?: React.ReactNode;
}

const BookingWidget = ({ className, variant = "default", children, ...props }: BookingWidgetProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const calInitialized = useRef(false);

  const initCalCom = useCallback(async () => {
    if (calInitialized.current) return;
    
    try {
      const cal = await getCalApi({ namespace: "30min" });
      calInitialized.current = true;
      
      cal("ui", {
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#006EDA",
            "cal-bg": "#ffffff",
            "cal-text": "#111111"
          },
          dark: {
            "cal-brand": "#006EDA",
            "cal-bg": "#050A14",
            "cal-text": "#cecece"
          }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });

      // Track booking events with Meta Pixel
      if (window.fbq) {
        // Register for the linkReady event using the correct format
        cal("on", {
          action: "linkReady",
          callback: () => {
            window.fbq('track', 'InitiateCheckout');
          }
        });
        
        // Register for the bookingSuccessful event using the correct format
        cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            window.fbq('track', 'Schedule');
          }
        });
      }
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

  return (
    <Button 
      ref={buttonRef}
      data-cal-namespace="30min"
      data-cal-link="gofocus.ai/30min"
      data-cal-config='{"layout":"month_view"}'
      className={`transform transition-all duration-300 hover:scale-105 hover:shadow-glow animate-button-pop ${className}`}
      variant={variant}
      {...props}
    >
      {children || (
        <>
          <Calendar className="mr-2 h-5 w-5 flex-shrink-0 animate-pulse-soft" />
          <span className="text-center break-words">Book a Demo</span>
        </>
      )}
    </Button>
  );
};

export default BookingWidget;
