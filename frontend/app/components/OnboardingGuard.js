
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function OnboardingGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Routes that should be accessible during onboarding
  const allowedRoutes = ['/onboarding', '/auth/signin', '/auth/signup'];

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    const hasInvite = localStorage.getItem('userInvite'); // Check for invite token
    
    // If user has an invite, skip onboarding
    if (hasInvite) {
      setIsOnboardingComplete(true);
    } else {
      setIsOnboardingComplete(onboardingCompleted === 'true');
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // If onboarding is not complete and not on allowed routes, redirect to onboarding
    if (!isOnboardingComplete && !allowedRoutes.includes(pathname)) {
      router.push('/onboarding');
    }
    
    // If onboarding is complete and on onboarding page, redirect to dashboard
    if (isOnboardingComplete && pathname === '/onboarding') {
      router.push('/dashboard');
    }
  }, [isOnboardingComplete, pathname, router, isLoading]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600">Loading HIPAA Tracker...</p>
        </div>
      </div>
    );
  }

  // Show blocked screen if onboarding not complete and not on allowed routes
  if (!isOnboardingComplete && !allowedRoutes.includes(pathname)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Setup Required</h2>
          <p className="text-gray-600 mb-6">
            Please complete the onboarding process to access HIPAA Tracker features.
          </p>
          <button
            onClick={() => router.push('/onboarding')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Complete Setup
          </button>
        </div>
      </div>
    );
  }

  return children;
}
