
import React from 'react';
import { CheckCircle, ArrowRight, Calendar, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

const CallToAction = () => {
  return (
    <section id="contact" className="section bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2">
            {/* Left Column - CTA Content */}
            <div className="p-8 md:p-12">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-trader-accent text-sm font-medium mb-4">
                Get Started
              </span>
              <h2 className="text-gradient-blue mb-4">Ready to Transform Your Trading?</h2>
              <p className="text-trader-gray-dark mb-6">
                Schedule your free 30-minute strategy session to discuss your trading goals and see if this mentorship is right for you.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-trader-green flex-shrink-0 mt-0.5" />
                  <span className="text-trader-gray-dark">Analyze your current trading approach</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-trader-green flex-shrink-0 mt-0.5" />
                  <span className="text-trader-gray-dark">Identify your biggest obstacles to success</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-trader-green flex-shrink-0 mt-0.5" />
                  <span className="text-trader-gray-dark">Create a personalized improvement roadmap</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-trader-green flex-shrink-0 mt-0.5" />
                  <span className="text-trader-gray-dark">Determine if we're a good fit to work together</span>
                </li>
              </ul>
              
              <div className="glass-card p-5 mb-8 border border-blue-100">
                <p className="text-sm text-trader-blue font-medium">
                  <span className="font-semibold">Note:</span> Mentorship spots are limited to ensure quality. Applications are reviewed on a first-come, first-served basis.
                </p>
              </div>
              
              <Button 
                className="w-full bg-trader-accent hover:bg-trader-accent/90 text-white group text-base py-6"
                onClick={(e) => {
                  e.preventDefault();
                  alert('This would open your calendar booking system in a real implementation.');
                }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Free Strategy Call
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            {/* Right Column - Form */}
            <div className="bg-gradient-to-br from-trader-blue to-trader-blue-light/90 p-8 md:p-12 text-white relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/10 rounded-full"></div>
              <div className="absolute bottom-10 -left-10 w-32 h-32 border border-white/10 rounded-full"></div>
              
              <h3 className="text-xl font-semibold mb-6 relative z-10">Or send a direct inquiry</h3>
              
              <form className="space-y-5 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/90">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full pl-10 pr-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/90">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full pl-10 pr-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium mb-2 text-white/90">Trading Experience</label>
                  <select 
                    id="experience" 
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="" className="bg-trader-blue">Select experience level</option>
                    <option value="beginner" className="bg-trader-blue">Beginner (0-1 years)</option>
                    <option value="intermediate" className="bg-trader-blue">Intermediate (1-3 years)</option>
                    <option value="advanced" className="bg-trader-blue">Advanced (3+ years)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/90">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full pl-10 pr-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Tell me about your trading goals..."
                    ></textarea>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  className="w-full bg-white hover:bg-white/90 text-trader-blue font-medium py-6 group"
                  onClick={() => alert('Form submission would be processed here in a real implementation.')}
                >
                  Submit Inquiry
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
