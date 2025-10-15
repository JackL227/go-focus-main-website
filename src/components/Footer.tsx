import React from 'react';
import { Mail, Phone, Shield, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-[#050A14] text-foreground pt-16 pb-8 border-t border-foreground/10">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img src="/lovable-uploads/65599be5-2766-4e8b-ad1f-126661cb6124.png" alt="GoFocus Logo" className="h-24 w-auto" />
            </div>
            
            <p className="text-foreground/70 mb-6">We service business owners with AI powered Marketing systems in order to scale operations more efficiently, and with less manual labour. </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#how-it-works" className="text-foreground/70 hover:text-primary transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#results" className="text-foreground/70 hover:text-primary transition-colors">Industry Results</a>
              </li>
              <li>
                <a href="#testimonials" className="text-foreground/70 hover:text-primary transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="/trading" className="text-foreground/70 hover:text-primary transition-colors">Trading Mentors</a>
              </li>
              <li>
                <a href="/medspa" className="text-foreground/70 hover:text-primary transition-colors">Med Spas</a>
              </li>
              <li>
                <a href="/fitness" className="text-foreground/70 hover:text-primary transition-colors">Fitness Coaches</a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a href="mailto:support@gofocus.ai" className="text-foreground/70 hover:text-primary transition-colors">
                  support@gofocus.ai
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <a href="tel:+15145667802" className="text-foreground/70 hover:text-primary transition-colors">
                  (514) 566-7802
                </a>
              </li>
            </ul>
            
            <div className="mt-8 flex items-center gap-2 text-sm text-foreground/70">
              <Shield size={16} className="text-primary" />
              <span>Your data is always protected</span>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-foreground/10 text-center text-foreground/50 text-sm">
          <p>&copy; {new Date().getFullYear()} IA GFOCUS INC. All rights reserved. Operated under the brand GoFocus AI.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;