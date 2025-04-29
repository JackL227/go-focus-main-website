
import React from 'react';
import BookingWidget from '../BookingWidget';
import { Calendar, ArrowRight } from 'lucide-react';

interface VideoSalesLetterProps {
  videoId: string;
  title: string;
  subtitle?: string;
  showCtaButton?: boolean;
}

const VideoSalesLetter: React.FC<VideoSalesLetterProps> = ({ 
  videoId, 
  title, 
  subtitle,
  showCtaButton = false
}) => {
  return (
    <section className="py-8 md:py-10 bg-background/95">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-4 md:p-6 rounded-lg">
            {/* Video placeholder */}
            <div className="relative aspect-video bg-foreground/10 rounded mb-4 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-foreground/60">[Video Placeholder]</p>
                  <p className="text-xs text-foreground/40 mt-2">Video ID: {videoId}</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
            {subtitle && <p className="text-foreground/80 mb-4">{subtitle}</p>}
            
            {/* CTA Button - Only shown when showCtaButton is true */}
            {showCtaButton && (
              <div className="mt-4 flex justify-center">
                <BookingWidget className="w-full md:w-auto max-w-xs mx-auto text-white group text-base md:text-lg px-5 md:px-7 py-3 md:py-4 bg-primary hover:bg-primary/90 animate-button-pop shadow-glow">
                  <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="text-wrap break-words text-sm">Book Your Free Strategy Call</span>
                  <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </BookingWidget>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSalesLetter;
