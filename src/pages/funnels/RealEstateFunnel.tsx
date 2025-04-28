import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';

const RealEstateFunnel = () => {
  useEffect(() => {
    console.log("Real Estate funnel page view tracked");
  }, []);
  
  const benefits = [
    "24/7 lead qualification for both buyer and seller leads",
    "Automatic follow-up system that nurtures leads for months",
    "Detailed property requirement collection from buyers",
    "Seller lead qualification and property valuation scheduling",
    "Direct calendar integration for high-intent viewings and valuations",
    "AI-powered response to common real estate questions"
  ];
  
  const metrics = [
    {
      title: "Increase in Qualified Leads",
      value: "+162%",
      description: "More qualified buyer and seller leads"
    },
    {
      title: "Agent Time Saved",
      value: "24+ Hours",
      description: "Weekly hours saved on lead qualification"
    },
    {
      title: "Listing Conversion Rate",
      value: "+41%",
      description: "Higher conversion from lead to listing"
    }
  ];

  return (
    <FunnelLayout
      niche="trading"
      headline="AI Agents That Convert Real Estate Leads Into Clients — While You Sleep"
      subheadline="Our AI system attracts, nurtures, and qualifies your real estate leads 24/7, so your agents only talk to ready-to-move buyers and sellers."
      benefits={benefits}
      metrics={metrics}
      guaranteeText="We guarantee to double your qualified real estate leads in 90 days — or we'll continue working for free until we do."
      urgencyText="Limited to 3 agencies per city to avoid market saturation"
      ctaText="Book Your Strategy Call"
      hasCountdown={true}
      showSocialProof={true}
      vslSection={
        <VideoSalesLetter
          videoId="your-real-estate-vsl-id"
          title="AI Agents That Convert Real Estate Leads Into Clients — While You Sleep"
          subtitle="Our AI system attracts, nurtures, and qualifies your real estate leads 24/7, so your agents only talk to ready-to-move buyers and sellers."
        />
      }
    />
  );
};

export default RealEstateFunnel;
