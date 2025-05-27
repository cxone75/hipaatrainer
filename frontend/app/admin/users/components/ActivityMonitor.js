'use client';

import { useState, useEffect } from 'react';

export default function ActivityMonitor({ userId, isModal }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // Mock activity data - in real app, this would come from API based on userId
  const activities = [
    { 
      id: 1,
      action: 'Logged in',
      details: 'Successful login from Chrome browser',
      timestamp: '2025-05-26T10:30:00Z',
      type: 'auth',
      ipAddress: '192.168.1.100'
    },
    { 
      id: 2,
      action: 'Updated profile',
      details: 'Changed phone number',
      timestamp: '2025-05-25T14:15:00Z',
      type: 'profile',
      ipAddress: '192.168.1.100'
    },
    { 
      id: 3,
      action: 'Completed training',
      details: 'HIPAA Fundamentals - Score: 95%',
      timestamp: '2025-05-24T09:45:00Z',
      type: 'training',
      ipAddress: '192.168.1.100'
    },
    { 
      id: 4,
      action: 'Role assigned',
      details: 'Manager role assigned by Admin User',
      timestamp: '2025-05-23T11:20:00Z',
      type: 'role',
      ipAddress: '192.168.1.50'
    },
    { 
      id: 5,
      action: 'Password changed',
      details: 'Password updated successfully',
      timestamp: '2025-05-22T16:30:00Z',
      type: 'security',
      ipAddress: '192.168.1.100'
    },
    { 
      id: 6,
      action: 'Accessed documents',
      details: 'Viewed Privacy Policy document',
      timestamp: '2025-05-21T13:10:00Z',
      type: 'access',
      ipAddress: '192.168.1.100'
    }
  ];

  const formatDate = (dateString) => {
    if (!isClient) return 'Loading...';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'auth':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
        );
      case 'profile':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'training':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        );
      case 'role':
        return (
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
        );
      case 'security':
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        );
      case 'access':
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className={isModal ? "bg-transparent" : "bg-white rounded-lg shadow border"}>
      <div className={isModal ? "px-0 py-4" : "px-6 py-4 border-b border-gray-200"}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Activity Timeline</h3>
          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
            View All Activity
          </button>
        </div>
      </div>

      <div className="space-y-4 px-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-4 relative">
            {/* Icon */}
            {getTypeIcon(activity.type)}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.details}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{formatTimestamp(activity.timestamp)}</span>
                    <span>IP: {activity.ipAddress}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(activity.timestamp)}
                </div>
              </div>
            </div>

            {/* Connector line (except for last item) */}
            {index < activities.length - 1 && (
              <div className="absolute left-4 top-12 w-px h-8 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500">No activity recorded for this user</p>
        </div>
      )}
    </div>
  );
}