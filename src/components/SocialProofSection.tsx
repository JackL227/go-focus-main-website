
import React, { useRef, useEffect, useState } from 'react';
import { Star, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const clientLogos = [
  { name: "Client 1", initial: "A" },
  { name: "Client 2", initial: "B" },
  { name: "Client 3", initial: "C" },
  { name: "Client 4", initial: "D" },
  { name: "Client 5", initial: "E" }
];

const testimonials = [
  {
    id: 1,
    name: "Alex Smith",
    position: "Trading Mentor",
    company: "Forex Masters",
    content: "Go Focus AI completely transformed how I handle leads. My AI agent qualifies prospects 24/7, and I'm now booking 30+ high-quality calls monthly without lifting a finger.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Owner",
    company: "Radiance Med Spa",
    content: "Since implementing our AI agent, we've seen a 45% increase in booking rate. No more missed calls or delayed responses—every lead gets instant attention even after hours.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Founder",
    company: "Prestige Auto Wraps",
    content: "My customers get instant quotes and scheduling even when we're closed. The AI handles basic questions and collects information so when I talk to them, they're ready to book.",
    rating: 5
  },
  {
    id: 4,
    name: "Jessica Williams",
    position: "CEO",
    company: "Investment Academy",
    content: "The ROI has been incredible. Our AI agent has quadrupled our consultation bookings while reducing the time my team spends on unqualified leads.",
    rating: 5
  }
];

const SocialProofSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const maxSlides = Math.ceil(testimonials.length / 2);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#071020] to-[#050A14] z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div ref={sectionRef} className="container-custom relative z-10 opacity-0 transition-opacity duration-700">
        {/* Logos Section */}
        <div className="mb-16">
          <h3 className="text-center text-lg text-foreground/60 mb-8">Trusted by Leading Businesses</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {clientLogos.map((logo, index) => (
              <div 
                key={index} 
                className="w-16 h-16 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center font-bold text-xl text-primary"
                title={logo.name}
              >
                {logo.initial}
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-[#FFC107]" fill="#FFC107" />
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div 
              className="transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeSlide * 100}%)`,
                display: 'flex'
              }}
            >
              {[0, 1].map((page) => (
                <div key={page} className="w-full flex-shrink-0 grid md:grid-cols-2 gap-6">
                  {testimonials.slice(page * 2, page * 2 + 2).map((testimonial) => (
                    <div 
                      key={testimonial.id} 
                      className="glass-card p-6 rounded-xl hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-foreground/70">{testimonial.position}, {testimonial.company}</p>
                        </div>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={16} className="text-[#FFC107]" fill="#FFC107" />
                          ))}
                        </div>
                      </div>
                      <p className="text-foreground/80 text-sm">"{testimonial.content}"</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {maxSlides > 1 && (
              <div className="flex justify-center mt-8 gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full border-primary/30 text-primary hover:bg-primary/10"
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={nextSlide}
                  className="rounded-full border-primary/30 text-primary hover:bg-primary/10"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Final CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Launch Your <span className="text-primary">AI Agent</span>
          </h2>
          <p className="text-lg mb-8 text-foreground/80 max-w-2xl mx-auto">
            Start automating your lead qualification and booking process today. 
            Schedule a strategy call to learn how our AI agents can help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-background group">
              Book Strategy Call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/60 text-primary hover:bg-primary/10">
              See AI Agent in Action
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
