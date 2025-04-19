import React from 'react';
import { CheckCircle, ArrowRight, Mail, User, MessageSquare, Shield } from 'lucide-react';
import { Button } from './ui/button';
import BookingWidget from './BookingWidget';

const CallToAction = () => {
  return (
    <section id="contact" className="section bg-gradient-to-b from-background/90 to-background">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-background/60 to-background/80 rounded-2xl shadow-xl overflow-hidden border border-foreground/10">
          <div className="grid md:grid-cols-2">
            {/* Left Column - CTA Content */}
            <div className="p-8 md:p-12">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100/10 text-primary text-sm font-medium mb-4">
                Our Guarantee
              </span>
              <h2 className="text-gradient-blue mb-4">30+ Qualified Trading Leads in 90 Days—Or We Work For Free</h2>
              <p className="text-foreground mb-6">
                We're so confident in our AI agent's ability to transform your trading mentorship business that we offer an unprecedented guarantee.
              </p>
              
              <div className="glass-card p-5 mb-8 border border-primary/10 flex items-center">
                <Shield size={24} className="text-primary flex-shrink-0 mr-4" />
                <p className="text-sm text-primary font-medium">
                  If our system doesn't deliver at least 30 qualified trading leads within 90 days, we'll continue working for you at no cost until we hit that target.
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Free discovery call to assess your current situation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Custom AI agent development using your content and voice</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Seamless integration with your GoHighLevel CRM & Calendly</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Ongoing optimization to improve qualification success rates</span>
                </li>
              </ul>
              
              <BookingWidget 
                className="w-full bg-primary hover:bg-primary/90 text-background group text-base py-6"
              />
            </div>
            
            {/* Right Column - Form */}
            <div className="bg-gradient-to-br from-primary to-primary/90 p-8 md:p-12 text-background relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-background/10 rounded-full"></div>
              <div className="absolute bottom-10 -left-10 w-32 h-32 border border-background/10 rounded-full"></div>
              
              <h3 className="text-xl font-semibold mb-6 relative z-10">Or send a direct inquiry</h3>
              
              <form className="space-y-5 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-background/90">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-background/50" />
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full pl-10 pr-4 py-3 rounded-md bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-background/30"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-background/90">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-background/50" />
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full pl-10 pr-4 py-3 rounded-md bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-background/30"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="trading_niche" className="block text-sm font-medium mb-2 text-background/90">Trading Niche</label>
                  <select 
                    id="trading_niche" 
                    className="w-full px-4 py-3 rounded-md bg-background/10 border border-background/20 text-background focus:outline-none focus:ring-2 focus:ring-background/30"
                  >
                    <option value="" className="bg-primary">Select your trading focus</option>
                    <option value="forex" className="bg-primary">Forex</option>
                    <option value="stocks" className="bg-primary">Stocks</option>
                    <option value="crypto" className="bg-primary">Cryptocurrency</option>
                    <option value="options" className="bg-primary">Options</option>
                    <option value="futures" className="bg-primary">Futures</option>
                    <option value="other" className="bg-primary">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="followers" className="block text-sm font-medium mb-2 text-background/90">Social Media Followers</label>
                  <select 
                    id="followers" 
                    className="w-full px-4 py-3 rounded-md bg-background/10 border border-background/20 text-background focus:outline-none focus:ring-2 focus:ring-background/30"
                  >
                    <option value="" className="bg-primary">Select follower range</option>
                    <option value="under5k" className="bg-primary">Under 5,000</option>
                    <option value="5k-25k" className="bg-primary">5,000 - 25,000</option>
                    <option value="25k-100k" className="bg-primary">25,000 - 100,000</option>
                    <option value="100k+" className="bg-primary">100,000+</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-background/90">Current DM Challenge</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-background/50" />
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full pl-10 pr-4 py-3 rounded-md bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-background/30"
                      placeholder="Tell us about your current DM volume and challenges..."
                    ></textarea>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  className="w-full bg-background hover:bg-background/90 text-primary font-medium py-6 group"
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
