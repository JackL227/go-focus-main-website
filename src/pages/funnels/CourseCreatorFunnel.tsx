
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';

const CourseCreatorFunnel = () => {
  useEffect(() => {
    console.log("Course Creator funnel page view tracked");
  }, []);
  
  const benefits = [
    "24/7 AI Agent trained on your course content for instant student support",
    "Automated lead qualification and sales call booking",
    "Increased course completion rates with personalized support",
    "Scale student support without growing your team",
    "Intelligent follow-up sequences for each prospect",
    "Detailed analytics on student questions to improve your course"
  ];

  const metrics = [
    {
      title: "Leads Generated",
      value: 364,
      icon: "trending-up",
      description: "This month"
    },
    {
      title: "Appointments Booked",
      value: 87,
      icon: "calendar",
      description: "Last 30 days"
    },
    {
      title: "Clients Closed",
      value: 42,
      icon: "users",
      description: "Since launch"
    }
  ];

  const realtimeStats = [
    {
      title: "Leads Generated",
      value: 364,
      icon: "trending-up",
      description: "This month"
    },
    {
      title: "Appointments Booked",
      value: 87,
      icon: "calendar",
      description: "Last 30 days"
    },
    {
      title: "Clients Closed",
      value: 42,
      icon: "users",
      description: "Since launch"
    }
  ];
  
  return (
    <FunnelLayout
      niche="trading"
      headline="Scale Your Course & Info Product Business With 24/7 AI Support"
      subheadline="Transform your course business with an AI agent that qualifies leads, answers student questions, and books sales calls while you sleep."
      benefits={benefits}
      metrics={metrics}
      realtimeStats={realtimeStats}
      guaranteeText="If our AI agent doesn't increase your course enrollments or improve student satisfaction within 60 days, we'll refund your entire investment."
      urgencyText="🚀 Only 8 New Clients Accepted Monthly - 6 Spots Already Filled!"
      ctaText="Book Your Free Strategy Call"
      hasCountdown={false}
      showSocialProof={true}
      vslSection={
        <VideoSalesLetter
          videoId="H3qWMyj8Eq0"
          title="Scale Your Course & Info Product Business With 24/7 AI Support"
          subtitle="Transform your course business with an AI agent that qualifies leads, answers student questions, and books sales calls while you sleep."
        />
      }
    />
  );
};

export default CourseCreatorFunnel;
