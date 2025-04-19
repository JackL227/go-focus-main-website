
import React from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';

const FitnessFunnel = () => {
  return (
    <FunnelLayout
      niche="fitness"
      headline="From 3K/Month to 20K/Month — Without Posting or Cold DMs."
      subheadline="We install an AI system that attracts, qualifies, and books your perfect coaching clients while you train — or chill."
      benefits={[
        "AI Agent that handles outreach & inbound messages 24/7",
        "Filters leads by budget, goals, and program fit",
        "Books only pre-qualified strategy calls",
        "Done-for-you VSL + messaging flow",
        "Calendar + CRM integration"
      ]}
      testimonials={[
        {
          quote: "Went from chasing leads to 11 booked calls a week — all on autopilot.",
          author: "Coach Kelsey",
          position: "Fitness Influencer",
          company: "Body Transformation Academy"
        },
        {
          quote: "Jumped from $4K to $19K/month in 6 weeks.",
          author: "Coach Ben",
          position: "Online Fitness Coach",
          company: "Elite Fitness Program"
        }
      ]}
      metrics={[
        {
          title: "Monthly Revenue Increase",
          value: "$17K+",
          description: "Average growth within first 90 days"
        },
        {
          title: "Weekly Qualified Calls",
          value: "11+",
          description: "Pre-qualified prospects ready to buy"
        },
        {
          title: "Client Acquisition Cost",
          value: "60% Lower",
          description: "Compared to traditional marketing"
        }
      ]}
      guaranteeText="We guarantee 15 new high-ticket clients in 90 days — or you don't pay."
      urgencyText="🔒 Limited to 3 fitness coaches/month to protect lead pool quality"
      ctaText="Book My Demo Call"
      hasCountdown={true}
      showSocialProof={true}
    />
  );
};

export default FitnessFunnel;
