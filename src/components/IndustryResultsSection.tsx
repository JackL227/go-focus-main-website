
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, BookOpen, Building, ArrowUpRight, Utensils, ShoppingBag, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';

const industries = [
  {
    id: "trading-mentors",
    title: "Trading Mentors",
    icon: Lightbulb,
    description: "Deliver personalized strategies to clients, answer their questions 24/7, and scale your trading mentorship business.",
    results: ["79% increase in client retention", "2.3x more leads converted", "165 hours saved monthly"],
    color: "from-blue-600/30 via-blue-400/20 to-blue-600/30",
    link: "/trading"
  },
  {
    id: "course-creators",
    title: "Course Creators & Info Products",
    icon: BookOpen,
    description: "Increase course completion rates, answer student questions 24/7, and improve satisfaction and results.",
    results: ["68% improvement in completion", "98% question resolution rate", "4.1x more testimonials"],
    color: "from-pink-600/30 via-pink-400/20 to-pink-600/30",
    link: "/course-creator"
  }
];

const additionalIndustries = [
  {
    name: "Medical Clients",
    icon: Stethoscope,
  },
  {
    name: "Ecommerce",
    icon: ShoppingBag,
  },
  {
    name: "Restaurants",
    icon: Utensils,
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
        
        <div className="grid md:grid-cols-2 gap-8 mx-auto max-w-4xl">
          {industries.map((industry, index) => (
            <div 
              key={industry.id} 
              ref={el => cardRefs.current[index] = el}
              className="opacity-0 transition-all duration-500 h-full"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card className={cn(
                "h-full border-0 bg-gradient-to-b flex flex-col", 
                industry.color,
                industry.id === "course-creators" ? "border-2 border-primary/30" : "",
                "hover-lift overflow-hidden"
              )}>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {React.createElement(industry.icon, { className: "text-primary", size: 24 })}
                  </div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {industry.title}
                    {industry.id === "course-creators" && (
                      <span className="bg-primary/20 text-primary text-xs px-2.5 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-foreground/80 mb-6">{industry.description}</p>
                  <div className="space-y-4 flex-grow">
                    {industry.results.map((result, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="mr-3 mt-1 text-primary">
                          <ArrowUpRight size={16} />
                        </div>
                        <p className="text-sm text-foreground/90">{result}</p>
                      </div>
                    ))}
                  </div>
                  
                  {industry.link && (
                    <Link 
                      to={industry.link} 
                      className="mt-4 inline-flex items-center text-primary hover:underline"
                    >
                      View {industry.title.split(' ')[0]} Solution
                      <ArrowUpRight size={16} className="ml-1" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Additional industries section */}
        <div 
          className="mt-16 text-center opacity-0 animate-fade-in"
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-8">
            We also serve clients in these industries
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
            {additionalIndustries.map((industry, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center p-4 bg-background/10 backdrop-blur-sm border border-foreground/10 rounded-xl hover-lift"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  {React.createElement(industry.icon, { className: "text-primary", size: 20 })}
                </div>
                <span className="font-medium">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryResultsSection;
