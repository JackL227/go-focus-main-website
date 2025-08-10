import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Utensils, Sun, Home, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  {
    id: "med-spa",
    title: "Med Spa Clinics",
    emoji: "💆",
    icon: Sparkles,
    description: "Automate bookings, follow-ups, and client reminders while answering inquiries 24/7, helping you fill your calendar and increase repeat visits.",
    results: ["74% increase in booking conversions", "3.2x more repeat clients retained", "120+ hours saved monthly"],
    color: "from-purple-600/30 via-purple-400/20 to-purple-600/30",
    cta: "View Med Spa Solution →"
  },
  {
    id: "restaurants",
    title: "Restaurants",
    emoji: "🍽",
    icon: Utensils,
    description: "Handle all inbound calls for reservations, orders, and FAQs with human-like AI — reducing missed calls and boosting revenue during peak hours.",
    results: ["92% reduction in missed calls", "2.8x more orders handled without staff involvement", "150 hours saved monthly"],
    color: "from-orange-600/30 via-orange-400/20 to-orange-600/30",
    cta: "View Restaurant Solution →"
  },
  {
    id: "solar",
    title: "Solar Companies",
    emoji: "☀️",
    icon: Sun,
    description: "Turn your old leads into fresh appointments with AI agents that follow up across SMS, voice, and email — no ad spend needed.",
    results: ["87% increase in appointment setting from existing leads", "2.4x faster lead response time", "200+ hours saved monthly"],
    color: "from-yellow-600/30 via-yellow-400/20 to-yellow-600/30",
    cta: "View Solar Solution →"
  },
  {
    id: "home-services",
    title: "Home Service Businesses",
    emoji: "🏠",
    icon: Home,
    description: "Book jobs, send quotes, and handle customer questions instantly so you never miss a lead — whether you're on-site or off-hours.",
    results: ["81% increase in booked jobs", "3.1x more follow-ups completed without staff", "140 hours saved monthly"],
    color: "from-green-600/30 via-green-400/20 to-green-600/30",
    cta: "View Home Services Solution →"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto max-w-5xl">
          {industries.map((industry, index) => (
            <div 
              key={industry.id} 
              ref={el => cardRefs.current[index] = el}
              className="opacity-0 transition-all duration-500"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className={cn(
                "h-full aspect-square border-0 bg-gradient-to-b flex flex-col", 
                industry.color,
                "hover-lift overflow-hidden"
              )}>
                <CardHeader className="pb-3">
                  <div className="text-4xl mb-3">{industry.emoji}</div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {industry.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-foreground/80 mb-4 text-sm leading-relaxed">{industry.description}</p>
                  <div className="space-y-2 flex-grow mb-4">
                    {industry.results.map((result, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="mr-2 mt-1 text-primary">
                          <ArrowUpRight size={14} />
                        </div>
                        <p className="text-xs text-foreground/90 font-medium">{result}</p>
                      </div>
                    ))}
                  </div>
                  
                  <button className="mt-auto text-sm text-primary hover:underline text-left">
                    {industry.cta}
                  </button>
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