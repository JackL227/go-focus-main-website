
import React from 'react';
import { Button } from '@/components/ui/button';
import { type ButtonProps } from '@/components/ui/button';
import { trackEvent } from '@/utils/metaPixel';

const CALENDLY_URL =
  'https://calendly.com/ethan-gofocus/1?background_color=1a1a1a&text_color=ffffff';

interface BookingWidgetProps extends Omit<ButtonProps, 'onClick'> {
  className?: string;
  children?: React.ReactNode;
  isDemoButton?: boolean;
}

const BookingWidget = ({
  className,
  variant = 'default',
  size = 'default',
  children,
  isDemoButton,
  ...props
}: BookingWidgetProps) => {
  const handleClick = () => {
    trackEvent('BookingButtonClick');
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, '_blank');
    }
  };

  return (
    <Button
      className={`transition-all duration-200 hover:shadow-md ${className || ''}`}
      variant={variant}
      size={size}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: Element }) => void;
    };
  }
}

export default BookingWidget;
