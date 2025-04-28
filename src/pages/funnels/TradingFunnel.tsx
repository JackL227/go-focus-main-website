
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';

const TradingFunnel = () => {
  // For Meta Pixel tracking
  useEffect(() => {
    // Meta Pixel tracking code would go here
    console.log("Trading funnel page view tracked");
  }, []);

  const benefits = [
    "Fully installed AI system that handles DMs, inquiries, and lead follow-up",
    "Filters prospects by income, intent, and fit for maximum ROI",
    "Schedules only qualified calls with serious buyers",
    "100% DFY — no tech headaches, no hiring, no burnout",
    "Automated follow-up sequences that convert cold leads",
    "Detailed analytics dashboard to track performance"
  ];

  const metrics = [
    {
      title: "Qualified Leads Generated",
      value: "87+",
      description: "New potential clients every month"
    },
    {
      title: "Sales Conversion Rate",
      value: "35% Higher",
      description: "Than traditional lead qualification methods"
    },
    {
      title: "Weekly Hours Saved",
      value: "15+ Hours",
      description: "Time back to focus on your existing clients"
    }
  ];

  return (
    <FunnelLayout
      niche="trading"
      headline="Booked 87 Sales Calls for Trading Mentors in 30 Days — Without Chasing Leads."
      subheadline="Our AI Sales Agent qualifies and books your ideal students — so you never waste time chasing cold leads again."
      benefits={benefits}
      testimonials={[]} // Empty array as testimonials are no longer used
      metrics={metrics}
      guaranteeText="We guarantee 30 qualified mentorship leads in 90 days — or we work for free until you do."
      urgencyText="⛔ Only 5 mentor programs onboarded/month to avoid offer saturation"
      ctaText="Book My Strategy Call"
      hasCountdown={true}
      showSocialProof={true}
      vslSection={
        <VideoSalesLetter
          videoId="your-trading-vsl-id"
          title="Booked 87 Sales Calls for Trading Mentors in 30 Days — Without Chasing Leads."
          subtitle="Our AI Sales Agent qualifies and books your ideal students — so you never waste time chasing cold leads again."
        />
      }
    />
  );
};

export default TradingFunnel;
