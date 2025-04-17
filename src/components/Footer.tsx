
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background/80 border-t border-border/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">Go Focus AI</h3>
              <p className="text-muted-foreground mt-2">
                AI agents that convert leads into revenue while you sleep.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Trading Mentors</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Med Spas</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Vehicle Aesthetics</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Custom AI Agents</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Blog</a></li>
              <li><Link to="/auth" className="text-muted-foreground hover:text-foreground transition">Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Case Studies</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Contact Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground order-2 md:order-1">
            &copy; {currentYear} Go Focus AI. All rights reserved.
          </p>
          <div className="flex space-x-4 mb-4 md:mb-0 order-1 md:order-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
