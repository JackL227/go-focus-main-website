
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';
import { trackCustomEvent } from '@/utils/metaPixel';

const FitnessFunnel = () => {
  useEffect(() => {
    console.log("Fitness funnel page view tracked");
    trackCustomEvent('FitnessFunnelView');
  }, []);
  
  const benefits = [
    "AI Agent that handles outreach & inbound messages 24/7",
    "Filters leads by budget, goals, and program fit",
    "Books only pre-qualified strategy calls",
    "Done-for-you VSL + messaging flow",
    "Calendar + CRM integration",
    "Automated follow-up sequences that keep nurturing leads"
  ];
  
  const metrics = [
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
  ];
  
  return (
    <FunnelLayout
      niche="fitness"
      headline="From 3K/Month to 20K/Month — Without Posting or Cold DMs."
      subheadline="We install an AI system that attracts, qualifies, and books your perfect coaching clients while you train — or chill."
      benefits={benefits}
      metrics={metrics}
      guaranteeText="We guarantee 15 new high-ticket clients in 90 days — or you don't pay."
      urgencyText="🔒 Limited to 3 fitness coaches/month to protect lead pool quality"
      ctaText="Book My Demo Call"
      hasCountdown={true}
      showSocialProof={true}
      vslSection={
        <VideoSalesLetter
          videoId="fitness-vsl-id"
          title="From 3K/Month to 20K/Month — Without Posting or Cold DMs."
          subtitle="We install an AI system that attracts, qualifies, and books your perfect coaching clients while you train — or chill."
        />
      }
    />
  );
};

export default FitnessFunnel;
