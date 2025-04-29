
import React, { useEffect } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { type ButtonProps } from '@/components/ui/button';
import { MetaPixel } from './MetaPixel';

interface BookingWidgetProps extends Omit<ButtonProps, 'onClick'> {
  className?: string;
  children?: React.ReactNode;
}

const BookingWidget = ({ className, variant = "default", children, ...props }: BookingWidgetProps) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      
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
        // Register for the bookingStarted event using the correct format
        cal("on", {
          action: "linkReady", // Using a valid action from Cal API
          callback: () => {
            window.fbq('track', 'InitiateCheckout');
          }
        });
        
        // Register for the bookingSuccessful event using the correct format
        cal("on", {
          action: "bookingSuccessful", // This is a valid action from Cal API
          callback: () => {
            window.fbq('track', 'Schedule');
          }
        });
      }
    })();
  }, []);

  return (
    <Button 
      data-cal-namespace="30min"
      data-cal-link="gofocus.ai/30min"
      data-cal-config='{"layout":"month_view"}'
      className={`transform transition-all duration-300 hover:scale-105 hover:shadow-glow w-full md:w-auto max-w-sm md:max-w-none flex justify-center items-center ${className}`}
      variant={variant}
      {...props}
    >
      {children || (
        <>
          <Calendar className="mr-2 h-5 w-5 animate-pulse-soft" />
          <span className="whitespace-normal text-center">Book a Demo</span>
        </>
      )}
    </Button>
  );
};

export default BookingWidget;
