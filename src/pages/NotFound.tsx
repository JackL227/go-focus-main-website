
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    console.log("Full location object:", location);
    console.log("Current URL:", window.location.href);
    console.log("Current domain:", window.location.hostname);
  }, [location.pathname, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-foreground mb-4">Oops! Page not found</p>
        <p className="text-sm text-foreground/60 mb-6">
          Path: {location.pathname}
        </p>
        <a 
          href="/" 
          className="text-primary hover:text-primary/80 underline font-medium"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
