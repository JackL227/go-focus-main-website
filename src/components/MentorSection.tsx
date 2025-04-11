
import React from 'react';
import { Award, BarChart3, Users, Calendar } from 'lucide-react';

const MentorSection = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-trader-blue mb-4">Learn from an Expert Who's Been There</h2>
          <p className="text-trader-gray max-w-2xl mx-auto">
            Stop following generic advice that doesn't work. Get personalized mentorship from a trader with proven success across market conditions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mentor Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-trader-blue shadow-xl">
                <div className="w-full h-full bg-trader-gray-light flex items-center justify-center">
                  <span className="text-trader-blue text-6xl font-bold">JD</span>
                </div>
              </div>
              
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-2 text-trader-blue font-semibold">
                  <BarChart3 size={20} />
                  <span>10+ Years of Active Trading</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mentor Info */}
          <div>
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
              <div className="flex items-center gap-3">
                <div className="bg-trader-blue/10 p-2 rounded-full">
                  <Award className="text-trader-blue" size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-trader-gray-dark">Certified</h4>
                  <p className="text-sm text-trader-gray">Financial Analyst</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-trader-blue/10 p-2 rounded-full">
                  <Users className="text-trader-blue" size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-trader-gray-dark">200+</h4>
                  <p className="text-sm text-trader-gray">Traders Mentored</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-trader-blue/10 p-2 rounded-full">
                  <BarChart3 className="text-trader-blue" size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-trader-gray-dark">Consistent</h4>
                  <p className="text-sm text-trader-gray">10+ Year Track Record</p>
                </div>
              </div>
              
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
    </section>
  );
};

export default MentorSection;
