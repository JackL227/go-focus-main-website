
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MetaPixel from '@/components/MetaPixel';

const ThankYouPage = () => {
  const navigate = useNavigate();
  
  // Fire the Schedule event on page load
  useEffect(() => {
    // Track Schedule conversion event
    if (window.fbq) {
      window.fbq('track', 'Schedule', {
        content_name: 'Strategy Call Booked',
        success: true
      });
      console.log('🔍 Meta Pixel: Tracked booking completion on thank you page (Schedule)');
    }
    
    // Log for debugging
    console.log("Thank You page loaded and conversion tracked");
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Meta Pixel tracking for thank you page */}
      <MetaPixel event="Schedule" options={{ content_name: 'Demo Call Confirmed' }} />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Your Demo Is Booked!</h1>
          <p className="text-lg text-foreground/80 mb-6">
            We've sent all the details to your email. Our team is looking forward to showing you how our AI system works.
          </p>
          
          <div className="bg-card rounded-lg p-6 mb-8 border border-border">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 mr-3 text-primary" />
              <h3 className="font-semibold">What's Next?</h3>
            </div>
            <ol className="text-left space-y-3 text-foreground/80">
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                <span>Check your email for a calendar invite</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                <span>Prepare your questions about our AI system</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                <span>Our specialist will show you a custom demo</span>
              </li>
            </ol>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Homepage
          </Button>
        </div>
      </div>
      
      <footer className="py-4 border-t border-foreground/10">
        <div className="container-custom">
          <div className="text-center text-sm text-foreground/70">
            <p>© {new Date().getFullYear()} Go Focus AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThankYouPage;
