
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const NAMES = [
  'John Doe enrolled', 'Samantha booked a call', 'Mike joined mentorship', 
  'Sarah signed up', 'David enrolled', 'Emily booked a demo',
];

const generateLead = (id: number) => ({
  id,
  x: -200 - Math.random() * 300, // Start left
  y: Math.random() * 400 + 100,  // Random vertical pos
  scale: 1, 
  status: 'lead' as 'lead' | 'converted', // Explicitly type the status
  name: NAMES[Math.floor(Math.random() * NAMES.length)],
});

const HeroAnimation = () => {
  const isMobile = useIsMobile();
  const [leads, setLeads] = useState(() => Array.from({ length: 10 }, (_, i) => generateLead(i)));

  useEffect(() => {
    const interval = setInterval(() => {
      setLeads(prev => [...prev, generateLead(prev.length)]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLeads(prev =>
        prev.map(lead => {
          // Adjust position based on screen size
          const centerX = window.innerWidth / (isMobile ? 1.5 : 2);
          
          if (lead.status === 'lead' && lead.x >= centerX - 50) {
            return { ...lead, status: 'converted', x: centerX + 20 };
          }
          if (lead.status === 'lead') {
            return { ...lead, x: lead.x + 4, scale: Math.max(0.5, lead.scale - 0.004) };
          }
          if (lead.status === 'converted') {
            return { ...lead, x: lead.x + 3 };
          }
          return lead;
        }).filter(lead => lead.x < window.innerWidth + 200)
      );
    }, 30);
    return () => clearInterval(timer);
  }, [isMobile]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-background overflow-hidden flex items-center justify-center">
      {/* Background gradient glow */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-primary/30 to-accent/20 blur-[150px] rounded-full z-0"></div>

      {/* Middle Circle Logo */}
      <div className="absolute w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 flex items-center justify-center z-10">
        <img src="/lovable-uploads/gofocus-logo.png" alt="GoFocus AI Logo" className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] object-contain" />
      </div>

      {/* Flying Leads */}
      {leads.map(lead => (
        <div
          key={lead.id}
          className={`absolute transition-all duration-75 ease-linear text-xs md:text-sm font-medium 
            ${lead.status === 'lead' 
              ? 'bg-primary text-background' 
              : 'bg-accent text-background'}
            px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg`}
          style={{
            transform: `translate(${lead.x}px, ${lead.y}px) scale(${lead.scale})`,
            whiteSpace: 'nowrap',
            zIndex: lead.status === 'lead' ? 5 : 20,
          }}
        >
          {lead.status === 'lead' ? 'Lead' : lead.name}
        </div>
      ))}
    </div>
  );
};

export default HeroAnimation;
