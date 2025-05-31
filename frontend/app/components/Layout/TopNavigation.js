
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TopNavigation() {
  const router = useRouter();
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentOrg, setCurrentOrg] = useState('Healthcare Clinic A');

  const organizations = [
    'Healthcare Clinic A',
    'Dental Practice B',
    'Medical Center C'
  ];

  const handleOrgSwitch = (orgName) => {
    setCurrentOrg(orgName);
    setShowOrgDropdown(false);
    // Here you would typically make an API call to switch the organization context
    // and then reload the page or update the global state
    console.log('Switching to organization:', orgName);
    
    // Optionally show a success message or reload the page
    // window.location.reload(); // Uncomment if you need to reload the page
  };

  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Close user menu
    setShowUserMenu(false);
    
    // Redirect to login page
    router.push('/login');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-400 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left spacer */}
        <div className="flex-1"></div>

        {/* Center - Organization Switcher */}
        <div className="flex items-center">
          <div className="relative">
            <button
              onClick={() => setShowOrgDropdown(!showOrgDropdown)}
              className="flex items-center space-x-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-200"
            >
              <span>{currentOrg}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showOrgDropdown && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-64 bg-gray-800 border border-gray-600 rounded shadow-lg z-50">
                <div className="p-2">
                  {organizations.map((org) => (
                    <div
                      key={org}
                      onClick={() => handleOrgSwitch(org)}
                      className={`px-3 py-2 hover:bg-gray-700 rounded cursor-pointer text-gray-200 flex items-center justify-between ${
                        currentOrg === org ? 'bg-gray-700' : ''
                      }`}
                    >
                      <span>{org}</span>
                      {currentOrg === org && (
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Click outside to close dropdown */}
            {showOrgDropdown && (
              <div 
                className="fixed inset-0 z-0" 
                onClick={() => setShowOrgDropdown(false)}
              ></div>
            )}
          </div>
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5v-3a3 3 0 00-6 0v3l-5 5h5m-2 2a2 2 0 004 0" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-1 w-80 bg-gray-800 border border-gray-600 rounded shadow-lg z-50">
                <div className="p-4">
                  <h3 className="text-white font-medium mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-700 rounded">
                      <p className="text-gray-200 text-sm">New user registration pending approval</p>
                      <p className="text-gray-400 text-xs mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-3 bg-gray-700 rounded">
                      <p className="text-gray-200 text-sm">Compliance training due for 5 users</p>
                      <p className="text-gray-400 text-xs mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Click outside to close dropdown */}
            {showNotifications && (
              <div 
                className="fixed inset-0 z-0" 
                onClick={() => setShowNotifications(false)}
              ></div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 text-gray-200 hover:text-white"
            >
              <div className="w-8 h-8 bg-blue-400 text-gray-900 rounded-full flex items-center justify-center font-medium text-sm">
                SW
              </div>
              <span>Scott Wi</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showUserMenu && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-gray-800 border border-gray-600 rounded shadow-lg z-50">
                <div className="p-2">
                  <a href="/profile" className="block px-3 py-2 hover:bg-gray-700 rounded text-gray-200">Profile</a>
                  <a href="/subscription" className="block px-3 py-2 hover:bg-gray-700 rounded text-gray-200">Subscription</a>
                  <a href="/settings" className="block px-3 py-2 hover:bg-gray-700 rounded text-gray-200">Settings</a>
                  <hr className="my-2 border-gray-600" />
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded text-gray-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* Click outside to close dropdown */}
            {showUserMenu && (
              <div 
                className="fixed inset-0 z-0" 
                onClick={() => setShowUserMenu(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
