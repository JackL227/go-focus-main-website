
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';
import { ArrowRight } from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import { trackCustomEvent } from '@/utils/metaPixel';
import { useIsMobile } from '@/hooks/use-mobile';

const FitnessFunnel = () => {
  useEffect(() => {
    console.log("Fitness funnel page view tracked");
    trackCustomEvent('FitnessFunnelView');
  }, []);
  
  const isMobile = useIsMobile();
  const ctaText = "Get My Personalised Demo";
  
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
  
  // Top buttons - single demo button now
  const TopButtons = () => (
    <div className="mt-6 mb-8 flex justify-center">
      <BookingWidget className="text-white group bg-purple-600 hover:bg-purple-700 shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );

  // Benefits - Single demo button
  const BenefitsButton = () => (
    <div className="mt-8 flex justify-center">
      <BookingWidget className="text-white group bg-purple-600 hover:bg-purple-700 shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );

  // Final CTA - single button now
  const FinalButtons = () => (
    <div className="max-w-lg w-full flex justify-center">
      <BookingWidget className="text-white group bg-purple-600 hover:bg-purple-700 shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );
  
  return (
    <FunnelLayout
      niche="fitness"
      headline="From 3K/Month to 20K/Month — Without Posting or Cold DMs."
      subheadline="We install an AI system that attracts, qualifies, and books your perfect coaching clients while you train — or chill."
      benefits={benefits}
      metrics={metrics}
      guaranteeText="We guarantee 15 new high-ticket clients in 90 days — or you don't pay."
      urgencyText="🔒 Limited to 3 fitness coaches/month to protect lead pool quality"
      ctaText={ctaText}
      hasCountdown={true}
      showSocialProof={true}
      topCTA={<TopButtons />}
      benefitsCTA={<BenefitsButton />}
      finalCTA={<FinalButtons />}
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
