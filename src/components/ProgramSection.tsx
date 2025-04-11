
import React from 'react';
import { CheckCircle, MessageSquare, FilterX, Calendar, ArrowUpRight, Zap } from 'lucide-react';
import { Button } from './ui/button';

const ProgramSection = () => {
  return (
    <section id="solution" className="section bg-gradient-to-b from-background/90 to-background">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-green-100/10 text-primary text-sm font-medium mb-4">
            The Solution
          </span>
          <h2 className="text-gradient-blue mb-4">Your AI Sales Agent, Trained Specifically For Trading Mentorship</h2>
          <p className="text-foreground max-w-2xl mx-auto">
            A hyper-personalized AI agent that handles your DMs, qualifies trading leads, and books sales calls—all while speaking in your authentic voice.
          </p>
        </div>
        
        {/* Program Components */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Intelligent Communication */}
          <div className="glass-card p-8 shadow-md card-hover opacity-0 animate-slide-in-bottom [animation-delay:100ms]" style={{animationFillMode: 'forwards'}}>
            <div className="feature-icon-wrapper">
              <MessageSquare size={28} />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Intelligent Communication</h3>
            <p className="text-foreground/80 mb-4">
              Your AI agent manages high volumes of trading inquiries across platforms, responding instantly in your authentic voice.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">24/7 Instagram DM management</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Handles trading-specific questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Trained on your unique voice</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Maintains authentic conversations</span>
              </li>
            </ul>
          </div>
          
          {/* Lead Qualification */}
          <div className="glass-card p-8 shadow-md card-hover opacity-0 animate-slide-in-bottom [animation-delay:200ms]" style={{animationFillMode: 'forwards'}}>
            <div className="feature-icon-wrapper">
              <FilterX size={28} />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Advanced Lead Qualification</h3>
            <p className="text-foreground/80 mb-4">
              AI trained on trading context to identify and filter high-potential clients based on your specific criteria.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Filters by budget qualification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Assesses trading experience level</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Evaluates goals and timeframes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Only books quality appointments</span>
              </li>
            </ul>
          </div>
          
          {/* Seamless Integration */}
          <div className="glass-card p-8 shadow-md card-hover opacity-0 animate-slide-in-bottom [animation-delay:300ms]" style={{animationFillMode: 'forwards'}}>
            <div className="feature-icon-wrapper">
              <Calendar size={28} />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Seamless Integration</h3>
            <p className="text-foreground/80 mb-4">
              Connects with your existing workflow tools to create a fully automated lead generation system.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Calendly booking integration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">GoHighLevel CRM connection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Lead data capture & transfer</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Automated follow-up sequences</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="mt-20">
          <h3 className="text-2xl text-center text-gradient-blue mb-12">How Our AI Agent Works</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Onboarding */}
            <div className="bg-background/30 rounded-xl p-6 shadow-md text-center subtle-border hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={28} className="text-background" />
              </div>
              <h4 className="font-semibold text-primary mb-2">Simple Onboarding</h4>
              <p className="text-foreground">
                We analyze your trading content, communication style, and qualification criteria to create your personalized AI.
              </p>
            </div>
            
            {/* Deployment */}
            <div className="bg-background/30 rounded-xl p-6 shadow-md text-center subtle-border hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowUpRight size={28} className="text-background" />
              </div>
              <h4 className="font-semibold text-primary mb-2">Rapid Deployment</h4>
              <p className="text-foreground">
                Your AI agent is deployed across platforms, integrating with your Calendly and GoHighLevel systems within days, not weeks.
              </p>
            </div>
            
            {/* Results */}
            <div className="bg-background/30 rounded-xl p-6 shadow-md text-center subtle-border hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-background" />
              </div>
              <h4 className="font-semibold text-primary mb-2">Immediate Results</h4>
              <p className="text-foreground">
                Start seeing qualified leads, booked calls, and reclaimed time within the first week of implementation.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-background">
              Schedule Your Discovery Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
