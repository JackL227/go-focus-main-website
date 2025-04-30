
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';

const CourseCreatorFunnel = () => {
  useEffect(() => {
    console.log("Course Creator funnel page view tracked");
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
      title: "Increase in Student Enrollment",
      value: "+187%",
      description: "Average growth in course sales within 90 days"
    },
    {
      title: "Course Completion Rate",
      value: "+72%",
      description: "Higher completion rates with 24/7 support"
    },
    {
      title: "Support Hours Saved",
      value: "120+",
      description: "Monthly hours saved on student support"
    }
  ];
  
  return (
    <FunnelLayout
      niche="trading"
      headline="Scale Your Course & Info Product Business With 24/7 AI Support"
      subheadline="We transform info-product and course creators by automating their lead qualification, booking, and sales with AI-powered systems."
      benefits={benefits}
      metrics={metrics}
      guaranteeText="If our AI agent doesn't increase your course enrollments or improve student satisfaction within 60 days, we'll refund your entire investment. We're that confident in our solution."
      urgencyText="Limited time offer: Get 3 months of our premium tier at the standard plan price."
      ctaText="Get Your Free AI Strategy Session"
      hasCountdown={true}
      showSocialProof={true}
      nicheFunnel="course"
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
