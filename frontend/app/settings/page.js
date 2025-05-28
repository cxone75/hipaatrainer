'use client';

import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import AlertModal from '../components/AlertModal';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    automaticCourseAssignment: {
      enabled: false,
      course: '',
      frequency: '',
      dueDate: ''
    },
    notifyOnCompletion: {
      enabled: false,
      email: false,
      sms: false
    },
    notifyOnPastDue: {
      enabled: false,
      email: false,
      sms: false
    },
    emailComplianceSummary: {
      enabled: false,
      frequency: ''
    }
  });

  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  // Sample course options
  const courseOptions = [
    { value: 'hipaa-fundamentals', label: 'HIPAA Fundamentals' },
    { value: 'osha-safety', label: 'OSHA Workplace Safety' },
    { value: 'advanced-privacy', label: 'Advanced Privacy Practices' },
    { value: 'incident-response', label: 'Incident Response Protocol' }
  ];

  // Frequency options
  const frequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'semi-annually', label: 'Semi-Annually' },
    { value: 'annually', label: 'Annually' }
  ];

  // Due date options
  const dueDateOptions = [
    { value: '7-days', label: '7 Days' },
    { value: '14-days', label: '14 Days' },
    { value: '30-days', label: '30 Days' },
    { value: '60-days', label: '60 Days' },
    { value: '90-days', label: '90 Days' }
  ];

  // Summary frequency options
  const summaryFrequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API call
      console.log('Saving settings:', settings);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
      setAlertModal({
        isOpen: true,
        title: 'Success',
        message: 'Settings saved successfully!',
        type: 'success'
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      setAlertModal({
        isOpen: true,
        title: 'Error',
        message: 'Error saving settings. Please try again.',
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Settings' }
  ];

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-gray-600">Configure your compliance and notification preferences</p>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={!hasChanges || saving}
            className="bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        <div className="space-y-8">
          {/* Automatic Course Assignment */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Automatic Course Assignment</h2>
                <p className="text-sm text-gray-600 mt-1">Automatically assign training courses to users based on schedule</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.automaticCourseAssignment.enabled}
                  onChange={(e) => handleSettingChange('automaticCourseAssignment', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-800"></div>
              </label>
            </div>

            {settings.automaticCourseAssignment.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <select
                    value={settings.automaticCourseAssignment.course}
                    onChange={(e) => handleSettingChange('automaticCourseAssignment', 'course', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a course</option>
                    {courseOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select
                    value={settings.automaticCourseAssignment.frequency}
                    onChange={(e) => handleSettingChange('automaticCourseAssignment', 'frequency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select frequency</option>
                    {frequencyOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <select
                    value={settings.automaticCourseAssignment.dueDate}
                    onChange={(e) => handleSettingChange('automaticCourseAssignment', 'dueDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select due date</option>
                    {dueDateOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Notify on Assignment Completion */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Notify on Assignment Completion</h2>
                <p className="text-sm text-gray-600 mt-1">Receive notifications when users complete their training assignments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifyOnCompletion.enabled}
                  onChange={(e) => handleSettingChange('notifyOnCompletion', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-800"></div>
              </label>
            </div>

            {settings.notifyOnCompletion.enabled && (
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="completion-email"
                    checked={settings.notifyOnCompletion.email}
                    onChange={(e) => handleSettingChange('notifyOnCompletion', 'email', e.target.checked)}
                    className="h-4 w-4 text-purple-800 focus:ring-purple-800 border-gray-300 rounded"
                  />
                  <label htmlFor="completion-email" className="ml-2 text-sm text-gray-700">By Email</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="completion-sms"
                    checked={settings.notifyOnCompletion.sms}
                    onChange={(e) => handleSettingChange('notifyOnCompletion', 'sms', e.target.checked)}
                    className="h-4 w-4 text-purple-800 focus:ring-purple-800 border-gray-300 rounded"
                  />
                  <label htmlFor="completion-sms" className="ml-2 text-sm text-gray-700">By SMS</label>
                </div>
              </div>
            )}
          </div>

          {/* Notify on Assignment Past Due */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Notify on Assignment Past Due</h2>
                <p className="text-sm text-gray-600 mt-1">Receive notifications when training assignments are overdue</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifyOnPastDue.enabled}
                  onChange={(e) => handleSettingChange('notifyOnPastDue', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-800"></div>
              </label>
            </div>

            {settings.notifyOnPastDue.enabled && (
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pastdue-email"
                    checked={settings.notifyOnPastDue.email}
                    onChange={(e) => handleSettingChange('notifyOnPastDue', 'email', e.target.checked)}
                    className="h-4 w-4 text-purple-800 focus:ring-purple-800 border-gray-300 rounded"
                  />
                  <label htmlFor="pastdue-email" className="ml-2 text-sm text-gray-700">By Email</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pastdue-sms"
                    checked={settings.notifyOnPastDue.sms}
                    onChange={(e) => handleSettingChange('notifyOnPastDue', 'sms', e.target.checked)}
                    className="h-4 w-4 text-purple-800 focus:ring-purple-800 border-gray-300 rounded"
                  />
                  <label htmlFor="pastdue-sms" className="ml-2 text-sm text-gray-700">By SMS</label>
                </div>
              </div>
            )}
          </div>

          {/* Email Compliance Summary */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Email Compliance Summary</h2>
                <p className="text-sm text-gray-600 mt-1">Receive periodic compliance summary reports via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailComplianceSummary.enabled}
                  onChange={(e) => handleSettingChange('emailComplianceSummary', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-800"></div>
              </label>
            </div>

            {settings.emailComplianceSummary.enabled && (
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={settings.emailComplianceSummary.frequency}
                  onChange={(e) => handleSettingChange('emailComplianceSummary', 'frequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select frequency</option>
                  {summaryFrequencyOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Save Changes Notice */}
        {hasChanges && (
          <div className="fixed bottom-4 right-4 bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              You have unsaved changes
            </div>
          </div>
        )}
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </MainLayout>
  );
}