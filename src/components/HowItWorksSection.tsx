
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Workflow, Calendar } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 container mx-auto px-4 md:px-8 relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground text-lg">
          Our AI automation process is designed for simplicity and effectiveness, handling every step from lead to close.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting lines between cards - visible on desktop */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 hidden md:block"></div>

        {/* Step 1: We Build Your AI Agent */}
        <Card className="glass-card hover-lift relative z-10 border-t-2 border-primary/30">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-background flex items-center justify-center border-2 border-primary/30">
            <Mic className="h-8 w-8 text-primary" />
          </div>
          <CardContent className="pt-14 pb-8 text-center">
            <h3 className="text-xl font-bold mb-4">We Build Your AI Agent</h3>
            <p className="text-muted-foreground">
              Voice, text & chat-based — fully customized to your offer, brand voice, and business needs.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm">
                <span className="bg-primary/20 rounded-full w-6 h-6 inline-flex items-center justify-center text-primary mr-2">✓</span>
                <span>Trained on your services</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="bg-primary/20 rounded-full w-6 h-6 inline-flex items-center justify-center text-primary mr-2">✓</span>
                <span>Matches your tone of voice</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="bg-primary/20 rounded-full w-6 h-6 inline-flex items-center justify-center text-primary mr-2">✓</span>
                <span>Handles objections like a pro</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: We Handle the Automation */}
        <Card className="glass-card hover-lift relative z-10 border-t-2 border-primary/30 mt-16 md:mt-0">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-background flex items-center justify-center border-2 border-primary/30">
            <Workflow className="h-8 w-8 text-primary" />
          </div>
          <CardContent className="pt-14 pb-8 text-center">
            <h3 className="text-xl font-bold mb-4">We Handle the Automation</h3>
            <p className="text-muted-foreground">
              From DMs, emails, and website forms to reactivating old leads automatically.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm">
                <span className="bg-primary/20 rounded-full w-6 h-6 inline-flex items-center justify-center text-primary mr-2">✓</span>
                <span>Multi-channel integration</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="bg-primary/20 rounded-full w-6 h-6 inline-flex items-center justify-center text-primary mr-2">✓</span>
                <span>24/7 lead engagement</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="bg-primary/20 rounded-full w-6 h-6 inline-flex items-center justify-center text-primary mr-2">✓</span>
                <span>Smart follow-up sequences</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: You Get Qualified Calls & Sales */}
        <Card className="glass-card hover-lift relative z-10 border-t-2 border-primary/30 mt-16 md:mt-0">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-background flex items-center justify-center border-2 border-primary/30">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <CardContent className="pt-14 pb-8 text-center">
            <h3 className="text-xl font-bold mb-4">You Get Qualified Calls & Sales</h3>
            <p className="text-muted-foreground">
              You only talk to pre-qualified people ready to buy your products and services.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm">
                <span className="bg-primary/20 rounded-full w-6 h-6 inline-flex items-center justify-center text-primary mr-2">✓</span>
                <span>High-intent meetings only</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="bg-primary/20 rounded-full w-6 h-6 inline-flex items-center justify-center text-primary mr-2">✓</span>
                <span>Calendar integration</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="bg-primary/20 rounded-full w-6 h-6 inline-flex items-center justify-center text-primary mr-2">✓</span>
                <span>Higher conversion rates</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorksSection;
