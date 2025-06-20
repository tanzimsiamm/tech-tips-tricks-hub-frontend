'use client';

import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'; // Adjust path
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/login'); // Redirect to login if not authenticated
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        router.replace('/unauthorized'); // Redirect if not authorized (create this page)
        // You might also throw an error or show a message
      }
    }
  }, [isAuthenticated, isLoading, router, allowedRoles, user]);

  if (isLoading || !isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    // Show a loading spinner or null while checking authentication or if unauthorized
    return <LoadingSpinner />; // Or a simple <div>Loading...</div>
  }

  return <>{children}</>;
};

export default ProtectedRoute;