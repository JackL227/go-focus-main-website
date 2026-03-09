
import React from "react";
import { Helmet } from "react-helmet";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Thank You for Your Inquiry | GoFocus.ai</title>
        <meta name="description" content="Thank you for your inquiry. We'll get back to you within 24 hours." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full">
          <Card className="glass-card border-foreground/10 p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/856246fc-384e-4f3b-b0de-1a21af8dbc2d.png" 
                alt="GoFocus.ai" 
                className="w-20 h-auto mb-6" 
              />
              
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                Thank You for Your Inquiry!
              </h1>
              
              <p className="text-lg text-foreground/80 mb-8">
                We appreciate you reaching out. Our team will get back to you as soon as possible — typically within 24 hours.
              </p>
              
              <Button asChild variant="demo">
                <Link to="/">Return to Homepage</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ThankYou;
