
import React from 'react';
import { Clock, Users, TrendingUp, CheckCircle2, MessageCircle, Calendar } from 'lucide-react';

const MentorSection = () => {
  return (
    <section id="about" className="section bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column - Problems Trading Mentors Face */}
          <div className="order-2 lg:order-1 mt-6 lg:mt-0">
            <div className="space-y-8">
              <div className="glass-card p-6 card-hover opacity-0 animate-slide-in-left" style={{animationFillMode: 'forwards'}}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-red-100 text-red-600 inline-flex items-center justify-center">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-trader-gray-dark">Overwhelmed by DM Volume</h3>
                    <p className="text-trader-gray">
                      You're spending hours each day manually responding to repetitive questions and sifting through unqualified leads, taking you away from what matters—coaching your traders.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 card-hover opacity-0 animate-slide-in-left" style={{animationFillMode: 'forwards', animationDelay: '100ms'}}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-amber-100 text-amber-600 inline-flex items-center justify-center">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-trader-gray-dark">Losing Potential Revenue</h3>
                    <p className="text-trader-gray">
                      Every slow response and missed message means high-ticket trading clients slipping through the cracks. Your DM inbox has become a bottleneck to your business growth.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 card-hover opacity-0 animate-slide-in-left" style={{animationFillMode: 'forwards', animationDelay: '200ms'}}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 inline-flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-trader-gray-dark">Scaling Bottleneck</h3>
                    <p className="text-trader-gray">
                      Your mentorship business can't scale if you're personally handling every inquiry. Without automation, you're trapped in a cycle of manual responses that limits your growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - text content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-trader-blue text-sm font-medium mb-4">
              The Problem
            </span>
            <h2 className="text-gradient-blue mb-6">Trading Mentors Are Losing Clients Through Their DMs</h2>
            <p className="text-trader-gray-dark mb-6">
              As your trading education business grows, so does the flood of Instagram DMs, emails, and inquiries—making it impossible to manually qualify and respond to everyone efficiently.
            </p>
            <p className="text-trader-gray-dark mb-8">
              You know there are high-ticket clients hidden in that sea of messages, but you're:
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-trader-green flex-shrink-0 mt-0.5" />
                <span className="text-trader-gray-dark">Feeling anxious about the revenue you're losing with every missed message</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-trader-green flex-shrink-0 mt-0.5" />
                <span className="text-trader-gray-dark">Frustrated by time wasted on tire-kickers who aren't serious about your mentorship program</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-trader-green flex-shrink-0 mt-0.5" />
                <span className="text-trader-gray-dark">Unable to focus on creating trading content and serving your existing clients</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-trader-green flex-shrink-0 mt-0.5" />
                <span className="text-trader-gray-dark">Getting burnt out from the constant communication demands of your growing business</span>
              </li>
            </ul>
            
            <div className="flex items-center py-4 px-6 bg-amber-50 border border-amber-200 rounded-lg">
              <Clock size={30} className="text-trader-accent mr-4 flex-shrink-0" />
              <p className="text-trader-gray-dark italic">
                <span className="font-semibold">The reality:</span> Trading mentors lose an average of 10+ hours per week on DM management—and miss up to 40% of potential high-ticket clients due to slow response times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
