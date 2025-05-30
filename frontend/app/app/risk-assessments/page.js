
'use client';

import { useState, useEffect } from 'react';
import SRAGuide from './components/SRAGuide';
import VulnerabilityList from './components/VulnerabilityList';
import RemediationPlan from './components/RemediationPlan';
import BAAManagement from './components/BAAManagement';

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
    { label: 'Dashboard', href: '/app' },
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Security Risk Assessment</h1>
              <p className="mt-2 text-gray-600">
                Comprehensive HIPAA risk assessment and vulnerability management
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={generateReport}
                disabled={generatingReport}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {generatingReport ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
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
      
      {/* Comprehensive Risk Assessment Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-[1000px] max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header */}
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

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Executive Summary */}
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
                  Immediate attention is required for 4 critical risks that could result in significant regulatory violations 
                  and potential data breaches.
                </p>
              </div>

              {/* Risk Categories Analysis */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Risk Categories Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      Administrative Safeguards
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compliance Score:</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Critical Issues:</span>
                        <span className="font-medium text-red-600">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Medium Issues:</span>
                        <span className="font-medium text-yellow-600">4</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                      Physical Safeguards
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compliance Score:</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Critical Issues:</span>
                        <span className="font-medium text-red-600">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Medium Issues:</span>
                        <span className="font-medium text-yellow-600">3</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      Technical Safeguards
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compliance Score:</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Critical Issues:</span>
                        <span className="font-medium text-red-600">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Medium Issues:</span>
                        <span className="font-medium text-yellow-600">5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Risks */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Critical Risks</h3>
                <div className="space-y-4">
                  <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-800">Unencrypted Data Transmission</h4>
                        <p className="text-red-700 text-sm mt-1">PHI transmitted over unencrypted channels in legacy systems</p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Critical</span>
                    </div>
                    <div className="mt-3 text-sm text-red-700">
                      <strong>Impact:</strong> Potential HIPAA violation, data breach risk
                    </div>
                  </div>

                  <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-800">Inadequate Access Controls</h4>
                        <p className="text-red-700 text-sm mt-1">Lack of role-based access controls for PHI systems</p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Critical</span>
                    </div>
                    <div className="mt-3 text-sm text-red-700">
                      <strong>Impact:</strong> Unauthorized access to PHI, compliance violation
                    </div>
                  </div>

                  <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-yellow-800">Missing Audit Logs</h4>
                        <p className="text-yellow-700 text-sm mt-1">Insufficient logging of PHI access and modifications</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">High</span>
                    </div>
                    <div className="mt-3 text-sm text-yellow-700">
                      <strong>Impact:</strong> Inability to detect breaches, audit failures
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Immediate Action Items</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-red-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Implement end-to-end encryption</h4>
                      <p className="text-gray-600 text-sm">Deploy TLS 1.3 for all data transmission within 30 days</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-red-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Deploy role-based access controls</h4>
                      <p className="text-gray-600 text-sm">Implement RBAC system with principle of least privilege</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-yellow-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Enable comprehensive audit logging</h4>
                      <p className="text-gray-600 text-sm">Configure SIEM solution for real-time monitoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
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
    </div>
  );
}
