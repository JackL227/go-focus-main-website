
import React, { useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "24/7 Lead Conversion",
    description: "Our AI agents work around the clock to engage leads and book calls while you sleep",
    color: "from-primary/20 to-transparent"
  },
  {
    title: "Smart Lead Qualification",
    description: "Automatically qualify prospects through intelligent AI conversations",
    color: "from-blue-500/20 to-transparent"
  },
  {
    title: "Automated Booking",
    description: "Seamlessly schedule qualified prospects into your calendar",
    color: "from-green-500/20 to-transparent"
  }
];

export const ServiceSlideshow = () => {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (!api) return;

    // Auto-scroll every 4 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      clearInterval(interval);
      api.off('select');
    };
  }, [api]);

  return (
    <div className="w-full p-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative max-w-xl mx-auto"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="md:basis-full">
              <div className={`h-full p-8 rounded-xl bg-gradient-to-r ${slide.color} backdrop-blur-sm border border-foreground/10`}>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {slide.title}
                  </h3>
                  <p className="text-foreground/80">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current 
                  ? "bg-primary w-6" 
                  : "bg-foreground/20"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default ServiceSlideshow;
