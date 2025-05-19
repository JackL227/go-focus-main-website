
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';
import BookingWidget from "@/components/BookingWidget";
import { ArrowRight } from "lucide-react";
import { trackCustomEvent } from '@/utils/metaPixel';

const RealEstateFunnel = () => {
  useEffect(() => {
    console.log("Real Estate funnel page view tracked");
    trackCustomEvent('RealEstateFunnelView');
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
  
  const ctaText = "Get My Personalised Demo";

  // Top buttons - single demo button now
  const TopButtons = () => (
    <div className="mt-6 mb-8 flex justify-center">
      <BookingWidget className="text-white group text-base md:text-lg px-5 md:px-7 py-3 bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0 text-sm">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );

  // Benefits - Single demo button
  const BenefitsButton = () => (
    <div className="mt-8 flex justify-center">
      <BookingWidget className="text-white group text-base md:text-lg px-5 md:px-7 py-3 bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0 text-sm">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );

  // Final CTA - single button now
  const FinalButtons = () => (
    <div className="max-w-lg w-full flex justify-center">
      <BookingWidget className="text-white group text-base md:text-lg px-5 md:px-7 py-3 bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0 text-sm">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );
  
  return (
    <FunnelLayout
      niche="trading" // Using trading theme colors
      headline="Automate Your Real Estate Lead Flow While Your Agents Focus on Closing Deals"
      subheadline="Our AI system captures, qualifies, and nurtures real estate leads 24/7, booking appointments only with serious buyers ready to make decisions."
      benefits={benefits}
      metrics={metrics}
      guaranteeText="If our AI agent doesn't book at least 30 qualified property viewings within 90 days of implementation, we'll refund your entire investment — that's our guarantee to your agency."
      urgencyText="Limited availability: We onboard just 5 real estate agencies per month to ensure optimal results."
      ctaText={ctaText}
      hasCountdown={true}
      showSocialProof={true}
      nicheFunnel="realestate"
      topCTA={<TopButtons />}
      benefitsCTA={<BenefitsButton />}
      finalCTA={<FinalButtons />}
      vslSection={
        <VideoSalesLetter
          videoId="H3qWMyj8Eq0" // Using the same video ID, can be updated later
          title="Automate Your Real Estate Lead Flow While Your Agents Focus on Closing Deals"
          subtitle="Our AI system captures, qualifies, and nurtures real estate leads 24/7, booking appointments only with serious buyers ready to make decisions."
        />
      }
    />
  );
};

export default RealEstateFunnel;
