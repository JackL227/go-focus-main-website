import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ProjectInquiry = () => {
  return (
    <>
      <Helmet>
        <title>Project Inquiry | GoFocus AI</title>
        <meta name="description" content="Submit your AI project inquiry to GoFocus AI. Let us help you automate lead generation, client follow-up, and call booking processes." />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
              Project Inquiry
            </h1>
            <p className="text-lg text-foreground/80">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <p className="text-center text-foreground/70">
              Inquiry form coming soon. Contact us at{' '}
              <a href="mailto:support@gofocus.ai" className="text-primary hover:underline">
                support@gofocus.ai
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProjectInquiry;
