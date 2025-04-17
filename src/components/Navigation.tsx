
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, LogIn, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

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
      isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="container-custom max-w-5xl flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/9dc911d9-ffea-4dc9-8c9f-53a8114665de.png" 
            alt="Company Logo" 
            className="h-32 w-auto" 
          />
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors font-medium">How It Works</a>
          <a href="#results" className="text-foreground hover:text-primary transition-colors font-medium">Results</a>
          <a href="#testimonials" className="text-foreground hover:text-primary transition-colors font-medium">Testimonials</a>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="bg-primary hover:bg-primary/90 text-foreground group" as={Link} to="/auth">
              Log In / Sign Up
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          )}
        </nav>

        <button 
          className="md:hidden text-foreground hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="container-custom py-6 flex flex-col space-y-6">
            <a 
              href="#how-it-works" 
              className="text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
              <ChevronRight className="h-4 w-4 text-foreground/50 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#results" 
              className="text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              Results
              <ChevronRight className="h-4 w-4 text-foreground/50 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#testimonials" 
              className="text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
              <ChevronRight className="h-4 w-4 text-foreground/50 transition-transform group-hover:translate-x-1" />
            </a>
            
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                  <ChevronRight className="h-4 w-4 text-foreground/50 transition-transform group-hover:translate-x-1" />
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-foreground"
                onClick={() => setIsMenuOpen(false)}
                as={Link}
                to="/auth"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Log In / Sign Up
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
