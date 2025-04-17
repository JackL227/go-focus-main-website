
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/App';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-background/80 backdrop-blur-md shadow-lg' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-foreground">Go Focus AI</a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-foreground transition">How It Works</a>
          <a href="#results" className="text-sm font-medium text-foreground/80 hover:text-foreground transition">Results</a>
          <a href="#testimonials" className="text-sm font-medium text-foreground/80 hover:text-foreground transition">Testimonials</a>
          
          {user ? (
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              Dashboard
            </Button>
          ) : (
            <Button onClick={() => navigate('/auth')} variant="outline">
              Login / Sign Up
            </Button>
          )}
          
          <Button className="bg-primary hover:bg-primary/90">Book a Demo</Button>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg border-t border-border/10 p-4">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#how-it-works" 
              className="text-lg font-medium text-foreground py-2 px-4 hover:bg-primary/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#results" 
              className="text-lg font-medium text-foreground py-2 px-4 hover:bg-primary/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Results
            </a>
            <a 
              href="#testimonials" 
              className="text-lg font-medium text-foreground py-2 px-4 hover:bg-primary/10 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            
            {user ? (
              <Button 
                onClick={() => navigateTo('/dashboard')} 
                variant="outline" 
                className="w-full"
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                onClick={() => navigateTo('/auth')} 
                variant="outline" 
                className="w-full"
              >
                Login / Sign Up
              </Button>
            )}
            
            <Button className="w-full bg-primary hover:bg-primary/90">Book a Demo</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
