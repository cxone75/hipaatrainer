
'use client';

import { useState } from 'react';

export default function BulkActions({ selectedUsers = [] }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const bulkActions = [
    { id: 'assign-role', label: 'Assign Role', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'remove-role', label: 'Remove Role', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'change-department', label: 'Change Department', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'export-csv', label: 'Export to CSV', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'send-notification', label: 'Send Notification', icon: 'M15 17h5l-5-5v-3a3 3 0 00-6 0v3l-5 5h5m-2 2a2 2 0 004 0' },
    { id: 'deactivate', label: 'Deactivate Users', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728', danger: true },
  ];

  const handleAction = (actionId) => {
    setModalType(actionId);
    setShowModal(true);
    setShowDropdown(false);
  };

  const handleExportCSV = () => {
    // Mock CSV export
    const csvContent = "Name,Email,Department,Role\n" +
      "Sarah Johnson,sarah@example.com,Clinical,Doctor\n" +
      "Michael Chen,michael@example.com,IT,Admin";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-purple-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-900 transition-colors flex items-center space-x-2"
        >
          <span>Bulk Actions</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="py-1">
              {bulkActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => {
                    if (action.id === 'export-csv') {
                      handleExportCSV();
                      setShowDropdown(false);
                    } else {
                      handleAction(action.id);
                    }
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                    action.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                  </svg>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Role Assignment Modal */}
      {showModal && modalType === 'assign-role' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Assign Role to {selectedUsers.length} Users</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Instructor</option>
                  <option>Clinical Staff</option>
                  <option>User</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle role assignment
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900"
                >
                  Assign Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Department Change Modal */}
      {showModal && modalType === 'change-department' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Change Department for {selectedUsers.length} Users</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Department
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>Clinical</option>
                  <option>Administration</option>
                  <option>IT</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Nursing</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle department change
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900"
                >
                  Change Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showModal && modalType === 'send-notification' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Send Notification to {selectedUsers.length} Users</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter notification subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter notification message"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle notification send
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900"
                >
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </>
  );
}
