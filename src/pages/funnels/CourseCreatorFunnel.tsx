
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';
import { ArrowRight } from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import { trackCustomEvent } from '@/utils/metaPixel';

const CourseCreatorFunnel = () => {
  useEffect(() => {
    console.log("Course Creator funnel page view tracked");
    trackCustomEvent('CourseCreatorFunnelView');
  }, []);
  
  const benefits = [
    "Handle student questions 24/7 with AI that's trained on your course content",
    "Automatically qualify potential students and book sales calls with serious prospects only",
    "Increase course completion rates by providing instant support and guidance",
    "Scale your student support without hiring more team members",
    "Convert more leads with intelligent follow-up sequences personalized to each prospect",
    "Get detailed analytics on common student questions and concerns to improve your course"
  ];

  const metrics = [
    {
      title: "Leads Captured",
      value: "382",
      description: "New qualified leads in last 30 days"
    },
    {
      title: "Calls Booked",
      value: "117",
      description: "Sales calls scheduled automatically"
    },
    {
      title: "Avg. Response Time",
      value: "3.2 min",
      description: "Average AI response time to inquiries"
    },
    {
      title: "Conversion Rate",
      value: "21.5%",
      description: "Lead-to-call booking conversion"
    }
  ];

  const ctaText = "Get My Personalised Demo";
  
  // Create consistent CTA components for each section
  const ButtonGroup = () => (
    <div className="flex justify-center gap-4">
      <BookingWidget className="text-white group text-base md:text-lg px-5 md:px-7 py-3 bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0 text-sm">{ctaText}</span>
        <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </BookingWidget>
      <BookingWidget variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-base md:text-lg px-5 md:px-7 py-3 animate-button-pop">
        <span className="text-wrap break-words py-0 px-0 mx-0 my-0 text-sm">Speak To An Expert</span>
      </BookingWidget>
    </div>
  );
  
  return (
    <FunnelLayout
      niche="trading"
      headline="Scale Your Course & Info Product Business With 24/7 AI Support"
      subheadline="We transform info-product and course creators by automating their lead qualification, booking, and sales with AI-powered systems."
      benefits={benefits}
      metrics={metrics}
      guaranteeText="If our AI agent doesn't increase your course enrollments by at least 30 within 60 days, we'll refund you in full — that's how confident we are in our solution."
      urgencyText="Limited time offer: Get 3 months of our premium tier at the standard plan price."
      ctaText={ctaText}
      hasCountdown={true}
      showSocialProof={true}
      nicheFunnel="course"
      topCTA={<div className="mt-6 mb-8"><ButtonGroup /></div>}
      benefitsCTA={<div className="mt-8"><ButtonGroup /></div>}
      resultsCTA={<div className="mt-8"><ButtonGroup /></div>}
      vslSection={
        <VideoSalesLetter
          videoId="H3qWMyj8Eq0"
          title="Scale Your Course & Info Product Business With 24/7 AI Support"
          subtitle="We transform info-product and course creators by automating their lead qualification, booking, and sales with AI-powered systems."
        />
      }
    />
  );
};

export default CourseCreatorFunnel;
