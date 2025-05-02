
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';
import { Script } from '@/components/ui/script';

const RealEstateFunnel = () => {
  useEffect(() => {
    console.log("Real Estate funnel page view tracked");
    
    // Fire custom event for real estate funnel view
    if (window.fbq) {
      window.fbq('trackCustom', 'RealEstateFunnelView');
    }
  }, []);
  
  const benefits = [
    "24/7 AI lead qualification system to screen property inquiries automatically",
    "Automated appointment scheduling with only serious, pre-qualified buyers",
    "Smart follow-up that nurtures leads until they're ready to view properties",
    "Property detail chatbots that answer questions instantly when prospects browse listings",
    "Client-property matching system that recommends ideal properties based on preferences",
    "Performance dashboard tracking leads, conversions, and time saved for your agents"
  ];

  const metrics = [
    {
      title: "Leads Captured",
      value: "472",
      description: "New qualified leads in last 30 days"
    },
    {
      title: "Calls Booked",
      value: "126",
      description: "Viewing appointments scheduled"
    },
    {
      title: "Avg. Response Time",
      value: "1.6 min",
      description: "Average AI response time to inquiries"
    },
    {
      title: "Conversion Rate",
      value: "27.3%",
      description: "Lead-to-appointment conversion"
    }
  ];
  
  return (
    <>
      {/* Script to track funnel-specific custom events */}
      <Script>
        {`
        if (window.fbq) {
          fbq('trackCustom', 'RealEstateFunnelPageView');
        }
        `}
      </Script>
      
      <FunnelLayout
        niche="trading" // Using trading theme colors
        headline="Automate Your Real Estate Lead Flow While Your Agents Focus on Closing Deals"
        subheadline="Our AI system captures, qualifies, and nurtures real estate leads 24/7, booking appointments only with serious buyers ready to make decisions."
        benefits={benefits}
        metrics={metrics}
        guaranteeText="If our AI agent doesn't book at least 30 qualified property viewings within 90 days of implementation, we'll refund your entire investment — that's our guarantee to your agency."
        urgencyText="Limited availability: We onboard just 5 real estate agencies per month to ensure optimal results."
        ctaText="Book Your Real Estate AI Strategy Call"
        hasCountdown={true}
        showSocialProof={true}
        nicheFunnel="realestate"
        vslSection={
          <VideoSalesLetter
            videoId="H3qWMyj8Eq0" // Using the same video ID, can be updated later
            title="Automate Your Real Estate Lead Flow While Your Agents Focus on Closing Deals"
            subtitle="Our AI system captures, qualifies, and nurtures real estate leads 24/7, booking appointments only with serious buyers ready to make decisions."
          />
        }
      />
    </>
  );
};

export default RealEstateFunnel;
