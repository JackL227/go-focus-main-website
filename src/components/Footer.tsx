import React from 'react';
import { Mail, Phone, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img
                src="/lovable-uploads/856246fc-384e-4f3b-b0de-1a21af8dbc2d.png"
                alt="GoFocus Logo"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Helping AI agencies scale with proven systems and Meta ads management.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#how-it-works" className="text-sm text-muted-foreground hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#results" className="text-sm text-muted-foreground hover:text-white transition-colors">Results</a></li>
              <li><a href="#testimonials" className="text-sm text-muted-foreground hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="/privacy-policy" className="text-sm text-muted-foreground hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-sm text-muted-foreground hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-muted-foreground" />
                <a href="mailto:support@gofocus.ai" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  support@gofocus.ai
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-muted-foreground" />
                <a href="tel:+15145667802" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  (514) 566-7802
                </a>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
              <Shield size={14} />
              <span>Your data is always protected</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-muted-foreground text-xs">
          <p>&copy; {new Date().getFullYear()} IA GFOCUS INC. All rights reserved. Operated under the brand GoFocus AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
