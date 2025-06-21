// frontend/src/components/layout/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useUser } from '../../context/user.provider';
import { useRouter } from 'next/navigation';
import Loading from '../ui/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'admin')[]; // Roles that are allowed to access the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) { // Only redirect once the initial loading of user data is complete
      if (!user) { // User is not logged in
        router.replace('/login'); // Redirect to login page
      } else if (allowedRoles && !allowedRoles.includes(user.role)) { // User is logged in but role is not allowed
        // console.warn(`User ${user.email} (role: ${user.role}) attempted to access restricted route.`);
        router.replace('/unauthorized'); // Redirect to unauthorized page
      }
    }
  }, [user, isLoading, router, allowedRoles]); // Dependencies for useEffect

  if (isLoading) {
    // Show a global loading spinner while authentication status is being determined
    return <Loading />;
  }

  // If user is present and their role is allowed, render children
  if (user && (!allowedRoles || allowedRoles.includes(user.role))) {
    return <>{children}</>;
  }

  // If not loading, not authenticated, or not authorized, return null.
  // The useEffect hook will handle the redirection.
  return null;
};

export default ProtectedRoute;