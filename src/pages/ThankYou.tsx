
import React from "react";
import { Helmet } from "react-helmet";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import GradientText from "@/components/ui/gradient-text";

const ThankYou = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Your Strategy Call Has Been Scheduled! | GoFocus.ai</title>
        <meta name="description" content="Thank you for scheduling your strategy call with GoFocus.ai" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-3xl w-full">
          <Card className="glass-card border-foreground/10 p-8 md:p-12">
            <div className="flex flex-col items-center mb-8">
              <img 
                src="/lovable-uploads/65599be5-2766-4e8b-ad1f-126661cb6124.png" 
                alt="GoFocus.ai" 
                className="w-20 h-auto mb-6" 
              />
              <h1 className="text-3xl md:text-4xl font-semibold text-center mb-2">
                Your Strategy Call Has Been Scheduled!
              </h1>
              <p className="text-xl text-center text-foreground/80">
                Your appointment is confirmed!
              </p>
            </div>
            
            <Separator className="my-6 bg-foreground/10" />
            
            <CardContent className="px-0 pt-4">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center">
                <CheckCircle className="mr-2 text-primary h-6 w-6" />
                <GradientText gradient="primary">What to Do Next:</GradientText>
              </h2>
              
              <div className="space-y-6 my-8">
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-start md:w-1/3 mb-2 md:mb-0">
                    <CheckCircle className="mr-2 text-primary h-5 w-5 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg">Check Your Email:</h3>
                  </div>
                  <p className="md:w-2/3 text-foreground/80 md:pl-4">
                    You'll receive a confirmation email shortly. Please click "Yes" to the event invitation to confirm your attendance.
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-start md:w-1/3 mb-2 md:mb-0">
                    <CheckCircle className="mr-2 text-primary h-5 w-5 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg">Prepare for the Call:</h3>
                  </div>
                  <p className="md:w-2/3 text-foreground/80 md:pl-4">
                    Please make sure to join the meeting from a quiet environment to be fully present and engaged during the call.
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-start md:w-1/3 mb-2 md:mb-0">
                    <CheckCircle className="mr-2 text-primary h-5 w-5 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-lg">Need Help?</h3>
                  </div>
                  <p className="md:w-2/3 text-foreground/80 md:pl-4">
                    If you have any questions or need to reschedule, reach out to us at <a href="mailto:ethan@gofocus.ai" className="text-primary hover:underline">ethan@gofocus.ai</a> or call us at <a href="tel:+15145667802" className="text-primary hover:underline">+1 (514) - 566 - 7802</a>.
                  </p>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <h2 className="text-xl font-semibold mb-2">Looking Forward to Connecting!</h2>
                <p className="text-foreground/80 mb-8">We can't wait to discuss how we can help you!</p>
                
                <Button asChild variant="demo" className="mt-4">
                  <Link to="/">Return to Homepage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ThankYou;
