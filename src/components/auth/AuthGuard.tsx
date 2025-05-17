
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAdmin = false }) => {
  const { user, isLoading, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login if not authenticated
        navigate('/auth', { state: { from: location.pathname } });
      } else if (requireAdmin && userProfile?.role !== 'admin') {
        // Redirect to dashboard if user is not admin but admin access is required
        navigate('/dashboard');
      }
    }
  }, [user, isLoading, navigate, location.pathname, requireAdmin, userProfile]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null;
  }

  if (requireAdmin && userProfile?.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
