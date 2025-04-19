
import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  rating?: number;
}

interface Metric {
  title: string;
  value: string;
  description: string;
}

interface TestimonialMetricsSectionProps {
  testimonials: Testimonial[];
  metrics: Metric[];
  colorScheme: {
    accent: string;
  };
}

const TestimonialsMetricsSection: React.FC<TestimonialMetricsSectionProps> = ({
  testimonials,
  metrics,
  colorScheme
}) => {
  return (
    <section id="testimonials" className="py-16 bg-background">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12 animate-entrance">What Our Clients Say</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-8 stagger-animation">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-6 rounded-lg">
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-foreground/70">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-6 stagger-animation">
            {metrics.map((metric, index) => (
              <div key={index} className="glass-card p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-2">{metric.title}</h3>
                <p className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorScheme.accent} animate-pulse-soft`}>
                  {metric.value}
                </p>
                <p className="text-foreground/70 mt-2">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsMetricsSection;
