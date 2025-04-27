
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';

const RealEstateFunnel = () => {
  // For Meta Pixel tracking
  useEffect(() => {
    // Meta Pixel tracking code would go here
    console.log("Real Estate funnel page view tracked");
  }, []);

  const testimonials = [
    {
      quote: "Our real estate agency implemented Go Focus AI and saw a 218% increase in buyer leads in just 60 days. The AI qualification saved our agents countless hours of screening.",
      author: "Michael Thompson",
      position: "Broker",
      company: "Elite Property Group",
      rating: 5
    },
    {
      quote: "The AI agent automatically nurtures our seller leads until they're ready to list. We've closed 14 additional properties in Q1 alone thanks to leads we would have otherwise lost.",
      author: "Sarah Johnson",
      position: "Managing Partner",
      company: "Johnson & Partners Real Estate",
      rating: 5
    },
    {
      quote: "As a smaller agency competing with big names, Go Focus AI leveled the playing field. It handles all our lead screening and qualification 24/7, and our agents only talk to serious buyers and sellers.",
      author: "Robert Chen",
      position: "Owner",
      company: "Coastal Properties",
      rating: 5
    }
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
      niche="trading" // We'll use trading color scheme for now
      headline="AI Agents That Convert Real Estate Leads Into Clients — While You Sleep"
      subheadline="Our AI system attracts, nurtures, and qualifies your real estate leads 24/7, so your agents only talk to ready-to-move buyers and sellers."
      benefits={[
        "24/7 lead qualification for both buyer and seller leads",
        "Automatic follow-up system that nurtures leads for months",
        "Detailed property requirement collection from buyers",
        "Seller lead qualification and property valuation scheduling",
        "Direct calendar integration for high-intent viewings and valuations"
      ]}
      testimonials={testimonials}
      metrics={metrics}
      guaranteeText="We guarantee to double your qualified real estate leads in 90 days — or we'll continue working for free until we do."
      urgencyText="Limited to 3 agencies per city to avoid market saturation"
      ctaText="Book Your Strategy Call"
      hasCountdown={true}
      showSocialProof={true}
      vslSection={
        <VideoSalesLetter
          videoId="your-real-estate-vsl-id"
          title="How AI Automation Is Transforming Real Estate Lead Generation"
          subtitle="Watch how our AI system can transform your real estate business in just 3 minutes"
        />
      }
    />
  );
};

export default RealEstateFunnel;
