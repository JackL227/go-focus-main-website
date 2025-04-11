
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <a href="/" className="font-bold text-2xl text-trader-blue">TradePathMentor</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-trader-gray-dark hover:text-trader-blue transition-colors">About</a>
          <a href="#program" className="text-trader-gray-dark hover:text-trader-blue transition-colors">Program</a>
          <a href="#testimonials" className="text-trader-gray-dark hover:text-trader-blue transition-colors">Results</a>
          <a href="#contact" className="btn-primary">Book a Call</a>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <a 
              href="#about" 
              className="text-trader-gray-dark hover:text-trader-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#program" 
              className="text-trader-gray-dark hover:text-trader-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Program
            </a>
            <a 
              href="#testimonials" 
              className="text-trader-gray-dark hover:text-trader-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Results
            </a>
            <a 
              href="#contact" 
              className="btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
