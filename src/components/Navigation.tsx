
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="font-bold text-2xl text-trader-blue flex items-center gap-1">
          <span className="text-trader-accent">Trade</span>
          <span>PathMentor</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-trader-gray-dark hover:text-trader-blue transition-colors font-medium">About</a>
          <a href="#program" className="text-trader-gray-dark hover:text-trader-blue transition-colors font-medium">Program</a>
          <a href="#testimonials" className="text-trader-gray-dark hover:text-trader-blue transition-colors font-medium">Results</a>
          <Button className="bg-trader-blue hover:bg-trader-blue/90 text-white group">
            Book a Call
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-trader-gray-dark hover:text-trader-blue"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="container-custom py-6 flex flex-col space-y-6">
            <a 
              href="#about" 
              className="text-trader-gray-dark hover:text-trader-blue transition-colors py-2 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              About
              <ChevronRight className="h-4 w-4 text-trader-gray transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#program" 
              className="text-trader-gray-dark hover:text-trader-blue transition-colors py-2 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              Program
              <ChevronRight className="h-4 w-4 text-trader-gray transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#testimonials" 
              className="text-trader-gray-dark hover:text-trader-blue transition-colors py-2 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              Results
              <ChevronRight className="h-4 w-4 text-trader-gray transition-transform group-hover:translate-x-1" />
            </a>
            <Button 
              className="w-full bg-trader-accent hover:bg-trader-accent/90 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
