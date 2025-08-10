
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
const [open, setOpen] = useState(false);
const [isIntersecting, setIsIntersecting] = useState(false);
const buttonRef = useRef<HTMLButtonElement>(null);
const calInitialized = useRef(false);
const inlineSetupDone = useRef(false);
const inlineContainerId = useRef(`my-cal-inline-${Math.random().toString(36).slice(2)}`);
const isMobile = useIsMobile();

  const initCalCom = useCallback(() => {
    if (calInitialized.current) return;
    try {
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
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          }
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");

      window.Cal("init", "30m-strategy-call-w-gofocus-ai", { origin: "https://app.cal.com" });

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

  // When dialog opens, mount Cal inline embed into the container
  useEffect(() => {
    if (!open) return;
    initCalCom();
    if (inlineSetupDone.current) return;
    try {
      const ns = "30m-strategy-call-w-gofocus-ai";
      window.Cal.ns[ns]("inline", {
        elementOrSelector: `#${inlineContainerId.current}`,
        config: { layout: "month_view" },
        calLink: "ethan-gofocus.ai/30m-strategy-call-w-gofocus-ai",
      });
      window.Cal.ns[ns]("ui", { hideEventTypeDetails: false, layout: "month_view" });
      inlineSetupDone.current = true;
    } catch (error) {
      console.error("Error setting up Cal inline embed:", error);
    }
  }, [open, initCalCom]);

  const handleClick = () => {
    trackEvent('BookingButtonClick');
    console.log("Meta Pixel: Tracked BookingButtonClick event");
    setOpen(true);
  };

  // Apply mobile-specific styling when on mobile
  const mobileVariant = isMobile ? "funnel-mobile" : variant;
  const buttonClassName = `${isMobile ? "text-base py-3" : ""} ${className || ""}`;

  return (
    <>
      <Button 
        ref={buttonRef}
        className={`transform transition-all duration-300 hover:scale-105 hover:shadow-glow ${buttonClassName}`}
        variant={mobileVariant}
        size={size}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl w-[90vw] h-[80vh] p-0">
          <div 
            id={inlineContainerId.current} 
            style={{ width: '100%', height: '100%', overflow: 'auto' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

// Add Cal to the window object for TypeScript
declare global {
  interface Window {
    Cal: any;
  }
}

export default BookingWidget;
