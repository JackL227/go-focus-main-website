
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error during authentication:', error);
        navigate('/auth');
      } else {
        navigate('/');
      }
    };
    
    handleAuthCallback();
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050A14] to-[#0A1428]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
