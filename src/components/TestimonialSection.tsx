
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="section bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-trader-accent text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-gradient-blue mb-4">Trading Mentors Getting Results</h2>
          <p className="text-trader-gray max-w-2xl mx-auto">
            See how other trading educators are scaling their businesses and increasing revenue with our AI agent solution.
          </p>
        </div>
        
        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Testimonial 1 */}
          <div className="glass-card p-8 shadow-md relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-blue-100 rounded-full opacity-70"></div>
            
            <div className="absolute top-4 right-4 text-trader-accent opacity-30 group-hover:scale-110 transition-transform">
              <Quote size={40} />
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="fill-trader-accent text-trader-accent" />
              ))}
            </div>
            
            <p className="text-trader-gray-dark mb-6 relative z-10">
              "I was spending 3-4 hours daily just managing DMs from potential trading students. Now my AI agent handles 
              everything, qualifying leads based on my criteria. We've seen a 63% increase in booked sales calls with 
              serious prospects, and I've reclaimed 20+ hours weekly."
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-trader-blue/30 to-trader-blue-light/30 rounded-full flex items-center justify-center text-trader-blue font-bold">
                JT
              </div>
              <div>
                <h4 className="font-medium text-trader-blue">James T.</h4>
                <p className="text-sm text-trader-gray">Forex Trading Mentor, 15,000+ Instagram followers</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="glass-card p-8 shadow-md relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-green-100 rounded-full opacity-70"></div>
            
            <div className="absolute top-4 right-4 text-trader-accent opacity-30 group-hover:scale-110 transition-transform">
              <Quote size={40} />
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="fill-trader-accent text-trader-accent" />
              ))}
            </div>
            
            <p className="text-trader-gray-dark mb-6 relative z-10">
              "The AI agent's ability to qualify leads based on budget and experience has been game-changing. 
              It filters out time-wasters and only books calls with serious traders. Our close rate has improved 
              from 20% to 45% because we're only speaking with qualified prospects. Best business investment this year."
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-trader-green/30 to-trader-green-light/30 rounded-full flex items-center justify-center text-trader-green font-bold">
                AL
              </div>
              <div>
                <h4 className="font-medium text-trader-green">Alex L.</h4>
                <p className="text-sm text-trader-gray">Options Trading Educator, 6-figure mentorship program</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="glass-card p-8 shadow-md relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-amber-100 rounded-full opacity-70"></div>
            
            <div className="absolute top-4 right-4 text-trader-accent opacity-30 group-hover:scale-110 transition-transform">
              <Quote size={40} />
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="fill-trader-accent text-trader-accent" />
              ))}
            </div>
            
            <p className="text-trader-gray-dark mb-6 relative z-10">
              "What impressed me most was how the AI perfectly captures my voice and communication style. 
              My members can't tell they're talking to an AI. It's helped us scale from 50 to 180 mentorship 
              clients in just 3 months, all while I focus on delivering value to existing members."
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-trader-accent/30 to-yellow-400/30 rounded-full flex items-center justify-center text-trader-accent font-bold">
                SR
              </div>
              <div>
                <h4 className="font-medium text-trader-accent">Sarah R.</h4>
                <p className="text-sm text-trader-gray">Crypto Trading Community Founder, 30K+ followers</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Overview */}
        <div className="bg-gradient-to-r from-trader-blue to-trader-blue-light rounded-2xl p-10 shadow-lg text-white overflow-hidden relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 border-2 border-white rounded-full"></div>
          </div>
          
          <h3 className="text-2xl mb-8 text-center font-bold">Client Results</h3>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center relative z-10 animate-slide-in-bottom opacity-0" style={{animationFillMode: 'forwards', animationDelay: '100ms'}}>
              <div className="text-4xl font-bold mb-2 text-white">73%</div>
              <p className="text-sm opacity-90">average increase in qualified leads from social media inquiries</p>
            </div>
            
            <div className="text-center relative z-10 animate-slide-in-bottom opacity-0" style={{animationFillMode: 'forwards', animationDelay: '200ms'}}>
              <div className="text-4xl font-bold mb-2 text-white">20+</div>
              <p className="text-sm opacity-90">hours saved weekly on manual DM management</p>
            </div>
            
            <div className="text-center relative z-10 animate-slide-in-bottom opacity-0" style={{animationFillMode: 'forwards', animationDelay: '300ms'}}>
              <div className="text-4xl font-bold mb-2 text-white">42%</div>
              <p className="text-sm opacity-90">average revenue increase for trading mentors</p>
            </div>
            
            <div className="text-center relative z-10 animate-slide-in-bottom opacity-0" style={{animationFillMode: 'forwards', animationDelay: '400ms'}}>
              <div className="text-4xl font-bold mb-2 text-white">98%</div>
              <p className="text-sm opacity-90">client satisfaction with AI voice accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
