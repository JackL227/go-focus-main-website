
import React from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';

const TradingFunnel = () => {
  return (
    <FunnelLayout
      niche="trading"
      headline="Booked 87 Sales Calls for Trading Mentors in 30 Days — Without Chasing Leads."
      subheadline="Our AI Sales Agent qualifies and books your ideal students — so you never waste time chasing cold leads again."
      benefits={[
        "Fully installed AI system that handles DMs, inquiries, and lead follow-up",
        "Filters prospects by income, intent, and fit for maximum ROI",
        "Schedules only qualified calls with serious buyers",
        "100% DFY — no tech headaches, no hiring, no burnout"
      ]}
      testimonials={[
        {
          quote: "We installed Go Focus AI and hit 46K in sales in 60 days — up from 6K. It works.",
          author: "Ethan M.",
          position: "Forex Trading Mentor",
          company: "Elite Trading Academy"
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
          title: "Qualified Leads Generated",
          value: "87+",
          description: "New potential clients every month"
        },
        {
          title: "Sales Conversion Rate",
          value: "35% Higher",
          description: "Than traditional lead qualification methods"
        },
        {
          title: "Weekly Hours Saved",
          value: "15+ Hours",
          description: "Time back to focus on your existing clients"
        }
      ]}
      guaranteeText="We guarantee 30 qualified mentorship leads in 90 days — or we work for free until you do."
      urgencyText="⛔ Only 5 mentor programs onboarded/month to avoid offer saturation"
      ctaText="Book My Strategy Call"
      hasCountdown={true}
      showSocialProof={true}
    />
  );
};

export default TradingFunnel;
