
import React from 'react';

const ServiceSlideshow = () => {
  const niches = [
    {
      emoji: '💆',
      title: 'Med Spa Clinics',
    },
    {
      emoji: '🍽',
      title: 'Restaurants',
    },
    {
      emoji: '☀️',
      title: 'Solar Companies',
    },
    {
      emoji: '🏠',
      title: 'Home Service Businesses',
    }
  ];

  return (
    <div className="w-full h-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {niches.map((niche, index) => (
          <div 
            key={index}
            className="relative aspect-square flex flex-col items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-background/90 to-background/60 border border-primary/20 backdrop-blur-sm p-4 hover:border-primary/40 transition-all duration-300"
          >
            <div className="text-4xl mb-3">{niche.emoji}</div>
            <h3 className="text-base font-semibold text-primary text-center">{niche.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSlideshow;
