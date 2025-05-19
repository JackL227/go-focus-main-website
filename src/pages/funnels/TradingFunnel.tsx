
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';
import BookingWidget from "@/components/BookingWidget";
import { ArrowRight } from "lucide-react";
import { trackCustomEvent } from '@/utils/metaPixel';
import { useIsMobile } from '@/hooks/use-mobile';

const TradingFunnel = () => {
  useEffect(() => {
    console.log("Trading funnel page view tracked");
    trackCustomEvent('TradingFunnelView');
  }, []);
  
  const isMobile = useIsMobile();
  
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
      title: "Leads Captured",
      value: "4,016",
      description: "New potential clients every month"
    },
    {
      title: "Calls Booked",
      value: "1,121",
      description: "Sales calls scheduled automatically"
    },
    {
      title: "Avg. Response Time",
      value: "46 sec",
      description: "Average response to inquiries"
    },
    {
      title: "Conversion Rate",
      value: "64.9%",
      description: "Lead to call conversion rate"
    }
  ];

  const ctaText = "Get My Personalised Demo";

  // Top buttons - single demo button now
  const TopButtons = () => (
    <div className="mt-6 mb-8 flex justify-center">
      <BookingWidget className="text-white group bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );

  // Benefits - Single demo button
  const BenefitsButton = () => (
    <div className="mt-8 flex justify-center">
      <BookingWidget className="text-white group bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );

  // Final CTA - single button now
  const FinalButtons = () => (
    <div className="max-w-lg w-full flex justify-center">
      <BookingWidget className="text-white group bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
    </div>
  );

  return (
    <>
      <FunnelLayout
        niche="trading"
        headline="Grow Your Trading Mentorship Business With AI Systems That Sell & Scale for You"
        subheadline="We build and install full AI sales systems that reactivate old leads, close new ones, and grow your mentorship without manual work."
        benefits={benefits}
        metrics={metrics}
        guaranteeText="We guarantee 30 qualified mentorship leads in 90 days — or we work for free until you do."
        urgencyText="⛔ Only 5 mentor programs onboarded/month to avoid offer saturation"
        ctaText={ctaText}
        hasCountdown={true}
        showSocialProof={true}
        nicheFunnel="trading"
        topCTA={<TopButtons />}
        benefitsCTA={<BenefitsButton />}
        finalCTA={<FinalButtons />}
        vslSection={
          <VideoSalesLetter
            videoId="H3qWMyj8Eq0"
            title="Grow Your Trading Mentorship Business With AI Systems That Sell & Scale for You"
            subtitle="We build and install full AI sales systems that reactivate old leads, close new ones, and grow your mentorship without manual work."
          />
        }
      />
    </>
  );
};

export default TradingFunnel;
