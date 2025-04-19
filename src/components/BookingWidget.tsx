
import React, { useEffect } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { type ButtonProps } from '@/components/ui/button';

interface BookingWidgetProps extends Omit<ButtonProps, 'onClick'> {
  className?: string;
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
    })();
  }, []);

  return (
    <Button 
      data-cal-namespace="30min"
      data-cal-link="gofocus.ai/30min"
      data-cal-config='{"layout":"month_view"}'
      className={className}
      variant={variant}
      {...props}
    >
      {children || (
        <>
          <Calendar className="mr-2 h-5 w-5" />
          Book a Demo
        </>
      )}
    </Button>
  );
};

export default BookingWidget;

