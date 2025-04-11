
import React from 'react';
import { CheckCircle, TrendingUp, Shield, Brain, LineChart, Users } from 'lucide-react';

const ProgramSection = () => {
  return (
    <section id="program" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-trader-blue mb-4">A Complete Trading Transformation</h2>
          <p className="text-trader-gray max-w-2xl mx-auto">
            This isn't just another trading course. It's a personalized mentorship program designed 
            to transform you into a confident, consistent trader.
          </p>
        </div>
        
        {/* Program Components */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Technical Mastery */}
          <div className="bg-white rounded-lg p-6 shadow-md card-hover">
            <div className="bg-trader-blue/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <TrendingUp size={28} className="text-trader-blue" />
            </div>
            <h3 className="text-xl font-semibold text-trader-blue mb-3">Technical Mastery</h3>
            <p className="text-trader-gray-dark mb-4">
              Develop your personalized trading system with clear entry/exit rules and proven technical analysis.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Price action mastery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Key level identification</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Chart pattern recognition</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Momentum strategy development</span>
              </li>
            </ul>
          </div>
          
          {/* Risk Management */}
          <div className="bg-white rounded-lg p-6 shadow-md card-hover">
            <div className="bg-trader-blue/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Shield size={28} className="text-trader-blue" />
            </div>
            <h3 className="text-xl font-semibold text-trader-blue mb-3">Risk Mastery</h3>
            <p className="text-trader-gray-dark mb-4">
              Learn to protect your capital like a professional with systematic risk management protocols.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Position sizing optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Strategic stop-loss placement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Risk-to-reward calculation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Portfolio exposure management</span>
              </li>
            </ul>
          </div>
          
          {/* Trading Psychology */}
          <div className="bg-white rounded-lg p-6 shadow-md card-hover">
            <div className="bg-trader-blue/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Brain size={28} className="text-trader-blue" />
            </div>
            <h3 className="text-xl font-semibold text-trader-blue mb-3">Psychological Edge</h3>
            <p className="text-trader-gray-dark mb-4">
              Develop the mindset of successful traders and overcome the emotional barriers to consistency.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Emotional discipline techniques</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">FOMO & revenge trading prevention</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Confidence building exercises</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-trader-green flex-shrink-0" />
                <span className="text-trader-gray-dark">Trading journal optimization</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="mt-20">
          <h3 className="text-2xl text-center text-trader-blue mb-12">How The Mentorship Works</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* One-on-One Sessions */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="bg-trader-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-trader-blue" />
              </div>
              <h4 className="font-semibold text-trader-blue mb-2">One-on-One Mentoring</h4>
              <p className="text-trader-gray-dark">
                Weekly private sessions tailored to your specific trading challenges and goals.
              </p>
            </div>
            
            {/* Live Trading */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="bg-trader-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart size={28} className="text-trader-blue" />
              </div>
              <h4 className="font-semibold text-trader-blue mb-2">Live Trading Sessions</h4>
              <p className="text-trader-gray-dark">
                Watch and learn as trades are analyzed, executed, and managed in real market conditions.
              </p>
            </div>
            
            {/* Trade Reviews */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="bg-trader-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-trader-blue" />
              </div>
              <h4 className="font-semibold text-trader-blue mb-2">Trade Review & Feedback</h4>
              <p className="text-trader-gray-dark">
                Detailed analysis of your trades with specific feedback to improve your decision-making.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a href="#contact" className="btn-secondary inline-block">
              Apply for Mentorship
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
