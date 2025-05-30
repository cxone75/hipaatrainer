
'use client';

import { useState } from 'react';

export default function DistributionModal({ selectedPolicies, onClose, onDistribute }) {
  const [formData, setFormData] = useState({
    recipients: 'all',
    customUsers: '',
    deadline: '',
    message: '',
    requireAcknowledgment: true,
    sendReminders: true,
    reminderFrequency: '7'
  });

  const [userSearch, setUserSearch] = useState('');
  
  // Mock user data for demonstration
  const [users] = useState([
    { id: '1', name: 'Alice Johnson', email: 'alice@company.com', department: 'IT' },
    { id: '2', name: 'Bob Smith', email: 'bob@company.com', department: 'HR' },
    { id: '3', name: 'Carol Davis', email: 'carol@company.com', department: 'Finance' },
    { id: '4', name: 'David Wilson', email: 'david@company.com', department: 'Operations' }
  ]);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const distributionData = {
      ...formData,
      policies: selectedPolicies.map(p => p.id),
      selectedUsers: formData.recipients === 'custom' ? selectedUsers : [],
      distributedAt: new Date().toISOString()
    };

    onDistribute(distributionData);
  };

  const handleUserToggle = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.department.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Distribute Policies
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Content */}
          <div className="bg-white px-6 py-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Selected Policies */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Selected Policies ({selectedPolicies.length})</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedPolicies.map((policy) => (
                    <div key={policy.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                      <span className="text-sm text-gray-900">{policy.name} v{policy.version}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribution Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Distribution Settings</h4>
                
                {/* Recipients */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recipients"
                        value="all"
                        checked={formData.recipients === 'all'}
                        onChange={(e) => setFormData({...formData, recipients: e.target.value})}
                        className="w-4 h-4 text-purple-800 border-gray-300 focus:ring-purple-800"
                      />
                      <span className="ml-2 text-sm text-gray-700">All Users (50)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recipients"
                        value="custom"
                        checked={formData.recipients === 'custom'}
                        onChange={(e) => setFormData({...formData, recipients: e.target.value})}
                        className="w-4 h-4 text-purple-800 border-gray-300 focus:ring-purple-800"
                      />
                      <span className="ml-2 text-sm text-gray-700">Select Users</span>
                    </label>
                  </div>
                </div>

                {/* Custom User Selection */}
                {formData.recipients === 'custom' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Users
                    </label>
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search by name, email, or department..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-purple-800 focus:border-purple-800"
                    />
                    
                    <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md">
                      {filteredUsers.map((user) => (
                        <label key={user.id} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserToggle(user.id)}
                            className="w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
                          />
                          <div className="ml-2 flex-1">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email} • {user.department}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    
                    {selectedUsers.length > 0 && (
                      <div className="mt-2 text-sm text-gray-600">
                        {selectedUsers.length} user(s) selected
                      </div>
                    )}
                  </div>
                )}

                {/* Deadline */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attestation Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-purple-800 focus:border-purple-800"
                    required
                  />
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.requireAcknowledgment}
                      onChange={(e) => setFormData({...formData, requireAcknowledgment: e.target.checked})}
                      className="w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require acknowledgment</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.sendReminders}
                      onChange={(e) => setFormData({...formData, sendReminders: e.target.checked})}
                      className="w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
                    />
                    <span className="ml-2 text-sm text-gray-700">Send automatic reminders</span>
                  </label>

                  {formData.sendReminders && (
                    <div className="ml-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reminder frequency
                      </label>
                      <select
                        value={formData.reminderFrequency}
                        onChange={(e) => setFormData({...formData, reminderFrequency: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-purple-800 focus:border-purple-800"
                      >
                        <option value="3">Every 3 days</option>
                        <option value="7">Weekly</option>
                        <option value="14">Bi-weekly</option>
                        <option value="30">Monthly</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distribution Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={3}
                placeholder="Add a custom message to accompany the policy distribution..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-purple-800 focus:border-purple-800"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-800 text-white rounded-md text-sm font-medium hover:bg-purple-900"
            >
              Distribute Policies
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
