
import React, { useEffect, useState } from 'react';
import { getCalApi } from "@calcom/embed-react";
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { type ButtonProps } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface BookingWidgetProps extends Omit<ButtonProps, 'onClick'> {
  className?: string;
  children?: React.ReactNode;
}

const BookingWidget = ({ className, variant = "default", children, ...props }: BookingWidgetProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
    <>
      <Button 
        onClick={() => setDialogOpen(true)}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Book Your Strategy Call</DialogTitle>
            <DialogDescription>
              Schedule a time to discuss how our AI agents can help grow your business.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <div
              data-cal-namespace="30min"
              data-cal-link="gofocus.ai/30min"
              data-cal-config='{"layout":"month_view"}'
              style={{ width: '100%', height: '100%', minHeight: '500px' }}
            ></div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingWidget;
