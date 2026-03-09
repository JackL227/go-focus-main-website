
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import BookingWidget from './BookingWidget';

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
      isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent py-5"
    )}>
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/lovable-uploads/856246fc-384e-4f3b-b0de-1a21af8dbc2d.png"
            alt="GoFocus AI"
            className="h-8 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">How It Works</a>
          <a href="#results" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Results</a>
          <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Testimonials</a>

          <BookingWidget className="btn-primary text-sm h-9 px-5">
            Book a Demo
          </BookingWidget>
        </nav>

        <button
          className="md:hidden text-foreground hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="container-custom py-6 flex flex-col space-y-4">
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#results"
              className="text-muted-foreground hover:text-foreground transition-colors py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Results
            </a>
            <a
              href="#testimonials"
              className="text-muted-foreground hover:text-foreground transition-colors py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>

            <BookingWidget className="btn-primary w-full text-sm mt-2">
              Book a Demo
            </BookingWidget>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
