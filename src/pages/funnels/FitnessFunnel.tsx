
import React from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';

const FitnessFunnel = () => {
  return (
    <FunnelLayout
      niche="fitness"
      headline="Turn Your Followers Into High-Ticket Clients — 24/7 Automated Qualification."
      subheadline="Let AI handle the DMs, comments, and inquiries while you focus on creating content and training clients. Our system converts your audience into paying customers around the clock."
      benefits={[
        "Instantly engage with followers who comment or DM about your programs",
        "Automatically sort casual fans from serious clients ready to invest in coaching",
        "Integrate with your calendar, payment system, and CRM for a seamless client journey"
      ]}
      testimonials={[
        {
          quote: "I went from 2 clients per month to 11 booked calls weekly. The AI handles all the initial questions and only books calls with people ready to invest in my 12-week program.",
          author: "Chris Davis",
          position: "Fitness Coach",
          company: "Transform With Chris"
        },
        {
          quote: "My TikTok blew up overnight and I was drowning in DMs. The Go Focus AI took over and converted those views into actual paid clients without me lifting a finger.",
          author: "Sophia Martinez",
          position: "Online Fitness Influencer",
          company: "Fit With Sophia"
        }
      ]}
      metrics={[
        {
          title: "DM Response Rate",
          value: "100%",
          description: "Never miss an opportunity in your comments or messages"
        },
        {
          title: "Follower to Client Conversion",
          value: "3.5x Higher",
          description: "Turn more viewers into paying program participants"
        },
        {
          title: "Personal Freedom",
          value: "20+ Hours/Week",
          description: "Create more content while the AI handles sales"
        }
      ]}
      guaranteeText="We understand the fitness industry. Our AI is specifically trained to speak your language, understand common objections, and convert followers into high-value clients. We guarantee at least 15 qualified coaching application calls within 60 days or we'll continue optimizing at no cost."
      urgencyText="Currently accepting only 5 fitness influencers this month. Secure your AI agent today."
    />
  );
};

export default FitnessFunnel;
