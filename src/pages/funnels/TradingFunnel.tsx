
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';

const TradingFunnel = () => {
  useEffect(() => {
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
      value: "472",
      description: "New potential clients every month"
    },
    {
      title: "Calls Booked",
      value: "126",
      description: "Than traditional lead qualification methods"
    },
    {
      title: "Avg. Response Time",
      value: "1.6 min",
      description: "Time back to focus on your existing clients"
    },
    {
      title: "Conversion Rate",
      value: "27.3%",
      description: "Lead to call conversion rate"
    }
  ];

  return (
    <FunnelLayout
      niche="trading"
      headline="Booked 87 Sales Calls for Trading Mentors in 30 Days — Without Chasing Leads."
      subheadline="Our AI Sales Agent qualifies and books your ideal students — so you never waste time chasing cold leads again."
      benefits={benefits}
      metrics={metrics}
      guaranteeText="We guarantee 30 qualified mentorship leads in 90 days — or we work for free until you do."
      urgencyText="⛔ Only 5 mentor programs onboarded/month to avoid offer saturation"
      ctaText="Book My Strategy Call"
      hasCountdown={true}
      showSocialProof={true}
      nicheFunnel="trading"
      vslSection={
        <VideoSalesLetter
          videoId="H3qWMyj8Eq0"
          title="Booked 87 Sales Calls for Trading Mentors in 30 Days — Without Chasing Leads."
          subtitle="Our AI Sales Agent qualifies and books your ideal students — so you never waste time chasing cold leads again."
        />
      }
    />
  );
};

export default TradingFunnel;
