
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/App';

const CallToAction = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePrimaryAction = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      // Open booking link or navigate to auth
      window.open('https://calendly.com', '_blank');
    }
  };

  const handleSecondaryAction = () => {
    // Here you would open a video demo modal or redirect to a demo page
    alert('This would show an AI Agent demo');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-accent/5 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Launch Your AI Agent</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Ready to automate your lead nurturing and booking process? Get started with Go Focus AI today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="text-md px-8 py-6 bg-primary hover:bg-primary/90"
              onClick={handlePrimaryAction}
            >
              {user ? 'Go to Dashboard' : 'Book Strategy Call'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-md px-8 py-6"
              onClick={handleSecondaryAction}
            >
              <Play className="mr-2 h-4 w-4" />
              See AI Agent in Action
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            No long-term commitment. Cancel anytime. <br />
            See results in as little as 7 days after implementation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
