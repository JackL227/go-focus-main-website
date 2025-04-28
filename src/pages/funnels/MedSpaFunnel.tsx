import React from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';

const MedSpaFunnel = () => {
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
      ctaText="See How It Works"
      hasCountdown={true}
      showSocialProof={true}
    />
  );
};

export default MedSpaFunnel;
