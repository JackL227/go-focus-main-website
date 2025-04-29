
import React from 'react';
import BookingWidget from '@/components/BookingWidget';
import { ArrowRight } from 'lucide-react';

interface VideoSalesLetterProps {
  videoId: string;
  title: string;
  subtitle: string;
  showCtaAboveFold?: boolean;
}

const VideoSalesLetter: React.FC<VideoSalesLetterProps> = ({
  videoId,
  title,
  subtitle,
  showCtaAboveFold = false
}) => {
  return (
    <section className="py-4 md:py-6 relative overflow-hidden">
      <div className="container-custom max-w-5xl mx-auto">
        {showCtaAboveFold && (
          <div className="hidden md:flex justify-center mb-6 animate-fade-in [animation-delay:500ms]">
            <BookingWidget 
              className="bg-primary hover:bg-primary/90 text-white py-3 px-6 text-lg group"
              size="lg"
            >
              <span className="flex items-center">
                Get Your Free AI Strategy Session
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </BookingWidget>
          </div>
        )}
        
        <div className="rounded-xl overflow-hidden shadow-2xl border border-foreground/10">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
          <p className="text-base md:text-lg text-foreground/80 mb-4">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default VideoSalesLetter;
