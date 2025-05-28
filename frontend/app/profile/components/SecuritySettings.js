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
    }
  ];

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
            onClick={() => setShowLoginHistory(true)}
            className="text-purple-600 hover:text-purple-800 text-sm mt-2"
          >
            View full login history
          </button>
        </div>
      </div>

      {/* Login History Modal */}
      {showLoginHistory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Login History</h3>
              <div className="mt-2">
                {loginHistory.map((log) => (
                  <div key={log.id} className="py-2 border-b">
                    <p className="text-sm text-gray-500">
                      {log.date} - {log.device} - {log.location} - {log.status}
                    </p>
                  </div>
                ))}
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowLoginHistory(false)}
                  className="px-4 py-2 bg-purple-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
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