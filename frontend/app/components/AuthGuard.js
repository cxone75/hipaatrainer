
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Verify token with backend
        const response = await fetch('http://localhost:3001/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          // Store user data if needed
          localStorage.setItem('userData', JSON.stringify(userData));
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router, isLoading]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  // Show protected content
  return children;
}
