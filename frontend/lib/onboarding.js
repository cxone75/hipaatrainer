
// Onboarding utility functions

export const checkOnboardingStatus = () => {
  if (typeof window === 'undefined') return false;
  
  const onboardingCompleted = localStorage.getItem('onboardingCompleted');
  const hasInvite = localStorage.getItem('userInvite');
  
  // If user has an invite, they can skip onboarding
  return onboardingCompleted === 'true' || !!hasInvite;
};

export const completeOnboarding = (organizationData) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('onboardingCompleted', 'true');
  localStorage.setItem('organizationData', JSON.stringify(organizationData));
};

export const getOrganizationData = () => {
  if (typeof window === 'undefined') return null;
  
  const data = localStorage.getItem('organizationData');
  return data ? JSON.parse(data) : null;
};

export const setUserInvite = (inviteToken) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('userInvite', inviteToken);
};

export const clearUserInvite = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('userInvite');
};

export const hasUserInvite = () => {
  if (typeof window === 'undefined') return false;
  
  return !!localStorage.getItem('userInvite');
};
