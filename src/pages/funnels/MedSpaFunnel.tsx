
import React from 'react';
import FunnelLayout from '@/components/funnels/FunnelLayout';

const MedSpaFunnel = () => {
  return (
    <FunnelLayout
      niche="medspa"
      headline="Your 24/7 Virtual Concierge: Booking Med Spa Clients While You Transform Lives."
      subheadline="Never miss another inquiry or consultation opportunity. Our AI assistant answers questions, educates clients on treatments, and books appointments around the clock."
      benefits={[
        "Provide instant responses to treatment questions, even after business hours",
        "Pre-qualify clients and collect detailed information before their consultation",
        "Seamlessly integrate with your existing booking and CRM systems"
      ]}
      testimonials={[
        {
          quote: "We've secured 30 new consultations in just 10 days. The AI handles all the initial questions about procedures, pricing, and recovery time that used to eat up our staff's day.",
          author: "Dr. Sarah Johnson",
          position: "Medical Director",
          company: "Radiance Med Spa"
        },
        {
          quote: "Our AI assistant has increased our booking rate by 40%. It follows up with leads who don't schedule immediately and recaptures clients we would have otherwise lost.",
          author: "Jessica Williams",
          position: "Owner",
          company: "Pure Aesthetics"
        }
      ]}
      metrics={[
        {
          title: "After-Hours Bookings",
          value: "35% of Total",
          description: "Capture clients when they're thinking about treatments"
        },
        {
          title: "Consultation Show-Up Rate",
          value: "92%",
          description: "Pre-qualified clients are more likely to attend"
        },
        {
          title: "Staff Time Savings",
          value: "28 Hours/Week",
          description: "Let your team focus on in-person client care"
        }
      ]}
      guaranteeText="We understand the unique needs of med spas. Our AI assistant is HIPAA-compliant and trained specifically for aesthetic medicine conversations. If you don't see at least 15 new consultation bookings in your first 30 days, we'll work with you until you do."
      urgencyText="Limited time offer: Get 2 months of our premium AI service for the price of 1 when you sign up this week."
    />
  );
};

export default MedSpaFunnel;
