
import React from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';

const MedSpaFunnel = () => {
  const benefits = [
    "AI receptionist handles DMs, form replies, web chat",
    "Answers pricing objections + package information automatically",
    "Auto-booking into your existing calendar",
    "Reactivation campaigns for cold leads",
    "Retention/upsell follow-through"
  ];

  const metrics = [
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
  ];
  
  const realtimeStats = [
    {
      title: "Monthly Consultations",
      value: 30,
      icon: "calendar",
      description: "New qualified patient appointments"
    },
    {
      title: "Revenue Increase",
      value: 20000,
      icon: "dollar-sign",
      description: "Average monthly revenue growth"
    },
    {
      title: "Response Time",
      value: 1,
      icon: "clock",
      description: "Second or less to customer questions"
    }
  ];
  
  return (
    <FunnelLayout
      niche="medspa"
      headline="Book 30 New Patients in 90 Days — Without Chasing DMs or Answering FAQs."
      subheadline="We install an AI assistant that replies, qualifies, and fills your appointment calendar on autopilot."
      benefits={benefits}
      metrics={metrics}
      realtimeStats={realtimeStats}
      guaranteeText="If we don't deliver 30 booked consults in 90 days, you don't pay."
      urgencyText="🚫 Only 1 Med Spa per city onboarded for exclusivity"
      ctaText="See How It Works"
      hasCountdown={true}
      showSocialProof={true}
      vslSection={
        <VideoSalesLetter
          videoId="medspa-vsl-id"
          title="Book 30 New Patients in 90 Days — Without Chasing DMs or Answering FAQs."
          subtitle="We install an AI assistant that replies, qualifies, and fills your appointment calendar on autopilot."
        />
      }
    />
  );
};

export default MedSpaFunnel;
