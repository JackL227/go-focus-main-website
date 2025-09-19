
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { type ButtonProps } from '@/components/ui/button';
import { trackEvent } from '@/utils/metaPixel';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const initCalCom = useCallback(async () => {
    if (calInitialized.current) return;
    
    try {
      // Initialize Cal using the floating popup approach
      (function (C, A, L) { 
        let p = function (a: any, ar: any) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          }
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");
      
      // Initialize with the provided configuration
      window.Cal("init", "30-minute-strategy-call-with-gofocus-ai", {origin:"https://app.cal.com"});
      
      window.Cal.ns["30-minute-strategy-call-with-gofocus-ai"]("ui", {
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });

      // Set up event tracking
      try {
        const cal = await getCalApi();
        if (cal) {
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
        }
      } catch (trackingError) {
        console.log("Cal API tracking setup failed, but widget will still work:", trackingError);
      }
      
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
      // Ensure Cal is initialized first
      if (!window.Cal) {
        initCalCom();
        // Give it a moment to initialize
        setTimeout(() => {
          handleClick();
        }, 500);
        return;
      }

      // Trigger the floating button popup
      if (window.Cal.ns && window.Cal.ns["30-minute-strategy-call-with-gofocus-ai"]) {
        // Simulate clicking the floating button or open the popup directly
        window.Cal.ns["30-minute-strategy-call-with-gofocus-ai"]("showModal", { 
          calLink: "ethan-gofocus.ai/30-minute-strategy-call-with-gofocus-ai",
        });
      } else {
        // Fallback: open directly in new tab
        window.open("https://cal.com/ethan-gofocus.ai/30-minute-strategy-call-with-gofocus-ai", "_blank");
      }
    } catch (error) {
      console.error("Error opening Cal.com popup:", error);
      // Fallback: open directly in new tab
      window.open("https://cal.com/ethan-gofocus.ai/30-minute-strategy-call-with-gofocus-ai", "_blank");
    }
  };

  // Apply mobile-specific styling when on mobile
  const mobileVariant = isMobile ? "funnel-mobile" : variant;
  const buttonClassName = `${isMobile ? "text-base py-3" : ""} ${className || ""}`;

  return (
    <Button 
      ref={buttonRef}
      data-cal-link="ethan-gofocus.ai/30-minute-strategy-call-with-gofocus-ai"
      data-cal-namespace="30-minute-strategy-call-with-gofocus-ai"
      data-cal-config='{"layout":"month_view"}'
      className={`transform transition-all duration-300 hover:scale-105 hover:shadow-glow ${buttonClassName}`}
      variant={mobileVariant}
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
    Cal: any;
  }
}

export default BookingWidget;
