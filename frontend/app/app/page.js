'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '../components/Layout/MainLayout';
import StatusCard from './components/StatusCard';
import ProgressChart from './components/ProgressChart';
import CalendarView from './components/CalendarView';

export default function ComplianceDashboard() {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderModalData, setReminderModalData] = useState({
    type: 'success', // 'success' or 'error'
    message: '',
    title: ''
  });

  const [dashboardData, setDashboardData] = useState({
    overallCompliance: 85,
    activeUsers: 247,
    completedTrainings: 89,
    pendingRisks: 3,
    recentActivities: [
      { id: 1, user: 'Sarah Johnson', action: 'Completed HIPAA Privacy Training', time: '2 hours ago', type: 'training' },
      { id: 2, user: 'Mike Chen', action: 'Updated Security Risk Assessment', time: '4 hours ago', type: 'assessment' },
      { id: 3, user: 'Lisa Garcia', action: 'Reviewed Policy Document', time: '6 hours ago', type: 'policy' },
      { id: 4, user: 'Tom Wilson', action: 'Submitted Incident Report', time: '1 day ago', type: 'incident' },
      { id: 5, user: 'Amy Davis', action: 'Completed Audit Checklist', time: '2 days ago', type: 'audit' }
    ],
    upcomingDeadlines: [
      { id: 1, task: 'Annual HIPAA Training', due: '2024-03-15', priority: 'high' },
      { id: 2, task: 'Security Risk Assessment', due: '2024-03-20', priority: 'medium' },
      { id: 3, task: 'Policy Review Cycle', due: '2024-03-25', priority: 'low' }
    ]
  });

  // Simulating real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random compliance score fluctuation for demo
      setDashboardData(prev => ({
        ...prev,
        overallCompliance: Math.max(75, Math.min(95, prev.overallCompliance + (Math.random() - 0.5) * 2))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleReminderAction = (type, title, message) => {
    setReminderModalData({ type, title, message });
    setShowReminderModal(true);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'training':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        );
      case 'assessment':
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'policy':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'incident':
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
            </svg>
          </div>
        );
      case 'audit':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compliance Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor your organization's HIPAA compliance status</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
            <button 
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Overall Compliance"
          value={`${Math.round(dashboardData.overallCompliance)}%`}
          icon="chart"
          trend="up"
          trendValue="2.3%"
          color="green"
        />
        <StatusCard
          title="Active Users"
          value={dashboardData.activeUsers.toString()}
          icon="users"
          trend="up"
          trendValue="12"
          color="blue"
        />
        <StatusCard
          title="Training Completion"
          value={`${dashboardData.completedTrainings}%`}
          icon="book"
          trend="up"
          trendValue="5.2%"
          color="purple"
        />
        <StatusCard
          title="Pending Risks"
          value={dashboardData.pendingRisks.toString()}
          icon="alert"
          trend="down"
          trendValue="2"
          color="red"
        />
      </div>

      {/* Charts and Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart />
        <CalendarView />
      </div>

      {/* Activity Feed and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{deadline.task}</p>
                    <p className="text-xs text-gray-500">Due: {deadline.due}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(deadline.priority)}`}>
                    {deadline.priority}
                  </span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => handleReminderAction('success', 'Reminder Set', 'You will be notified about upcoming deadlines.')}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              Set Reminders
            </button>
          </div>
        </div>
      </div>

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              {reminderModalData.type === 'success' ? (
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{reminderModalData.title}</h3>
              <p className="text-gray-600 mb-6">{reminderModalData.message}</p>
              <button
                onClick={() => setShowReminderModal(false)}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}