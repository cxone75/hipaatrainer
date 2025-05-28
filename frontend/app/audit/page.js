'use client';

import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import DocumentList from './components/DocumentList';
import CorrectiveActions from './components/CorrectiveActions';
import MockAudit from './components/MockAudit';
import AlertModal from '../components/AlertModal';

export default function AuditPreparation() {
  const [activeTab, setActiveTab] = useState('documents');
  const [showReportModal, setShowReportModal] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: '', message: '', type: 'info' });
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [mockReport, setMockReport] = useState(null);

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock report data
      const reportData = {
        generatedAt: new Date().toISOString(),
        reportId: `AUD-${Date.now()}`,
        organization: 'Healthcare Solutions Inc.',
        reportType: 'Comprehensive Audit Preparation Report',
        summary: {
          totalDocuments: 24,
          documentsReviewed: 21,
          complianceScore: 87,
          criticalIssues: 3,
          recommendations: 12
        },
        sections: [
          {
            title: 'Document Repository Status',
            status: 'Good',
            details: '21 of 24 required documents are current and properly maintained.',
            items: [
              'HIPAA Privacy Policies - Current',
              'Security Risk Assessment - Needs Update',
              'Business Associate Agreements - Current',
              'Incident Response Plan - Current'
            ]
          },
          {
            title: 'Mock Audit Results',
            status: 'Attention Required',
            details: 'Recent mock audit identified areas for improvement.',
            items: [
              'Administrative Safeguards: 85%',
              'Physical Safeguards: 92%',
              'Technical Safeguards: 65%',
              'Privacy Rules: 88%'
            ]
          },
          {
            title: 'Corrective Actions',
            status: 'In Progress',
            details: '8 of 12 corrective actions have been completed.',
            items: [
              'Implement multi-factor authentication - In Progress',
              'Update workforce training - Completed',
              'Enhance audit logging - Pending',
              'Review access controls - Completed'
            ]
          }
        ],
        recommendations: [
          'Prioritize technical safeguards implementation',
          'Complete outstanding risk assessment updates',
          'Schedule quarterly compliance reviews',
          'Enhance staff training on privacy procedures'
        ]
      };

      setMockReport(reportData);
      setShowReportModal(true);
    } catch (error) {
      console.error('Error generating report:', error);
      setAlertModal({
        isOpen: true,
        title: 'Error',
        message: 'Failed to generate report. Please try again.',
        type: 'error',
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Audit Preparation', href: '/audit' }
  ];

  const tabs = [
    { id: 'documents', label: 'Document Repository', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'mock-audit', label: 'Mock Audit', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'corrective-actions', label: 'Corrective Actions', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' }
  ];

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Audit Preparation</h1>
            <p className="text-gray-600">
              Prepare for compliance audits with comprehensive documentation and mock audit tools.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleGenerateReport}
              disabled={isGeneratingReport}
              className="bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isGeneratingReport ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Audit preparation sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-purple-800 text-purple-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-96" role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
          {activeTab === 'documents' && <DocumentList />}
          {activeTab === 'mock-audit' && <MockAudit />}
          {activeTab === 'corrective-actions' && <CorrectiveActions />}
        </div>

        {/* Mock Report Modal */}
        {showReportModal && mockReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{mockReport.reportType}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Generated on {new Date(mockReport.generatedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Report Summary */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Executive Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{mockReport.summary.totalDocuments}</div>
                      <div className="text-sm text-blue-800">Total Documents</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{mockReport.summary.complianceScore}%</div>
                      <div className="text-sm text-green-800">Compliance Score</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{mockReport.summary.criticalIssues}</div>
                      <div className="text-sm text-yellow-800">Critical Issues</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{mockReport.summary.recommendations}</div>
                      <div className="text-sm text-purple-800">Recommendations</div>
                    </div>
                  </div>
                </div>

                {/* Report Sections */}
                <div className="space-y-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900">Detailed Analysis</h3>
                  {mockReport.sections.map((section, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-md font-medium text-gray-900">{section.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          section.status === 'Good' ? 'bg-green-100 text-green-800' :
                          section.status === 'Attention Required' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {section.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{section.details}</p>
                      <ul className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-gray-700 flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Key Recommendations</h3>
                  <ul className="space-y-2">
                    {mockReport.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-blue-800">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-500">
                  Report ID: {mockReport.reportId} | Organization: {mockReport.organization}
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setAlertModal({ isOpen: true, title: 'Info', message: 'Export functionality would be implemented here', type: 'info' })}
                    className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
              <AlertModal
                  isOpen={alertModal.isOpen}
                  title={alertModal.title}
                  message={alertModal.message}
                  type={alertModal.type}
                  onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
              />
      </div>
    </MainLayout>
  );
}