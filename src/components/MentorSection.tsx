
import React from 'react';
import { Award, BarChart3, Users, Calendar, CheckCircle } from 'lucide-react';

const MentorSection = () => {
  return (
    <section id="about" className="section bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-trader-blue text-sm font-medium mb-4">
            Meet Your Mentor
          </span>
          <h2 className="text-gradient-blue mb-4">Learn from an Expert Who's Been There</h2>
          <p className="text-trader-gray max-w-2xl mx-auto">
            Stop following generic advice that doesn't work. Get personalized mentorship from a trader with proven success across all market conditions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mentor Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative animate-fade-in [animation-delay:300ms] opacity-0">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-trader-blue shadow-xl relative z-10">
                <div className="w-full h-full bg-gradient-to-br from-trader-blue/10 to-trader-blue/30 flex items-center justify-center">
                  <span className="text-trader-blue text-6xl font-bold">JD</span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-trader-accent/20 rounded-full blur-md"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-trader-green/20 rounded-full blur-md"></div>
              
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 glass-card p-4 animate-slide-in-bottom [animation-delay:600ms] opacity-0" style={{animationFillMode: 'forwards'}}>
                <div className="flex items-center gap-2 text-trader-blue font-semibold">
                  <BarChart3 size={20} />
                  <span>10+ Years of Active Trading</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mentor Info */}
          <div className="animate-fade-in [animation-delay:500ms] opacity-0" style={{animationFillMode: 'forwards'}}>
            <h3 className="text-trader-blue mb-4">John Doe</h3>
            <p className="text-trader-gray-dark mb-6">
              After a decade of trading through bull and bear markets, I've developed a systematic approach 
              that combines technical precision with psychological discipline. My journey began with the same 
              frustrations you might be experiencing—inconsistent results, emotional decision-making, and 
              information overload.
            </p>
            <p className="text-trader-gray-dark mb-6">
              My trading methodology focuses on risk-first principles, clear entry/exit criteria, and maintaining 
              emotional equilibrium. I've mentored over 200 traders, helping them develop personalized strategies 
              that align with their goals and psychological profiles.
            </p>
            
            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="subtle-border p-4 rounded-lg hover-lift">
                <div className="flex items-center gap-3">
                  <div className="bg-trader-blue/10 p-2 rounded-full">
                    <Award className="text-trader-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-trader-gray-dark">Certified</h4>
                    <p className="text-sm text-trader-gray">Financial Analyst</p>
                  </div>
                </div>
              </div>
              
              <div className="subtle-border p-4 rounded-lg hover-lift">
                <div className="flex items-center gap-3">
                  <div className="bg-trader-blue/10 p-2 rounded-full">
                    <Users className="text-trader-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-trader-gray-dark">200+</h4>
                    <p className="text-sm text-trader-gray">Traders Mentored</p>
                  </div>
                </div>
              </div>
              
              <div className="subtle-border p-4 rounded-lg hover-lift">
                <div className="flex items-center gap-3">
                  <div className="bg-trader-blue/10 p-2 rounded-full">
                    <BarChart3 className="text-trader-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-trader-gray-dark">Consistent</h4>
                    <p className="text-sm text-trader-gray">10+ Year Track Record</p>
                  </div>
                </div>
              </div>
              
              <div className="subtle-border p-4 rounded-lg hover-lift">
                <div className="flex items-center gap-3">
                  <div className="bg-trader-blue/10 p-2 rounded-full">
                    <Calendar className="text-trader-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-trader-gray-dark">Full-Time</h4>
                    <p className="text-sm text-trader-gray">Active Trader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
