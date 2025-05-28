
'use client';

import { useState, useEffect } from 'react';
import AlertModal from '../../components/AlertModal';

export default function DistributionModal({ selectedPolicies, onClose, onDistribute }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [scheduleType, setScheduleType] = useState('immediate');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [includeReminders, setIncludeReminders] = useState(true);
  const [reminderDays, setReminderDays] = useState(7);
  const [message, setMessage] = useState('');
  const [isDistributing, setIsDistributing] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  // Mock user and group data
  const [users] = useState([
    { id: '1', name: 'John Smith', email: 'john.smith@company.com', role: 'Admin', department: 'IT' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Manager', department: 'HR' },
    { id: '3', name: 'Mike Davis', email: 'mike.davis@company.com', role: 'User', department: 'Operations' },
    { id: '4', name: 'Emily Brown', email: 'emily.brown@company.com', role: 'User', department: 'Finance' },
    { id: '5', name: 'David Wilson', email: 'david.wilson@company.com', role: 'Manager', department: 'IT' }
  ]);

  const [groups] = useState([
    { id: '1', name: 'All Employees', memberCount: 50 },
    { id: '2', name: 'IT Department', memberCount: 12 },
    { id: '3', name: 'Managers', memberCount: 8 },
    { id: '4', name: 'New Hires', memberCount: 5 }
  ]);

  // Set default date/time
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setScheduledDate(tomorrow.toISOString().split('T')[0]);
    setScheduledTime('09:00');
  }, []);

  // Generate default message
  useEffect(() => {
    if (selectedPolicies.length > 0) {
      const policyNames = selectedPolicies.map(p => p.name).join(', ');
      setMessage(`Please review and attest to the following updated policies: ${policyNames}. Your attestation is required by the specified deadline.`);
    }
  }, [selectedPolicies]);

  const handleUserSelection = (userId, selected) => {
    if (selected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleGroupSelection = (groupId, selected) => {
    if (selected) {
      setSelectedGroups([...selectedGroups, groupId]);
    } else {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    }
  };

  const handleSelectAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  const handleDistribute = async () => {
    if (selectedUsers.length === 0 && selectedGroups.length === 0) {
      setAlertModal({
        isOpen: true,
        title: 'Selection Required',
        message: 'Please select at least one user or group.',
        type: 'warning'
      });
      return;
    }

    setIsDistributing(true);

    try {
      const distributionData = {
        policies: selectedPolicies.map(p => p.id),
        users: selectedUsers,
        groups: selectedGroups,
        scheduleType,
        scheduledDate: scheduleType === 'scheduled' ? scheduledDate : null,
        scheduledTime: scheduleType === 'scheduled' ? scheduledTime : null,
        includeReminders,
        reminderDays: includeReminders ? reminderDays : null,
        message
      };

      // Simulate API call
      const response = await fetch('/api/documents/policies/distribute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(distributionData),
      });

      if (response.ok) {
        onDistribute(distributionData);
      } else {
        throw new Error('Failed to distribute policies');
      }
    } catch (error) {
      console.error('Error distributing policies:', error);
      setAlertModal({
        isOpen: true,
        title: 'Distribution Error',
        message: 'Failed to distribute policies. Please try again.',
        type: 'error'
      });
    } finally {
      setIsDistributing(false);
    }
  };

  const getTotalRecipients = () => {
    const userCount = selectedUsers.length;
    const groupMemberCount = selectedGroups.reduce((total, groupId) => {
      const group = groups.find(g => g.id === groupId);
      return total + (group ? group.memberCount : 0);
    }, 0);
    return userCount + groupMemberCount;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900" id="modal-title">
                Distribute Policies
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

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

              {/* Recipients Selection */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Recipients ({getTotalRecipients()} total)
                </h4>
                
                {/* Groups */}
                <div className="mb-4">
                  <h5 className="text-xs font-medium text-gray-700 mb-2">Groups</h5>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {groups.map((group) => (
                      <label key={group.id} className="flex items-center space-x-2 p-1">
                        <input
                          type="checkbox"
                          checked={selectedGroups.includes(group.id)}
                          onChange={(e) => handleGroupSelection(group.id, e.target.checked)}
                          className="w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
                        />
                        <span className="text-sm text-gray-900">{group.name}</span>
                        <span className="text-xs text-gray-500">({group.memberCount})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Individual Users */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-xs font-medium text-gray-700">Individual Users</h5>
                    <button
                      onClick={handleSelectAllUsers}
                      className="text-xs text-purple-800 hover:text-purple-900"
                    >
                      {selectedUsers.length === users.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {users.map((user) => (
                      <label key={user.id} className="flex items-center space-x-2 p-1">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => handleUserSelection(user.id, e.target.checked)}
                          className="w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.department} • {user.role}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduling Options */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Delivery Schedule</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="immediate"
                    checked={scheduleType === 'immediate'}
                    onChange={(e) => setScheduleType(e.target.value)}
                    className="w-4 h-4 text-purple-800 border-gray-300 focus:ring-purple-800"
                  />
                  <span className="text-sm text-gray-900">Send immediately</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="scheduled"
                    checked={scheduleType === 'scheduled'}
                    onChange={(e) => setScheduleType(e.target.value)}
                    className="w-4 h-4 text-purple-800 border-gray-300 focus:ring-purple-800"
                  />
                  <span className="text-sm text-gray-900">Schedule for later</span>
                </label>

                {scheduleType === 'scheduled' && (
                  <div className="ml-6 grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-purple-800 focus:border-purple-800"
                    />
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-purple-800 focus:border-purple-800"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Reminder Options */}
            <div className="mt-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeReminders}
                  onChange={(e) => setIncludeReminders(e.target.checked)}
                  className="w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
                />
                <span className="text-sm text-gray-900">Send reminder emails</span>
              </label>
              
              {includeReminders && (
                <div className="mt-2 ml-6">
                  <label className="block text-xs text-gray-700 mb-1">Remind before deadline:</label>
                  <select
                    value={reminderDays}
                    onChange={(e) => setReminderDays(parseInt(e.target.value))}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-purple-800 focus:border-purple-800"
                  >
                    <option value={1}>1 day</option>
                    <option value={3}>3 days</option>
                    <option value={7}>7 days</option>
                    <option value={14}>14 days</option>
                  </select>
                </div>
              )}
            </div>

            {/* Custom Message */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Custom Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-purple-800 focus:border-purple-800"
                placeholder="Enter a custom message for the recipients..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDistribute}
              disabled={isDistributing || (selectedUsers.length === 0 && selectedGroups.length === 0)}
              className="px-4 py-2 bg-purple-800 text-white rounded-md text-sm font-medium hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isDistributing ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Distributing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Distribute to {getTotalRecipients()} Recipients</span>
                </>
              )}
            </button>
          </div>

          <AlertModal
            isOpen={alertModal.isOpen}
            onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
            title={alertModal.title}
            message={alertModal.message}
            type={alertModal.type}
          />
        </div>
      </div>
    </div>
  );
}
