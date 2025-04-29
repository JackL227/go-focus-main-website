
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { MetaPixel } from "@/components/MetaPixel";
import LoadingScreen from "./components/LoadingScreen";

// Eager load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load non-critical pages
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const TradingFunnel = lazy(() => import("./pages/funnels/TradingFunnel"));
const CourseCreatorFunnel = lazy(() => import("./pages/funnels/CourseCreatorFunnel"));
const RealEstateFunnel = lazy(() => import("./pages/funnels/RealEstateFunnel"));
const FitnessFunnel = lazy(() => import("./pages/funnels/FitnessFunnel"));

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <LoadingScreen minimumDisplayTime={800} />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <MetaPixel />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Eager loaded routes */}
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
            
            {/* Lazy loaded routes */}
            <Route path="/auth" element={
              <Suspense fallback={<PageLoader />}>
                <Auth />
              </Suspense>
            } />
            <Route path="/auth/callback" element={
              <Suspense fallback={<PageLoader />}>
                <AuthCallback />
              </Suspense>
            } />
            <Route path="/trading" element={
              <Suspense fallback={<PageLoader />}>
                <TradingFunnel />
              </Suspense>
            } />
            <Route path="/course-creator" element={
              <Suspense fallback={<PageLoader />}>
                <CourseCreatorFunnel />
              </Suspense>
            } />
            <Route path="/real-estate" element={
              <Suspense fallback={<PageLoader />}>
                <RealEstateFunnel />
              </Suspense>
            } />
            <Route path="/fitness" element={
              <Suspense fallback={<PageLoader />}>
                <FitnessFunnel />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
