
import React from 'react';
import { CheckCircle } from 'lucide-react';

const CallToAction = () => {
  return (
    <section id="contact" className="section bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Column - CTA Content */}
            <div className="p-8 md:p-12">
              <h2 className="text-trader-blue mb-4">Ready to Transform Your Trading?</h2>
              <p className="text-trader-gray-dark mb-6">
                Schedule your free 30-minute strategy session to discuss your trading goals and see if this mentorship is right for you.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-trader-green flex-shrink-0" />
                  <span className="text-trader-gray-dark">Analyze your current trading approach</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-trader-green flex-shrink-0" />
                  <span className="text-trader-gray-dark">Identify your biggest obstacles to success</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-trader-green flex-shrink-0" />
                  <span className="text-trader-gray-dark">Create a personalized improvement roadmap</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-trader-green flex-shrink-0" />
                  <span className="text-trader-gray-dark">Determine if we're a good fit to work together</span>
                </li>
              </ul>
              
              <div className="bg-trader-blue/5 border border-trader-blue/20 rounded-lg p-4 mb-8">
                <p className="text-sm text-trader-blue font-medium">
                  Note: Mentorship spots are limited to ensure quality. Applications are reviewed on a first-come, first-served basis.
                </p>
              </div>
              
              <a 
                href="#" 
                className="btn-secondary w-full text-center"
                onClick={(e) => {
                  e.preventDefault();
                  alert('This would open your calendar booking system in a real implementation.');
                }}
              >
                Book Your Free Strategy Call
              </a>
            </div>
            
            {/* Right Column - Form */}
            <div className="bg-trader-blue p-8 md:p-12 text-white">
              <h3 className="text-xl mb-6">Or send a direct inquiry</h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium mb-1">Trading Experience</label>
                  <select 
                    id="experience" 
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="" className="bg-trader-blue">Select experience level</option>
                    <option value="beginner" className="bg-trader-blue">Beginner (0-1 years)</option>
                    <option value="intermediate" className="bg-trader-blue">Intermediate (1-3 years)</option>
                    <option value="advanced" className="bg-trader-blue">Advanced (3+ years)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Tell me about your trading goals..."
                  ></textarea>
                </div>
                
                <button 
                  type="button" 
                  className="w-full bg-white text-trader-blue font-medium py-3 rounded-md hover:bg-white/90 transition-colors"
                  onClick={() => alert('Form submission would be processed here in a real implementation.')}
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
