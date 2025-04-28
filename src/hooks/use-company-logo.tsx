
import { useState } from 'react';

export function useCompanyLogo() {
  // For now, we'll use a simple state with a default logo
  // In a real application, this might come from an API or context
  const [logo, setLogo] = useState<string>("/lovable-uploads/gofocus-logo.png");

  return {
    logo,
    setLogo
  };
}
