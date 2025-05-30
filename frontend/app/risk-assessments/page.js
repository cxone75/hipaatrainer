'use client';

import { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import SRAGuide from '../app/risk-assessments/components/SRAGuide';
import VulnerabilityList from '../app/risk-assessments/components/VulnerabilityList';
import RemediationPlan from '../app/risk-assessments/components/RemediationPlan';
import BAAManagement from '../app/risk-assessments/components/BAAManagement';

export default function RiskAssessmentPage() {
  const [activeTab, setActiveTab] = useState('questionnaire');
  const [assessmentData, setAssessmentData] = useState({
    questionnaire: {},
    vulnerabilities: [],
    remediationPlan: [],
    baas: []
  });
  const [generatingReport, setGeneratingReport] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Handle hash navigation for direct linking to tabs
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash === 'baas' || hash === 'baa') {
      setActiveTab('baas');
    }
  }, []);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Security Risk Assessment' }
  ];

  const tabs = [
    {
      id: 'questionnaire',
      label: 'SRA Questionnaire',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      id: 'vulnerabilities',
      label: 'Vulnerabilities',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z'
    },
    {
      id: 'remediation',
      label: 'Remediation Plan',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    },
    {
      id: 'baas',
      label: 'BAA Management',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    }
  ];

  const generateReport = () => {
    setGeneratingReport(true);
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(false);
      setShowReportModal(true);
    }, 2000);
  };

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security Risk Assessment</h1>
            <p className="text-gray-600 mt-2">Comprehensive security evaluation and compliance management</p>
          </div>
          <button
            onClick={generateReport}
            disabled={generatingReport}
            className="bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-900 transition-colors flex items-center space-x-2"
          >
            {generatingReport ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating Report...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Generate Report</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Risk Assessment Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <svg 
                  className={`w-5 h-5 mr-2 ${
                    activeTab === tab.id ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow border">
          {activeTab === 'questionnaire' && (
            <SRAGuide 
              assessmentData={assessmentData}
              onUpdateData={setAssessmentData}
            />
          )}
          {activeTab === 'vulnerabilities' && (
            <VulnerabilityList 
              vulnerabilities={assessmentData.vulnerabilities}
              onUpdateData={setAssessmentData}
            />
          )}
          {activeTab === 'remediation' && (
            <RemediationPlan 
              plan={assessmentData.remediationPlan}
              onUpdateData={setAssessmentData}
            />
          )}
          {activeTab === 'baas' && (
            <BAAManagement 
              baas={assessmentData.baas}
              onUpdateData={setAssessmentData}
            />
          )}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-[1000px] max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Comprehensive Risk Assessment Report</h2>
                <p className="text-gray-600 mt-1">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">4</div>
                    <div className="text-sm text-red-800">Critical Risks</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">7</div>
                    <div className="text-sm text-yellow-800">High Risks</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-blue-800">Medium Risks</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">76%</div>
                    <div className="text-sm text-green-800">Overall Score</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  This comprehensive risk assessment identifies critical vulnerabilities in your HIPAA compliance posture.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}