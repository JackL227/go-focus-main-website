import React, { useRef, useEffect, useState } from 'react';
import { Star, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import BookingWidget from './BookingWidget';
import AIAgentDemo from './AIAgentDemo';
import ChannelsSection from './ChannelsSection';
const testimonials = [{
  id: 1,
  name: "Daniel",
  position: "Vehicle Aesthetic Consultant, Carbon Performance",
  content: "The AI agent has transformed my lead management. I'm now booking more consultations without spending hours chasing leads giving me more time to focus on delivering exceptional vehicle aesthetic services.",
  rating: 5
}, {
  id: 2,
  name: "Ethan",
  position: "Trading Mentor",
  company: "Boogienomics",
  content: "Go Focus AI is a game-changer for my trading education business. The AI handles inquiries, filters potential students, and books high-quality calls, allowing me to concentrate on delivering top-tier trading insights.",
  rating: 5
}, {
  id: 3,
  name: "Arik Bouganim",
  position: "Founder",
  company: "Innoveum",
  content: "As an engineering and energy auditing firm our time is critical. The AI agent streamlines our lead qualification process ensuring we only engage with serious clients who are genuinely interested in our services.",
  rating: 5
}];
const SocialProofSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showAgentDemo, setShowAgentDemo] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState<'trading' | 'course'>('trading');
  const maxSlides = Math.ceil(testimonials.length / 2);
  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % maxSlides);
  };
  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + maxSlides) % maxSlides);
  };
  const handleDemoClick = (niche: 'trading' | 'course') => {
    setSelectedNiche(niche);
    setShowAgentDemo(true);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, {
      threshold: 0.1
    });
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
  return <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#071020] to-[#050A14] z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div ref={sectionRef} className="container-custom relative z-10 opacity-0 transition-opacity duration-700">
        <ChannelsSection />
        
        
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="text-[#FFC107]" fill="#FFC107" />)}
            </div>
          </div>
          
          <div className="relative">
            <div className="transition-all duration-500 ease-in-out" style={{
            transform: `translateX(-${activeSlide * 100}%)`,
            display: 'flex'
          }}>
              {[0, 1].map(page => <div key={page} className="w-full flex-shrink-0 grid md:grid-cols-2 gap-6">
                  {testimonials.slice(page * 2, page * 2 + 2).map(testimonial => <div key={testimonial.id} className="glass-card p-6 rounded-xl hover:shadow-lg transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-foreground/70">{testimonial.position}, {testimonial.company}</p>
                        </div>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={16} className="text-[#FFC107]" fill="#FFC107" />)}
                        </div>
                      </div>
                      <p className="text-foreground/80 text-sm">"{testimonial.content}"</p>
                    </div>)}
                </div>)}
            </div>
            
            {maxSlides > 1 && <div className="flex justify-center mt-8 gap-4">
                <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full border-primary/30 text-primary hover:bg-primary/10">
                  <ChevronLeft size={18} />
                </Button>
                <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full border-primary/30 text-primary hover:bg-primary/10">
                  <ChevronRight size={18} />
                </Button>
              </div>}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Launch Your <span className="text-primary">AI Agent</span>
          </h2>
          <p className="text-lg mb-8 text-foreground/80 max-w-2xl mx-auto">
            Start automating your lead qualification and booking process today. 
            Schedule a strategy call to learn how our AI agents can help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <BookingWidget className="bg-primary hover:bg-primary/90 text-background group">
              <span className="flex items-center">
                Book Strategy Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </BookingWidget>
            
            
          </div>
        </div>
      </div>

      {showAgentDemo && <AIAgentDemo onClose={() => setShowAgentDemo(false)} initialNiche={selectedNiche} />}
    </section>;
};
export default SocialProofSection;