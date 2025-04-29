
import React, { useEffect } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { type ButtonProps } from '@/components/ui/button';

interface BookingWidgetProps extends Omit<ButtonProps, 'onClick'> {
  className?: string;
  children?: React.ReactNode;
}

const BookingWidget = ({ className, variant = "default", children, ...props }: BookingWidgetProps) => {
  useEffect(() => {
    // Initialize Cal.com widget only once
    let calInstance: any = null;
    
    const initCal = async () => {
      try {
        const cal = await getCalApi({ namespace: "30min" });
        calInstance = cal;
        
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
          // Register for valid Cal.com events
          cal("on", {
            action: "linkReady",
            callback: () => {
              window.fbq('track', 'InitiateCheckout');
            }
          });
          
          cal("on", {
            action: "bookingSuccessful",
            callback: () => {
              window.fbq('track', 'Schedule');
            }
          });
        }
      } catch (error) {
        console.error('Error initializing Cal widget:', error);
      }
    };

    initCal();
    
    // Cleanup function to prevent memory leaks
    return () => {
      if (calInstance) {
        // Clean up Cal instance if needed
      }
    };
  }, []);

  return (
    <Button 
      data-cal-namespace="30min"
      data-cal-link="gofocus.ai/30min"
      data-cal-config='{"layout":"month_view"}'
      className={`flex justify-center items-center text-wrap ${className}`}
      variant={variant}
      {...props}
    >
      {children || (
        <>
          <Calendar className="mr-2 h-5 w-5 flex-shrink-0" />
          <span className="text-center">Book a Demo</span>
        </>
      )}
    </Button>
  );
};

export default BookingWidget;
