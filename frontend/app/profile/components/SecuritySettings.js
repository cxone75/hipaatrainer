'use client';

import { useState, useEffect } from 'react';

export default function SecuritySettings({ onFieldChange }) {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [activeSessions] = useState([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: 'May 27, 2025 10:30 AM',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'New York, NY',
      lastActive: 'May 26, 2025 4:45 PM',
      current: false
    },
    {
      id: '3',
      device: 'Chrome on Mac',
      location: 'Boston, MA',
      lastActive: 'May 25, 2025 2:20 PM',
      current: false
    }
  ]);

  const [lastLogin] = useState('May 27, 2025 10:30 AM'); // Static date to avoid hydration issues
  const [showLoginHistory, setShowLoginHistory] = useState(false);
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
  const [historyPageSize] = useState(10);

  const handleMfaToggle = async () => {
    try {
      // Simulate API call
      setMfaEnabled(!mfaEnabled);
      onFieldChange?.();
      console.log('MFA toggled:', !mfaEnabled);
    } catch (error) {
      console.error('Error toggling MFA:', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      alert('Passwords do not match');
      return;
    }
    try {
      // Simulate API call
      console.log('Password change requested');
      setPasswordForm({ current: '', new: '', confirm: '' });
      setShowPasswordChange(false);
      alert('Password updated successfully');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleRevokeSession = async (sessionId) => {
    try {
      // Simulate API call
      console.log('Revoking session:', sessionId);
      alert('Session revoked successfully');
    } catch (error) {
      console.error('Error revoking session:', error);
    }
  };

  const loginHistory = [
    {
      id: '1',
      date: 'May 27, 2025 10:30 AM',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '2',
      date: 'May 26, 2025 4:45 PM',
      device: 'Safari on iPhone',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '3',
      date: 'May 25, 2025 2:20 PM',
      device: 'Chrome on Mac',
      location: 'Boston, MA',
      status: 'Success'
    },
    {
      id: '4',
      date: 'May 24, 2025 9:15 AM',
      device: 'Firefox on Windows',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '5',
      date: 'May 23, 2025 6:30 PM',
      device: 'Chrome on Android',
      location: 'Brooklyn, NY',
      status: 'Failed'
    },
    {
      id: '6',
      date: 'May 23, 2025 6:28 PM',
      device: 'Chrome on Android',
      location: 'Brooklyn, NY',
      status: 'Success'
    },
    {
      id: '7',
      date: 'May 22, 2025 11:45 AM',
      device: 'Safari on Mac',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '8',
      date: 'May 21, 2025 3:20 PM',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '9',
      date: 'May 20, 2025 8:00 AM',
      device: 'Edge on Windows',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '10',
      date: 'May 19, 2025 5:30 PM',
      device: 'Safari on iPad',
      location: 'Manhattan, NY',
      status: 'Success'
    },
    {
      id: '11',
      date: 'May 18, 2025 7:45 AM',
      device: 'Chrome on Linux',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '12',
      date: 'May 17, 2025 12:30 PM',
      device: 'Firefox on Mac',
      location: 'Queens, NY',
      status: 'Success'
    },
    {
      id: '13',
      date: 'May 16, 2025 4:15 PM',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      status: 'Failed'
    },
    {
      id: '14',
      date: 'May 16, 2025 4:12 PM',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '15',
      date: 'May 15, 2025 9:20 AM',
      device: 'Safari on iPhone',
      location: 'Bronx, NY',
      status: 'Success'
    },
    {
      id: '16',
      date: 'May 14, 2025 2:45 PM',
      device: 'Chrome on Android',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '17',
      date: 'May 13, 2025 6:10 PM',
      device: 'Opera on Windows',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '18',
      date: 'May 12, 2025 10:30 AM',
      device: 'Chrome on Mac',
      location: 'Albany, NY',
      status: 'Success'
    },
    {
      id: '19',
      date: 'May 11, 2025 1:15 PM',
      device: 'Firefox on Linux',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '20',
      date: 'May 10, 2025 8:45 AM',
      device: 'Safari on Mac',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '21',
      date: 'May 9, 2025 3:30 PM',
      device: 'Chrome on Windows',
      location: 'Buffalo, NY',
      status: 'Success'
    },
    {
      id: '22',
      date: 'May 8, 2025 11:20 AM',
      device: 'Edge on Windows',
      location: 'New York, NY',
      status: 'Failed'
    },
    {
      id: '23',
      date: 'May 8, 2025 11:18 AM',
      device: 'Edge on Windows',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '24',
      date: 'May 7, 2025 7:00 PM',
      device: 'Safari on iPhone',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '25',
      date: 'May 6, 2025 9:45 AM',
      device: 'Chrome on Android',
      location: 'Staten Island, NY',
      status: 'Success'
    },
    {
      id: '26',
      date: 'May 5, 2025 4:20 PM',
      device: 'Firefox on Windows',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '27',
      date: 'May 4, 2025 12:15 PM',
      device: 'Chrome on Mac',
      location: 'Rochester, NY',
      status: 'Success'
    },
    {
      id: '28',
      date: 'May 3, 2025 6:30 AM',
      device: 'Safari on iPad',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '29',
      date: 'May 2, 2025 2:45 PM',
      device: 'Chrome on Linux',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '30',
      date: 'May 1, 2025 5:10 PM',
      device: 'Opera on Mac',
      location: 'Syracuse, NY',
      status: 'Success'
    },
    {
      id: '31',
      date: 'Apr 30, 2025 8:30 AM',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '32',
      date: 'Apr 29, 2025 10:45 AM',
      device: 'Safari on iPhone',
      location: 'Long Island, NY',
      status: 'Failed'
    },
    {
      id: '33',
      date: 'Apr 29, 2025 10:42 AM',
      device: 'Safari on iPhone',
      location: 'Long Island, NY',
      status: 'Success'
    },
    {
      id: '34',
      date: 'Apr 28, 2025 3:15 PM',
      device: 'Firefox on Linux',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '35',
      date: 'Apr 27, 2025 1:20 PM',
      device: 'Edge on Windows',
      location: 'Westchester, NY',
      status: 'Success'
    },
    {
      id: '36',
      date: 'Apr 26, 2025 7:45 AM',
      device: 'Chrome on Android',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '37',
      date: 'Apr 25, 2025 4:30 PM',
      device: 'Safari on Mac',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '38',
      date: 'Apr 24, 2025 11:15 AM',
      device: 'Chrome on Windows',
      location: 'Utica, NY',
      status: 'Success'
    },
    {
      id: '39',
      date: 'Apr 23, 2025 9:00 AM',
      device: 'Firefox on Mac',
      location: 'New York, NY',
      status: 'Success'
    },
    {
      id: '40',
      date: 'Apr 22, 2025 6:20 PM',
      device: 'Safari on iPad',
      location: 'New York, NY',
      status: 'Success'
    }
  ];

  // Pagination logic for login history
  const totalHistoryPages = Math.ceil(loginHistory.length / historyPageSize);
  const indexOfLastHistoryItem = currentHistoryPage * historyPageSize;
  const indexOfFirstHistoryItem = indexOfLastHistoryItem - historyPageSize;
  const currentHistoryItems = loginHistory.slice(indexOfFirstHistoryItem, indexOfLastHistoryItem);

  const handleHistoryPrevPage = () => {
    setCurrentHistoryPage(prev => Math.max(prev - 1, 1));
  };

  const handleHistoryNextPage = () => {
    setCurrentHistoryPage(prev => Math.min(prev + 1, totalHistoryPages));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
      <div className="space-y-6">

        {/* Password Change Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Password</h4>
            <button
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="text-purple-600 hover:text-purple-800 text-sm"
            >
              {showPasswordChange ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPasswordChange && (
            <form onSubmit={handlePasswordChange} className="space-y-3 mt-3">
              <input
                type="password"
                placeholder="Current Password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordForm.new}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Update Password
              </button>
            </form>
          )}
        </div>

        {/* MFA Section */}
        <div>
          <h4 className="font-medium mb-2">Multi-Factor Authentication</h4>
          <div className="flex items-center justify-between p-3 border rounded">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">
                {mfaEnabled ? 'Enabled - Your account is protected' : 'Add an extra layer of security'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={mfaEnabled}
                onChange={handleMfaToggle}
                className="sr-only peer"
                aria-label="Toggle Multi-Factor Authentication"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* Active Sessions */}
        <div>
          <h4 className="font-medium mb-3">Active Sessions</h4>
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{session.device}</p>
                    {session.current && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{session.location}</p>
                  <p className="text-xs text-gray-500">
                    Last active: {session.lastActive}
                  </p>
                </div>
                {!session.current && (
                  <button
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                    aria-label={`Revoke session on ${session.device}`}
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Login History Preview */}
        <div>
          <h4 className="font-medium mb-2">Recent Login Activity</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium">Last login:</span> {lastLogin}
                <br />
                <span className="text-gray-600">Chrome on Windows • New York, NY</span>
              </div>
              <span className="text-green-600 font-medium">Success</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium">Previous:</span> May 26, 2025 4:45 PM
                <br />
                <span className="text-gray-600">Safari on iPhone • New York, NY</span>
              </div>
              <span className="text-green-600 font-medium">Success</span>
            </div>
          </div>
          <button
            onClick={() => {
              setShowLoginHistory(true);
              setCurrentHistoryPage(1);
            }}
            className="text-purple-600 hover:text-purple-800 text-sm mt-2"
          >
            View full login history
          </button>
        </div>
      </div>

      {/* Login History Modal */}
      {showLoginHistory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Complete Login History</h3>
                <button
                  onClick={() => setShowLoginHistory(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="space-y-2 mb-4">
                  {currentHistoryItems.map((log) => (
                    <div key={log.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium text-sm">{log.date}</span>
                          <span className="text-sm text-gray-600">{log.device}</span>
                          <span className="text-sm text-gray-600">{log.location}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        log.status === 'Success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Pagination Controls */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="text-sm text-gray-700">
                    Showing {indexOfFirstHistoryItem + 1} to {Math.min(indexOfLastHistoryItem, loginHistory.length)} of {loginHistory.length} login attempts
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleHistoryPrevPage}
                      disabled={currentHistoryPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="px-3 py-1 text-sm">
                      Page {currentHistoryPage} of {totalHistoryPages}
                    </span>
                    <button
                      onClick={handleHistoryNextPage}
                      disabled={currentHistoryPage === totalHistoryPages}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowLoginHistory(false)}
                  className="px-6 py-2 bg-purple-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}