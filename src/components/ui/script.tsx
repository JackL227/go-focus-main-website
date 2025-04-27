
import React, { useEffect } from 'react';

interface ScriptProps {
  children: string;
}

export const Script: React.FC<ScriptProps> = ({ children }) => {
  useEffect(() => {
    try {
      const script = document.createElement('script');
      script.innerHTML = children;
      script.async = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } catch (error) {
      console.error('Error executing script:', error);
    }
  }, [children]);

  return null;
};
