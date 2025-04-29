
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { MetaPixel } from "@/components/MetaPixel";

// Lazy load routes for better initial load performance
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TradingFunnel = lazy(() => import("./pages/funnels/TradingFunnel"));
const CourseCreatorFunnel = lazy(() => import("./pages/funnels/CourseCreatorFunnel"));
const RealEstateFunnel = lazy(() => import("./pages/funnels/RealEstateFunnel"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <MetaPixel />
        <LoadingScreen />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background"></div>}>
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
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
