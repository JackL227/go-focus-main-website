
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useState, useEffect, lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { MetaPixel } from "@/components/MetaPixel";

// Lazy load routes for performance optimization
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const TradingFunnel = lazy(() => import("./pages/funnels/TradingFunnel"));
const CourseCreatorFunnel = lazy(() => import("./pages/funnels/CourseCreatorFunnel"));
const RealEstateFunnel = lazy(() => import("./pages/funnels/RealEstateFunnel"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Report performance metrics after load
    if (typeof window !== 'undefined' && 'performance' in window) {
      setTimeout(() => {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        // Log core metrics only in development
        if (import.meta.env.DEV) {
          console.log('📊 Performance Metrics:');
          console.log(`⚡ Time to Interactive: ${Math.round(navigationEntry.domInteractive)}ms`);
          console.log(`✅ Page Load Complete: ${Math.round(navigationEntry.loadEventEnd)}ms`);
        }
      }, 1000);
    }
  };

  // Prefetch important routes and preload critical components
  useEffect(() => {
    if (!isLoading) {
      // Preload critical components after initial load
      const prefetchTimeout = setTimeout(() => {
        import("./components/Navigation");
        import("./components/Footer");
      }, 2000);
      
      // Preload other components with lower priority
      const secondaryPrefetchTimeout = setTimeout(() => {
        import("./components/CallToAction");
        import("./components/BookingWidget");
      }, 4000);
      
      return () => {
        clearTimeout(prefetchTimeout);
        clearTimeout(secondaryPrefetchTimeout);
      };
    }
  }, [isLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <MetaPixel />
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
          <Toaster />
          <Sonner />
          {!isLoading && (
            <BrowserRouter>
              <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">
                <div className="animate-pulse">
                  <img 
                    src="/lovable-uploads/65599be5-2766-4e8b-ad1f-126661cb6124.png" 
                    alt="GoFocus.ai" 
                    className="w-20 h-auto opacity-60" 
                  />
                </div>
              </div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/trading" element={<TradingFunnel />} />
                  <Route path="/course-creator" element={<CourseCreatorFunnel />} />
                  <Route path="/real-estate" element={<RealEstateFunnel />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          )}
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
