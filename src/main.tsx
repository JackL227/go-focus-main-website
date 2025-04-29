
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create a root first, so the app container is ready immediately
const root = createRoot(document.getElementById("root")!);

// Render the app
root.render(<App />);

// Web vitals monitoring for development
if (import.meta.env.DEV) {
  const reportWebVitals = async () => {
    const { getCLS, getFID, getLCP, getFCP, getTTFB } = await import('web-vitals');
    
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
    getFCP(console.log);
    getTTFB(console.log);
  };
  
  reportWebVitals();
}
