'use client';

import { useState, useEffect } from 'react';

export default function EnrollUsersModal({ isOpen, onClose, selectedCourse }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Sample users data - replace with actual API call
    const sampleUsers = [
      { id: 1, name: 'Patricia Davis', email: 'patricia@company.com', status: 'Enrolled', completeDate: '2025-03-26' },
      { id: 2, name: 'Robert Davis', email: 'robert@company.com', status: 'Enrolled', completeDate: '2025-02-26' },
      { id: 3, name: 'Robert Anderson', email: 'robert.anderson@company.com', status: 'Enrolled', completeDate: '2025-05-26' },
      { id: 4, name: 'David Thompson', email: 'david@company.com', status: 'Enrolled', completeDate: '-' },
      { id: 5, name: 'Jennifer Moore', email: 'jennifer@company.com', status: 'Enrolled', completeDate: '2024-12-26' },
      { id: 6, name: 'Jennifer Taylor', email: 'jennifer.taylor@company.com', status: 'Enrolled', completeDate: '2025-01-26' },
      { id: 7, name: 'Patricia Thompson', email: 'patricia.thompson@company.com', status: 'Enrolled', completeDate: '-' },
      { id: 8, name: 'Anthony Brown', email: 'anthony@company.com', status: 'Enrolled', completeDate: '-' },
      { id: 9, name: 'Jennifer Davis', email: 'jennifer.davis@company.com', status: 'Enrolled', completeDate: '2025-04-26' },
    ];
    setUsers(sampleUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserToggle = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleDueDatePreset = (preset) => {
    const date = new Date();
    switch (preset) {
      case '30 days':
        date.setDate(date.getDate() + 30);
        break;
      case '3 months':
        date.setMonth(date.getMonth() + 3);
        break;
      case '6 months':
        date.setMonth(date.getMonth() + 6);
        break;
      case '1 year':
        date.setFullYear(date.getFullYear() + 1);
        break;
      case 'End of year':
        date.setMonth(11, 31);
        break;
    }
    setDueDate(date.toISOString().split('T')[0]);
  };

  const handleEnroll = () => {
    // Handle enrollment logic here
    console.log('Enrolling users:', selectedUsers, 'in course:', selectedCourse, 'due:', dueDate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Enroll Users in Course</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Course Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Course
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
              value={selectedCourse || ''}
              disabled
            >
              <option>{selectedCourse || 'Select a course'}</option>
            </select>
          </div>

          {/* Search Users */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-purple-800 focus:ring-purple-800"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Enroll</span>
                </label>
                <span className="text-sm font-medium text-gray-700">User Name</span>
                <span className="text-sm font-medium text-gray-700 ml-auto mr-20">Status</span>
                <span className="text-sm font-medium text-gray-700">Complete Date</span>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div key={user.id} className="px-4 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserToggle(user.id)}
                        className="rounded border-gray-300 text-purple-800 focus:ring-purple-800"
                      />
                      <span className="ml-2 text-sm text-gray-900">{user.email}</span>
                    </label>
                    <span className="text-sm text-gray-900 flex-1">{user.name}</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {user.status}
                    </span>
                    <span className="text-sm text-gray-600 w-20 text-right">{user.completeDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Due Date Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due By:
            </label>
            <div className="flex items-center space-x-2 mb-3">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                placeholder="Pick a date"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['30 days', '3 months', '6 months', '1 year', 'End of year'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleDueDatePreset(preset)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-purple-800 focus:border-transparent"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {selectedUsers.length} user(s) selected for enrollment
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-purple-800 focus:border-transparent"
          >
            Cancel
          </button>
          <button
            onClick={handleEnroll}
            disabled={selectedUsers.length === 0}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-purple-800 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}