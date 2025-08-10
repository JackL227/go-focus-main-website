
import React from 'react';
import { Button } from './ui/button';

const ServiceSlideshow = () => {
  const niches = [
    {
      emoji: '💆',
      title: 'Med Spa Clinics',
      description: 'Automate bookings, follow-ups, and client reminders while answering inquiries 24/7, helping you fill your calendar and increase repeat visits.',
      stats: [
        '74% increase in booking conversions',
        '3.2x more repeat clients retained',
        '120+ hours saved monthly'
      ],
      cta: 'View Med Spa Solution →'
    },
    {
      emoji: '🍽',
      title: 'Restaurants',
      description: 'Handle all inbound calls for reservations, orders, and FAQs with human-like AI — reducing missed calls and boosting revenue during peak hours.',
      stats: [
        '92% reduction in missed calls',
        '2.8x more orders handled without staff involvement',
        '150 hours saved monthly'
      ],
      cta: 'View Restaurant Solution →'
    },
    {
      emoji: '☀️',
      title: 'Solar Companies',
      description: 'Turn your old leads into fresh appointments with AI agents that follow up across SMS, voice, and email — no ad spend needed.',
      stats: [
        '87% increase in appointment setting from existing leads',
        '2.4x faster lead response time',
        '200+ hours saved monthly'
      ],
      cta: 'View Solar Solution →'
    },
    {
      emoji: '🏠',
      title: 'Home Service Businesses',
      description: 'Book jobs, send quotes, and handle customer questions instantly so you never miss a lead — whether you\'re on-site or off-hours.',
      stats: [
        '81% increase in booked jobs',
        '3.1x more follow-ups completed without staff',
        '140 hours saved monthly'
      ],
      cta: 'View Home Services Solution →'
    }
  ];

  return (
    <div className="w-full h-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {niches.map((niche, index) => (
          <div 
            key={index}
            className="relative aspect-square flex flex-col justify-center items-center rounded-xl overflow-hidden bg-gradient-to-br from-background/90 to-background/60 border border-primary/20 backdrop-blur-sm p-6 hover:border-primary/40 transition-all duration-300"
          >
            <div className="text-6xl mb-4">{niche.emoji}</div>
            <h3 className="text-lg font-semibold text-primary text-center">{niche.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSlideshow;
