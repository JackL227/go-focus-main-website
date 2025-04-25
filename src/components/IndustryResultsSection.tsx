import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ShoppingBag, Building, BookOpen, DumbbellIcon, Car, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  {
    title: "Trading Mentors",
    icon: <Lightbulb className="h-8 w-8" />,
    description: "Deliver personalized strategies to clients, answer their questions 24/7, and scale your trading mentorship business.",
    results: ["79% increase in client retention", "2.3x more leads converted", "165 hours saved monthly"],
    color: "from-blue-600/30 via-blue-400/20 to-blue-600/30"
  },
  {
    title: "Med Spas",
    icon: <ShoppingBag className="h-8 w-8" />,
    description: "Book more appointments, answer patient questions instantly, and grow your med spa business with AI automation.",
    results: ["43% increase in booking rate", "92% client satisfaction", "28 hours saved weekly"],
    color: "from-violet-600/30 via-violet-400/20 to-violet-600/30"
  },
  {
    title: "Fitness Influencers",
    icon: <DumbbellIcon className="h-8 w-8" />,
    description: "Scale your coaching business, answer follower questions instantly, and convert fans into paying clients.",
    results: ["3.7x increase in program signups", "55% less time spent on DMs", "129% growth in revenue"],
    color: "from-emerald-600/30 via-emerald-400/20 to-emerald-600/30"
  },
  {
    title: "Real Estate Agencies",
    icon: <Building className="h-8 w-8" />,
    description: "Capture and nurture more leads, answer property questions instantly, and close deals faster with AI automation.",
    results: ["41% more leads captured", "2.1x faster response time", "19% higher closing rate"],
    color: "from-amber-600/30 via-amber-400/20 to-amber-600/30"
  },
  {
    title: "Course Creators",
    icon: <BookOpen className="h-8 w-8" />,
    description: "Increase course completion rates, answer student questions 24/7, and improve satisfaction and results.",
    results: ["68% improvement in completion", "98% question resolution rate", "4.1x more testimonials"],
    color: "from-pink-600/30 via-pink-400/20 to-pink-600/30"
  },
  {
    title: "Vehicle Aesthetic Companies",
    icon: <Car className="h-8 w-8" />,
    description: "Convert more detailing inquiries, book appointments instantly, and showcase your vehicle transformation services.",
    results: ["57% increase in appointments", "32% higher average order value", "3.5x customer retention"],
    color: "from-cyan-600/30 via-cyan-400/20 to-cyan-600/30"
  },
  {
    title: "Dental Clinics",
    icon: <Stethoscope className="h-8 w-8" />,
    description: "Answer patient questions instantly, reduce no-shows, and fill your appointment calendar with qualified patients.",
    results: ["68% reduction in no-shows", "2.4x increase in new patients", "47% boost in treatment acceptance"],
    color: "from-red-600/30 via-red-400/20 to-red-600/30"
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
