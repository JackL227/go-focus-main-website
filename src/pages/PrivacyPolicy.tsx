import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | GoFocus AI</title>
        <meta 
          name="description" 
          content="Read GoFocus AI's privacy policy to understand how we collect, use, and protect your personal information." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#050A14] to-[#0A1428] text-foreground">
        <Navigation />
        
        <main className="container-custom py-20">
          <div className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-foreground/10">
            
            {/* Header */}
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-foreground/70"><strong>Last Updated: December 23, 2025</strong></p>
            </header>

            {/* Intro */}
            <div className="mb-8 text-base md:text-lg leading-relaxed text-foreground/80">
              <p>
                GoFocus AI ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or engage with our services.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 text-base md:text-lg leading-relaxed">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-foreground/80 mb-3">
                  When you use our website or engage with our services, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, and business details.</li>
                  <li><strong>Ad Account Information:</strong> Access permissions for Meta Business Manager, ad accounts, and related assets.</li>
                  <li><strong>Billing Information:</strong> Payment details required for invoicing (processed securely via Stripe or our chosen payment provider).</li>
                  <li><strong>Website Usage Data:</strong> IP address, browser type, device information, and activity on our site (via cookies, pixels, and similar technologies).</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-foreground/80 mb-3">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Deliver and manage Meta Ads campaigns and AI-powered lead management services.</li>
                  <li>Communicate with you regarding projects, billing, service updates, and support.</li>
                  <li>Improve our website, services, and overall client experience.</li>
                  <li>Comply with legal, regulatory, and contractual obligations.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">3. Sharing of Personal Information</h2>
                <p className="text-foreground/80 mb-3">
                  GoFocus AI does <strong>not sell, rent, or trade</strong> your personal information to third parties.
                </p>
                <p className="text-foreground/80 mb-3">
                  We may share information only with trusted service providers and subcontractors that assist us in operating our services, such as payment processors, advertising platforms, hosting providers, analytics tools, messaging platforms, and customer support services. These third parties are permitted to use personal information <strong>only as necessary to provide services on our behalf</strong> and are contractually obligated to keep such information confidential.
                </p>
                <p className="text-foreground/80">
                  We do not allow any third party to use your personal information for their own independent marketing or promotional purposes.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Mobile Information & SMS Privacy</h2>
                <p className="text-foreground/80 mb-3">
                  Mobile phone numbers and SMS opt-in data are collected only when voluntarily provided by users, such as through website forms, service inquiries, or direct communication requests.
                </p>
                <p className="text-foreground/80 mb-3">
                  <strong>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong>
                </p>
                <p className="text-foreground/80 mb-3">
                  Mobile information, including SMS consent data, is used solely to communicate directly with you regarding our services.
                </p>
                <p className="text-foreground/80 mb-3">
                  We may share mobile information with subcontractors and service providers <strong>only</strong> to support the delivery of our services (for example, SMS delivery platforms or customer support systems). These providers are prohibited from using this information for their own marketing or promotional purposes.
                </p>
                <p className="text-foreground/80">
                  All other use case categories exclude text messaging originator opt-in data and consent; <strong>this information will not be shared with any third parties.</strong>
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">5. SMS Opt-Out & User Control</h2>
                <p className="text-foreground/80 mb-3">
                  You may opt out of receiving SMS communications from GoFocus AI at any time by replying <strong>STOP</strong> to any message. Upon opting out, you will no longer receive SMS messages from us unless you choose to opt in again.
                </p>
                <p className="text-foreground/80">
                  For assistance, reply <strong>HELP</strong> or contact us at <a href="mailto:support@gofocus.ai" className="text-primary hover:underline">support@gofocus.ai</a>.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Data Storage & Security</h2>
                <p className="text-foreground/80 mb-3">
                  All data is stored securely using encrypted systems and industry-standard safeguards. Access to personal information is restricted to authorized GoFocus AI team members only.
                </p>
                <p className="text-foreground/80">
                  While we take reasonable measures to protect your information, no system is completely secure. You share information with us at your own risk.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">7. Cookies & Tracking Technologies</h2>
                <p className="text-foreground/80 mb-3">
                  Our website may use cookies, Meta Pixel, and similar technologies to track visitor behavior and advertising performance. This helps us analyze traffic, optimize campaigns, and improve user experience.
                </p>
                <p className="text-foreground/80">
                  You may disable cookies through your browser settings; however, some website features may not function properly as a result.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">8. Your Rights</h2>
                <p className="text-foreground/80 mb-3">
                  Depending on your jurisdiction, you may have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Access, correct, or delete your personal data.</li>
                  <li>Opt out of marketing communications.</li>
                  <li>Withdraw consent for data processing where applicable.</li>
                </ul>
                <p className="text-foreground/80 mt-3">
                  To exercise these rights, please contact us at <strong><a href="mailto:support@gofocus.ai" className="text-primary hover:underline">support@gofocus.ai</a></strong>.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">9. Third-Party Links</h2>
                <p className="text-foreground/80">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
                <p className="text-foreground/80">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors.
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
                <p className="text-foreground/80">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with the revised effective date.
                </p>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
                <p className="text-foreground/80 mb-3">
                  If you have questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <div className="space-y-2 text-foreground/80">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-primary" />
                    <span><strong>Email:</strong> <a href="mailto:support@gofocus.ai" className="text-primary hover:underline">support@gofocus.ai</a></span>
                  </div>
                  <p><strong>Company:</strong> GoFocus AI</p>
                </div>
              </section>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
