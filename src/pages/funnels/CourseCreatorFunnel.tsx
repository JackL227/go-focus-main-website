
import React, { useEffect } from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';
import VideoSalesLetter from '@/components/funnels/VideoSalesLetter';

const CourseCreatorFunnel = () => {
  // For Meta Pixel tracking
  useEffect(() => {
    // Meta Pixel tracking code would go here
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
  
  const testimonials = [
    {
      quote: "The AI agent has transformed my online course business. I'm now enrolling 3x more students without spending hours in my inbox or DMs. The personalized follow-up sequences have been a game-changer for my conversion rates.",
      author: "Sarah R.",
      position: "Digital Course Creator",
      company: "Marketing Mastery Academy",
      rating: 5
    },
    {
      quote: "As someone who values high-touch support for my students, I was skeptical about using AI. But this system actually improved student satisfaction by 58% because they get answers instantly instead of waiting for me to respond.",
      author: "David L.",
      position: "Founder",
      company: "Investment Education",
      rating: 5
    },
    {
      quote: "My course completion rates have gone up by 72% since implementing the AI agent. Students who might have given up now get immediate help when they're stuck, which has also led to more referrals and testimonials.",
      author: "Michelle K.",
      position: "Creator",
      company: "Health & Nutrition Programs",
      rating: 5
    }
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
      niche="trading" // Using the trading color scheme which fits well for course creators
      headline="Scale Your Online Course With 24/7 AI-Powered Student Support"
      subheadline="Transform your course business with an AI agent that qualifies leads, answers student questions, and books sales calls while you sleep."
      benefits={benefits}
      testimonials={testimonials}
      metrics={metrics}
      guaranteeText="If our AI agent doesn't increase your course enrollments or improve student satisfaction within 60 days, we'll refund your entire investment. We're that confident in our solution."
      urgencyText="Limited time offer: Get 3 months of our premium tier at the standard plan price."
      ctaText="Schedule Your Strategy Call"
      hasCountdown={true}
      showSocialProof={true}
      vslSection={
        <VideoSalesLetter
          videoId="your-course-creator-vsl-id"
          title="How AI Automation Is Scaling Course Creator Businesses"
          subtitle="Watch how our AI system helps course creators boost enrollments and student satisfaction"
        />
      }
    />
  );
};

export default CourseCreatorFunnel;
