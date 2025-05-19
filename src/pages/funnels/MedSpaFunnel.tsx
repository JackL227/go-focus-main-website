
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import { ArrowRight } from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import { trackCustomEvent } from '@/utils/metaPixel';
import { useIsMobile } from '@/hooks/use-mobile';

const MedSpaFunnel = () => {
  useEffect(() => {
    console.log("MedSpa funnel page view tracked");
    trackCustomEvent('MedSpaFunnelView');
  }, []);

  const isMobile = useIsMobile();
  const ctaText = "Get My Personalised Demo";
  
  // Top buttons - single demo button now
  const TopButtons = () => (
    <div className="mt-6 mb-8 flex justify-center">
      <BookingWidget className="text-white group bg-teal-600 hover:bg-teal-700 shadow-[0_0_20px_rgba(20,184,166,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );

  // Benefits - Single demo button
  const BenefitsButton = () => (
    <div className="mt-8 flex justify-center">
      <BookingWidget className="text-white group bg-teal-600 hover:bg-teal-700 shadow-[0_0_20px_rgba(20,184,166,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );

  // Final CTA - single button now
  const FinalButtons = () => (
    <div className="max-w-lg w-full flex justify-center">
      <BookingWidget className="text-white group bg-teal-600 hover:bg-teal-700 shadow-[0_0_20px_rgba(20,184,166,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );
  
  return (
    <FunnelLayout
      niche="medspa"
      headline="Book 30 New Patients in 90 Days — Without Chasing DMs or Answering FAQs."
      subheadline="We install an AI assistant that replies, qualifies, and fills your appointment calendar on autopilot."
      benefits={[
        "AI receptionist handles DMs, form replies, web chat",
        "Answers pricing objections + package information automatically",
        "Auto-booking into your existing calendar",
        "Reactivation campaigns for cold leads",
        "Retention/upsell follow-through"
      ]}
      metrics={[
        {
          title: "Monthly Consultations",
          value: "30+",
          description: "New qualified patient appointments"
        },
        {
          title: "Revenue Increase",
          value: "$20K+",
          description: "Average monthly revenue growth"
        },
        {
          title: "Response Time",
          value: "< 1 Second",
          description: "Immediate answers to customer questions"
        }
      ]}
      guaranteeText="If we don't deliver 30 booked consults in 90 days, you don't pay."
      urgencyText="🚫 Only 1 Med Spa per city onboarded for exclusivity"
      ctaText={ctaText}
      hasCountdown={true}
      showSocialProof={true}
      topCTA={<TopButtons />}
      benefitsCTA={<BenefitsButton />}
      finalCTA={<FinalButtons />}
    />
  );
};

export default MedSpaFunnel;
