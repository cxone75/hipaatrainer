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