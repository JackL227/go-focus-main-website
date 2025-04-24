
import React, { useRef, useEffect } from 'react';
import { Bot, Workflow, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import BookingWidget from './BookingWidget';

const steps = [
  {
    id: 1,
    title: "We Build Your AI Agent",
    description: "Voice, text & chat-based — fully customized to your offer. Our AI agents learn your business, offers, and pricing to handle inquiries with precision.",
    icon: Bot,
    delay: 0
  },
  {
    id: 2,
    title: "We Handle the Automation",
    description: "From DMs, emails, and website forms to reactivating old leads. Our seamless integration means leads are engaged 24/7 without falling through the cracks.",
    icon: Workflow,
    delay: 200
  },
  {
    id: 3,
    title: "You Get Qualified Calls & Sales",
    description: "You only talk to pre-qualified people ready to buy. Focus your energy on closing deals, not chasing leads or answering basic questions.",
    icon: Calendar,
    delay: 400
  }
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    stepRefs.current.forEach(step => {
      if (step) observer.observe(step);
    });

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      stepRefs.current.forEach(step => {
        if (step) observer.unobserve(step);
      });
    };
  }, []);

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50"></div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00E676]/3 rounded-full blur-3xl animate-pulse-soft"></div>
      
      <div ref={sectionRef} className="container-custom relative z-10 opacity-0 transition-opacity duration-700">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We transform your lead generation and sales process with AI automation,
            saving you time and increasing your revenue.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              ref={el => stepRefs.current[index] = el}
              className={cn(
                "relative backdrop-blur-md p-8 rounded-xl opacity-0 transition-all duration-500",
                "hover:translate-y-[-5px]"
              )}
              style={{ 
                transitionDelay: `${step.delay}ms`,
                background: "rgba(12, 20, 35, 0.65)", 
                borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                borderRight: "1px solid rgba(0, 0, 0, 0.2)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05)"
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-xl"></div>
              </div>
              
              <div className="feature-icon-wrapper mb-6 p-4 bg-gradient-to-br from-background/80 to-background/30 rounded-xl backdrop-blur-sm border border-foreground/5 shadow-xl">
                <step.icon size={28} className="text-primary animate-pulse-soft" />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                {step.title}
              </h3>
              <p className="text-foreground/80">{step.description}</p>
              
              <div className="mt-6 flex items-center">
                <span className="text-3xl font-bold text-primary/30">{step.id}</span>
                <div className="ml-4 h-1 flex-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full"></div>
              </div>
              
              {/* Connection line to next step */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute h-1 w-16 bg-gradient-to-r from-primary/30 to-transparent top-1/2 -right-16 z-0">
                  <div className="absolute w-3 h-3 rounded-full bg-primary/50 right-0 -mt-1 animate-pulse-soft"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to Transform Your Lead Generation?</h3>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
            Book your free discovery call today and see how our AI agents can automate your sales process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookingWidget 
              variant="default"
              className="bg-primary hover:bg-primary/90 text-background group shadow-lg shadow-primary/20 animate-shadow-pulse"
            >
              Schedule Your Demo
            </BookingWidget>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
