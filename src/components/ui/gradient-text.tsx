
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'blue-silver' | 'primary' | 'accent';
}

export const GradientText = ({ 
  children, 
  className, 
  gradient = 'blue-silver' 
}: GradientTextProps) => {
  const gradientStyles = {
    'blue-silver': 'from-blue-500 via-[#C8C8C9] to-blue-500',
    'primary': 'from-primary via-primary/80 to-primary/60',
    'accent': 'from-accent via-accent/80 to-accent/60'
  };

  return (
    <span className={cn(
      'bg-gradient-to-r bg-clip-text text-transparent',
      gradientStyles[gradient],
      className
    )}>
      {children}
    </span>
  );
};

export default GradientText;
