
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    position: "Forex Trading Coach",
    company: "Apex Trading Academy",
    avatar: "AT",
    content: "Go Focus AI transformed our lead process. We're booking 30+ qualified calls per month without lifting a finger. The AI handles all initial questions and only books people who are genuinely interested.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Lee",
    position: "Med Spa Owner",
    company: "Radiance Aesthetics",
    avatar: "SL",
    content: "Our AI assistant answers pricing questions instantly and has increased our conversion rate by 45%. Patients love getting immediate responses, and we love that it pre-qualifies them before booking.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    position: "Vehicle Wrap Shop Owner",
    company: "Elite Auto Aesthetics",
    avatar: "MR",
    content: "We were losing business by not responding fast enough to quote requests. Now our AI handles all inquiries instantly, and we've seen a 67% increase in scheduled appointments. Game changer!",
    rating: 5
  },
  {
    id: 4,
    name: "Jennifer Patel",
    position: "Crypto Education Founder",
    company: "Blockchain Basics",
    avatar: "JP",
    content: "The AI agent has been incredible at filtering out time-wasters from serious students. We're seeing higher quality leads and the conversion rates from consultation to sale have doubled.",
    rating: 5
  },
  {
    id: 5,
    name: "David Williams",
    position: "Medical Director",
    company: "Renewal Medical Spa",
    avatar: "DW",
    content: "Our front desk staff was overwhelmed with calls. Now they can focus on in-office patients while the AI handles inquiries and books consultations. Our schedule is consistently full now.",
    rating: 5
  }
];

const clientLogos = [
  "Elite Auto Wraps",
  "Forex Masters",
  "Glow Med Spa",
  "Trading Academy",
  "Vehicle Perfection",
  "Beauty Clinic"
];

const SocialProofSection = () => {
  return (
    <section id="testimonials" className="py-20 container mx-auto px-4 md:px-8 relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
        <p className="text-muted-foreground text-lg">
          See what our clients are saying about their AI automation experience
        </p>
      </div>

      {/* Client logos */}
      <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
        {clientLogos.map((logo, index) => (
          <div key={index} className="bg-background/30 py-3 px-6 rounded-lg border border-border/20 hover-lift">
            <p className="text-lg font-semibold text-foreground/70">{logo}</p>
          </div>
        ))}
      </div>

      {/* Testimonial carousel */}
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
              <div className="p-2">
                <Card className="glass-card hover-lift border-t-2 border-primary/20">
                  <CardContent className="p-6">
                    {/* Stars */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    
                    {/* Testimonial content */}
                    <p className="mb-6 text-foreground/90 min-h-[120px]">"{testimonial.content}"</p>
                    
                    {/* Author info */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-8 flex justify-center gap-2">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </section>
  );
};

export default SocialProofSection;
