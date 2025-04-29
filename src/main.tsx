
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use concurrent mode for better performance
const root = createRoot(document.getElementById("root")!);

// Hydrate the application
root.render(<App />);

// Add performance tracking
if (process.env.NODE_ENV === 'development') {
  // Only in development to avoid increasing bundle size in production
  const reportWebVitals = async () => {
    const { onCLS, onFID, onLCP } = await import('web-vitals');
    
    onCLS(console.log);
    onFID(console.log);
    onLCP(console.log);
  };
  
  reportWebVitals();
}
