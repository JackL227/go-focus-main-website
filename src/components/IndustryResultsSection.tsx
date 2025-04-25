import React, { useRef, useEffect } from 'react';
import { Briefcase, Flower, Dumbbell, Building2, Car, Tooth, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

const industries = [
  {
    id: 1,
    title: "Trading Mentors",
    icon: Briefcase,
    description: "Automate lead qualification and booking for trading courses and mentorship programs.",
    results: [
      "+30 booked consults per month",
      "24/7 DM handling on all platforms",
      "No more wasted time on unqualified leads"
    ],
    color: "from-primary/20 to-primary/5"
  },
  {
    id: 2,
    title: "Med Spas",
    icon: Flower,
    description: "Qualify and book appointments for Botox, fillers, and aesthetic treatments.",
    results: [
      "45% increase in lead-to-appointment rate",
      "Automated follow-ups with personalization",
      "No missed calls during busy hours"
    ],
    color: "from-[#00E676]/20 to-[#00E676]/5"
  },
  {
    id: 3,
    title: "Real Estate Agents",
    icon: Building2,
    description: "Automate client acquisition, property inquiries, and lead nurturing.",
    results: [
      "5x faster client onboarding",
      "Automated intake and property matching",
      "Higher conversion from leads to closings"
    ],
    color: "from-[#FFC107]/20 to-[#FFC107]/5"
  },
  {
    id: 4,
    title: "Fitness Influencers",
    icon: Dumbbell,
    description: "Automate client acquisition, program enrollment, and coaching lead generation.",
    results: [
      "5x faster client onboarding",
      "Automated intake and goal tracking",
      "Higher conversion from followers to paid clients"
    ],
    color: "from-[#9C27B0]/20 to-[#9C27B0]/5"
  },
  {
    id: 5,
    title: "Vehicle Aesthetic Companies",
    icon: Car,
    description: "Automate lead booking for car detailing, ceramic coating, and paint protection services.",
    results: [
      "50% increase in service bookings",
      "Automated package recommendations",
      "Instant quotes and availability checks"
    ],
    color: "from-[#2196F3]/20 to-[#2196F3]/5"
  },
  {
    id: 6,
    title: "Dental Clinics",
    icon: Tooth,
    description: "Streamline patient scheduling, treatment inquiries, and follow-up communications.",
    results: [
      "40% faster patient intake process",
      "Automated insurance verification",
      "Reduced no-show rates through smart reminders"
    ],
    color: "from-[#4CAF50]/20 to-[#4CAF50]/5"
  }
];

const IndustryResultsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      cardRefs.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="results" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#091428] to-[#071020] z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      {/* Background glowing orbs */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#FFC107]/5 rounded-full blur-3xl"></div>
      
      <div ref={sectionRef} className="container-custom relative z-10 opacity-0 transition-opacity duration-700">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Industry-Specific Results
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tailored AI Solutions for Your Industry</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Our AI agents are customized for your specific industry needs, delivering proven results for businesses like yours.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={industry.id} 
              ref={el => cardRefs.current[index] = el}
              className="opacity-0 transition-all duration-500"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card className={cn(
                "h-full border-0 bg-gradient-to-b", 
                industry.color,
                "hover-lift overflow-hidden"
              )}>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <industry.icon className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-xl">{industry.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-6">{industry.description}</p>
                  <div className="space-y-4">
                    {industry.results.map((result, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="mr-3 mt-1 text-primary">
                          <ArrowUpRight size={16} />
                        </div>
                        <p className="text-sm text-foreground/90">{result}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryResultsSection;
