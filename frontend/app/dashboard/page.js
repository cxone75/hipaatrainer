
'use client';

import { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import StatusCard from './components/StatusCard';
import CalendarView from './components/CalendarView';
import ProgressChart from './components/ProgressChart';

export default function ComplianceDashboard() {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderModalData, setReminderModalData] = useState({
    type: 'success', // 'success' or 'error'
    message: '',
    title: ''
  });
  
  const [complianceData, setComplianceData] = useState({
    score: 85,
    tasks: {
      training: { status: 'urgent', count: 12, label: 'Training' },
      riskAssessments: { status: 'warning', count: 3, label: 'Risk Assessments' },
      baas: { status: 'compliant', count: 0, label: 'BAAs' },
      policies: { status: 'compliant', count: 1, label: 'Policies' }
    },
    trends: [
      { date: '2024-12-01', score: 78 },
      { date: '2025-01-01', score: 82 },
      { date: '2025-02-01', score: 79 },
      { date: '2025-03-01', score: 83 },
      { date: '2025-04-01', score: 87 },
      { date: '2025-05-01', score: 85 }
    ],
    categoryProgress: [
      { category: 'Training', progress: 75 },
      { category: 'Risk Assessment', progress: 90 },
      { category: 'BAAs', progress: 100 },
      { category: 'Policies', progress: 95 }
    ]
  });

  const [calendarEvents, setCalendarEvents] = useState([
    {
      id: 1,
      title: 'Annual Training Due',
      date: '2025-07-01',
      type: 'training',
      status: 'upcoming',
      description: 'Annual HIPAA training deadline for all staff members'
    },
    {
      id: 2,
      title: 'Risk Assessment Review',
      date: '2025-06-15',
      type: 'risk',
      status: 'urgent',
      description: 'Quarterly risk assessment review and update'
    },
    {
      id: 3,
      title: 'Policy Update Required',
      date: '2025-05-30',
      type: 'policy',
      status: 'warning',
      description: 'Update privacy policy based on new regulations'
    }
  ]);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' }
  ];

  const handleTaskClick = (taskType) => {
    switch(taskType) {
      case 'training':
        window.location.href = '/training?filter=overdue';
        break;
      case 'riskAssessments':
        window.location.href = '/risk-assessments?filter=pending';
        break;
      case 'baas':
        window.location.href = '/risk-assessments#baas';
        break;
      case 'policies':
        window.location.href = '/policies?filter=review';
        break;
      default:
        break;
    }
  };

  const handleCalendarEventClick = (event) => {
    // Event click handler - could be expanded to show details in a modal
    console.log('Event clicked:', event);
  };

  const handleSendReminder = async (eventId) => {
    try {
      const response = await fetch('/api/compliance/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId }),
      });
      
      if (response.ok) {
        setReminderModalData({
          type: 'success',
          title: 'Success',
          message: 'Reminder sent successfully!'
        });
      } else {
        setReminderModalData({
          type: 'error',
          title: 'Error',
          message: 'Failed to send reminder. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
      setReminderModalData({
        type: 'error',
        title: 'Error',
        message: 'Error sending reminder. Please check your connection and try again.'
      });
    }
    setShowReminderModal(true);
  };

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Compliance Dashboard</h1>
          <p className="text-gray-600">Monitor your organization's compliance status and upcoming deadlines</p>
        </div>

        {/* Mobile and Desktop Layout */}
        <div className="space-y-8">
          {/* Top Row - Compliance Score and Task Flags */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Compliance Score - Takes 2 columns on desktop */}
            <div className="lg:col-span-2">
              <StatusCard
                type="score"
                score={complianceData.score}
                title="Compliance Score"
                aria-label={`Compliance Score: ${complianceData.score}%`}
              />
            </div>
            
            {/* Task Flags - Take 3 columns on desktop, stack on mobile */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(complianceData.tasks).map(([key, task]) => (
                <StatusCard
                  key={key}
                  type="task"
                  status={task.status}
                  count={task.count}
                  title={task.label}
                  onClick={() => handleTaskClick(key)}
                  aria-label={`${task.label} Status: ${task.status === 'urgent' ? 'Urgent' : task.status === 'warning' ? 'Warning' : 'Compliant'}`}
                />
              ))}
            </div>
          </div>

          {/* Middle Row - Calendar View */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <CalendarView
              events={calendarEvents}
              onEventClick={handleCalendarEventClick}
              onSendReminder={handleSendReminder}
            />
          </div>

          {/* Bottom Row - Progress Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trends Chart */}
            <div className="bg-white rounded-lg shadow border p-6 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Trends</h2>
              <div className="flex-1 min-h-[200px]">
                <ProgressChart
                  type="line"
                  data={complianceData.trends}
                  aria-label="Compliance Trends Chart"
                />
              </div>
            </div>
            
            {/* Category Progress */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Progress</h2>
              <ProgressChart
                type="bar"
                data={complianceData.categoryProgress}
                aria-label="Category Progress Chart"
              />
            </div>
          </div>
        </div>

        {/* Reminder Modal */}
        {showReminderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center mb-4">
                {reminderModalData.type === 'success' ? (
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900">{reminderModalData.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{reminderModalData.message}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowReminderModal(false)}
                  className={`px-4 py-2 rounded font-medium ${
                    reminderModalData.type === 'success'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
'use client';

import { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import StatusCard from './components/StatusCard';
import CalendarView from './components/CalendarView';
import ProgressChart from './components/ProgressChart';

export default function DashboardPage() {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderModalData, setReminderModalData] = useState({
    type: 'success', // 'success' or 'error'
    message: '',
    title: ''
  });
  
  const [complianceData, setComplianceData] = useState({
    score: 85,
    tasks: {
      training: { status: 'urgent', count: 12, label: 'Training' },
      riskAssessments: { status: 'warning', count: 3, label: 'Risk Assessments' },
      policies: { status: 'compliant', count: 1, label: 'Policies' }
    },
    trends: [
      { date: '2024-12-01', score: 78 },
      { date: '2025-01-01', score: 82 },
      { date: '2025-02-01', score: 79 },
      { date: '2025-03-01', score: 83 },
      { date: '2025-04-01', score: 87 },
      { date: '2025-05-01', score: 85 }
    ],
    categoryProgress: [
      { category: 'Training', progress: 75 },
      { category: 'Risk Assessment', progress: 90 },
      { category: 'Policies', progress: 95 }
    ]
  });

  const [calendarEvents, setCalendarEvents] = useState([
    {
      id: 1,
      title: 'HIPAA Training Deadline',
      date: '2025-01-28',
      type: 'deadline',
      description: '12 employees need to complete training'
    },
    {
      id: 2,
      title: 'Risk Assessment Review',
      date: '2025-01-30',
      type: 'review',
      description: 'Quarterly security risk assessment'
    },
    {
      id: 3,
      title: 'Policy Update Distribution',
      date: '2025-02-01',
      type: 'update',
      description: 'New privacy policy version 2.1'
    },
    {
      id: 4,
      title: 'Audit Preparation',
      date: '2025-02-05',
      type: 'audit',
      description: 'Annual compliance audit preparation'
    }
  ]);

  // Handle task card clicks
  const handleTaskClick = (taskType) => {
    switch(taskType) {
      case 'training':
        window.location.href = '/training';
        break;
      case 'riskAssessments':
        window.location.href = '/risk-assessments';
        break;
      case 'policies':
        window.location.href = '/policies';
        break;
      default:
        break;
    }
  };

  const showReminder = (type, title, message) => {
    setReminderModalData({ type, title, message });
    setShowReminderModal(true);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Compliance Dashboard</h1>
              <p className="text-gray-600 text-sm">Monitor your HIPAA compliance status at a glance</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                <div className="w-2 h-2 border border-green-500 rounded-full bg-green-50"></div>
                <span className="text-sm text-gray-700 font-medium">System Active</span>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          {/* Compliance Score - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300">
              <StatusCard
                type="score"
                score={complianceData.score}
                title="Overall Compliance"
              />
            </div>
          </div>

          {/* Task Cards - Takes 9 columns, arranged in 3x3 grid */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden">
              <StatusCard
                type="task"
                status={complianceData.tasks.training.status}
                count={complianceData.tasks.training.count}
                title={complianceData.tasks.training.label}
                onClick={() => handleTaskClick('training')}
              />
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden">
              <StatusCard
                type="task"
                status={complianceData.tasks.riskAssessments.status}
                count={complianceData.tasks.riskAssessments.count}
                title={complianceData.tasks.riskAssessments.label}
                onClick={() => handleTaskClick('riskAssessments')}
              />
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden">
              <StatusCard
                type="task"
                status={complianceData.tasks.policies.status}
                count={complianceData.tasks.policies.count}
                title={complianceData.tasks.policies.label}
                onClick={() => handleTaskClick('policies')}
              />
            </div>
            
          </div>
        </div>

        {/* Charts and Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compliance Trends Chart */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Compliance Trends</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-3 h-3 border border-gray-500 rounded-full bg-gray-50"></div>
                <span>Score %</span>
              </div>
            </div>
            <div className="h-48">
              <ProgressChart type="line" data={complianceData.trends} />
            </div>
          </div>

          {/* Category Progress */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Category Progress</h3>
              <button className="text-gray-700 text-sm font-medium hover:text-gray-900 border border-gray-300 px-3 py-1 rounded hover:border-gray-400 transition-colors">
                View Details
              </button>
            </div>
            <div className="h-48 flex items-center">
              <ProgressChart type="bar" data={complianceData.categoryProgress} />
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mt-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              <button 
                onClick={() => showReminder('success', 'Calendar Sync', 'Calendar events have been synchronized successfully.')}
                className="text-gray-700 text-sm font-medium hover:text-gray-900 border border-gray-300 px-3 py-1 rounded hover:border-gray-400 transition-colors flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Event</span>
              </button>
            </div>
            <CalendarView 
              events={calendarEvents} 
              onEventClick={(event) => showReminder('info', event.title, event.description)}
            />
          </div>
        </div>

        {/* Reminder Modal */}
        {showReminderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  reminderModalData.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {reminderModalData.type === 'success' ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{reminderModalData.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{reminderModalData.message}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
