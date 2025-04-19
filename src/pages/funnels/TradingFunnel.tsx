
import React from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';

const TradingFunnel = () => {
  return (
    <FunnelLayout
      niche="trading"
      headline="AI Closers That Book Your Trading Clients While You Sleep."
      subheadline="Never miss another DM, comment, or inbound lead again — our AI agent qualifies, books, and closes them 24/7 so you can focus on coaching winners."
      benefits={[
        "Instantly respond to every lead, even while you sleep or working with existing clients",
        "AI filters the tire-kickers so you only speak with qualified buyers ready to invest",
        "Plug into your existing calendar and booking system seamlessly with zero tech hassle"
      ]}
      testimonials={[
        {
          quote: "Closed $20k in 2 days with zero outreach. The AI handled all the initial conversations and only booked calls with people ready to commit.",
          author: "Alex Morgan",
          position: "Forex Trading Coach",
          company: "Morgan Trading Academy"
        },
        {
          quote: "My AI agent handles over 300 inquiries per week and filters out time-wasters. I've doubled my high-ticket clients while working fewer hours.",
          author: "Michael Chen",
          position: "Options Trading Mentor",
          company: "Elite Traders Group"
        }
      ]}
      metrics={[
        {
          title: "Lead Response Time",
          value: "Under 1 Second",
          description: "No more lost opportunities due to delayed responses"
        },
        {
          title: "Coaching Client Conversion",
          value: "35% Increase",
          description: "More qualified prospects turning into paying clients"
        },
        {
          title: "Weekly Hours Saved",
          value: "15+ Hours",
          description: "Spend more time with premium clients and less on qualifying"
        }
      ]}
      guaranteeText="We're so confident in our AI agents that we guarantee results. If our AI doesn't book at least 15 qualified prospects in your first 60 days, we'll continue optimizing your agent for free until we hit that number."
      urgencyText="We're only onboarding 5 trading mentors this month. Lock in your spot now."
    />
  );
};

export default TradingFunnel;
