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
              <p className="text-foreground/70">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </header>

            {/* Content Sections */}
            <div className="space-y-8 text-base md:text-lg leading-relaxed">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-foreground/80 mb-3">
                  When you use our website or engage with our services, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, business details.</li>
                  <li><strong>Ad Account Information:</strong> Access permissions for Meta Business Manager, Ad Accounts, and related assets.</li>
                  <li><strong>Billing Information:</strong> Payment details required for invoicing (processed securely via Stripe or our chosen payment provider).</li>
                  <li><strong>Website Usage Data:</strong> IP addresses, browser type, device information, and activity on our site (via cookies and pixels).</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-foreground/80 mb-3">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Deliver and manage Meta Ads campaigns and AI lead management services.</li>
                  <li>Communicate with you regarding projects, billing, and support.</li>
                  <li>Improve our website, services, and client experience.</li>
                  <li>Comply with legal and regulatory requirements.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">3. Sharing Your Information</h2>
                <p className="text-foreground/80 mb-3">
                  We do not sell or rent your personal information. We may share your data only with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li><strong>Service Providers:</strong> Such as Stripe, Meta, or other platforms required to run ads and process payments.</li>
                  <li><strong>Legal Obligations:</strong> If required by law, regulation, or court order.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Data Storage & Security</h2>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>All data is stored securely using encrypted systems.</li>
                  <li>Access is restricted to authorized GoFocus AI team members only.</li>
                  <li>While we follow industry best practices, no system is 100% secure. You share information with us at your own risk.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Cookies & Tracking</h2>
                <p className="text-foreground/80 mb-3">
                  Our website may use cookies, Meta Pixel, and similar technologies to track visitor behavior and ad performance. This helps us optimize campaigns and measure results.
                </p>
                <p className="text-foreground/80">
                  You can disable cookies in your browser settings, but some site features may not function properly.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-foreground/80 mb-3">
                  Depending on your jurisdiction, you may have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Access, correct, or delete your personal data.</li>
                  <li>Opt out of marketing communications.</li>
                  <li>Withdraw consent for data processing (where applicable).</li>
                </ul>
                <p className="text-foreground/80 mt-3">
                  To exercise these rights, contact us at <a href="mailto:support@gofocus.ai" className="text-primary hover:underline">support@gofocus.ai</a>
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">7. Third-Party Links</h2>
                <p className="text-foreground/80">
                  Our site may link to third-party websites. We are not responsible for their privacy practices or content.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                <p className="text-foreground/80">
                  Our services are not directed to individuals under 18. We do not knowingly collect personal information from minors.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">9. Changes to this Policy</h2>
                <p className="text-foreground/80">
                  We may update this Privacy Policy at any time. Updates will be posted on this page with the revised date.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="text-foreground/80 mb-3">
                  For questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <div className="flex items-center gap-2 text-foreground/80">
                  <Mail size={18} className="text-primary" />
                  <a href="mailto:support@gofocus.ai" className="text-primary hover:underline text-lg">
                    support@gofocus.ai
                  </a>
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
