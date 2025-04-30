
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Web Vitals for performance monitoring
const reportWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in window.performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navEntry = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paintEntries = window.performance.getEntriesByType('paint');
        
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
        const lcp = getLCP();
        const cls = getCLS();
        
        console.log('📊 Performance Metrics:');
        console.log(`⚡ Time to Interactive: ${Math.round(navEntry.domInteractive)}ms`);
        console.log(`🎨 First Contentful Paint: ${Math.round(fcp)}ms`);
        console.log(`📱 Largest Contentful Paint: ~${Math.round(lcp)}ms`);
        console.log(`📏 Cumulative Layout Shift: ~${cls.toFixed(3)}`);
        console.log(`🔄 DOM Content Loaded: ${Math.round(navEntry.domContentLoadedEventEnd)}ms`);
        console.log(`✅ Page Load Complete: ${Math.round(navEntry.loadEventEnd)}ms`);
      }, 1000);
    });
  }
};

// Helper to estimate LCP (simplified)
function getLCP() {
  let largestEntry = { size: 0, startTime: 0 };
  const entries = window.performance.getEntriesByType('resource');
  entries.forEach(entry => {
    // Estimate size based on transfer size
    const size = (entry as PerformanceResourceTiming).transferSize || 0;
    if (size > largestEntry.size) {
      largestEntry = { size, startTime: entry.startTime };
    }
  });
  return largestEntry.startTime || window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
}

// Helper to estimate CLS (simplified)
function getCLS() {
  let cls = 0;
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          cls += (entry as any).value;
        }
      }
    });
    observer.observe({type: 'layout-shift', buffered: true});
  } catch (e) {
    // Fallback if Layout Instability API is not supported
  }
  
  return cls;
}

// Initialize the app with optimized settings
const init = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  }
  
  // Report performance metrics in development or when debug flag is present
  if (import.meta.env.DEV || window.location.search.includes('debug=perf')) {
    reportWebVitals();
  }
};

// Register a service worker for better caching (if supported)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silent catch - service worker is optional
    });
  });
}

init();
