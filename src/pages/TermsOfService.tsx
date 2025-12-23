import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail } from 'lucide-react';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | GoFocus AI</title>
        <meta 
          name="description" 
          content="Read GoFocus AI's SMS Messaging Terms of Service to understand our messaging program policies." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#050A14] to-[#0A1428] text-foreground">
        <Navigation />
        
        <main className="container-custom py-20">
          <div className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-foreground/10">
            
            {/* Header */}
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">GoFocus AI SMS Messaging Terms</h1>
            </header>

            {/* Content Sections */}
            <div className="space-y-8 text-base md:text-lg leading-relaxed">
              
              {/* Program Name */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Program Name</h2>
                <p className="text-foreground/80">
                  GoFocus AI SMS Messaging Program
                </p>
              </section>

              {/* Program Description */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Program Description</h2>
                <p className="text-foreground/80 mb-4">
                  By opting in, you agree to receive SMS messages from GoFocus AI related to service updates, appointment confirmations, account notifications, and relevant business communications associated with our AI-powered marketing and lead management services. Message frequency varies based on your interaction with our services.
                </p>
                <p className="text-foreground/80 mb-4">
                  You can cancel the SMS service at any time by texting <strong>"STOP"</strong> to the number from which you received the message. Upon sending <strong>"STOP,"</strong> we will confirm your unsubscribe status via SMS. After this confirmation, you will no longer receive SMS messages from us. To rejoin, you may opt in again through the same method you originally used.
                </p>
                <p className="text-foreground/80 mb-4">
                  If you experience issues with the messaging program, reply with the keyword <strong>"HELP"</strong> for assistance, or contact us directly at <a href="mailto:support@gofocus.ai" className="text-primary hover:underline"><strong>support@gofocus.ai</strong></a>.
                </p>
                <p className="text-foreground/80 mb-4">
                  Carriers are not liable for delayed or undelivered messages.
                </p>
                <p className="text-foreground/80 mb-4">
                  Message and data rates may apply for messages sent to you from us and from you to us. Message frequency varies. For questions about your text plan or data plan, please contact your wireless provider.
                </p>
                <p className="text-foreground/80">
                  For privacy-related inquiries, please refer to our Privacy Policy:{' '}
                  <a href="/privacy-policy" className="text-primary hover:underline">
                    https://gofocus.ai/privacy-policy
                  </a>
                </p>
              </section>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;
