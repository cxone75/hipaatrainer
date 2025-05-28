'use client';

import { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
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
    { label: 'Dashboard', href: '/' },
    { label: 'Security Risk Assessment' }
  ];

  const tabs = [
    { id: 'questionnaire', label: 'SRA Questionnaire', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z' },
    { id: 'remediation', label: 'Remediation Plan', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'baas', label: 'BAA Management', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];

  const handleGenerateReport = async () => {
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
            onClick={handleGenerateReport}
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
      {/* Comprehensive Risk Assessment Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-[1000px] max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Comprehensive Risk Assessment Report</h2>
                <p className="text-gray-600 text-sm mt-1">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[75vh]">
              {/* Executive Summary */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    This comprehensive risk assessment report evaluates the current security posture of our HIPAA-compliant 
                    healthcare organization. The assessment covers administrative, physical, and technical safeguards as 
                    required by HIPAA regulations.
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-3xl font-bold text-blue-600">87%</div>
                      <div className="text-sm text-gray-600">Overall Compliance Score</div>
                    </div>
                    <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-3xl font-bold text-red-600">5</div>
                      <div className="text-sm text-gray-600">Critical Risks</div>
                    </div>
                    <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-3xl font-bold text-yellow-600">12</div>
                      <div className="text-sm text-gray-600">Medium Risks</div>
                    </div>
                    <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-3xl font-bold text-green-600">23</div>
                      <div className="text-sm text-gray-600">Controls Implemented</div>
                    </div>
                  </div>
                </div>
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
                        <span className="font-medium">91%</span>
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
                        <span className="font-medium">88%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Critical Issues:</span>
                        <span className="font-medium text-red-600">2</span>
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
                        <p className="text-red-700 text-sm mt-1">Some users have excessive permissions beyond job requirements</p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Critical</span>
                    </div>
                    <div className="mt-3 text-sm text-red-700">
                      <strong>Impact:</strong> Unauthorized PHI access, compliance violation
                    </div>
                  </div>

                  <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-800">Missing Audit Trail Documentation</h4>
                        <p className="text-orange-700 text-sm mt-1">Incomplete logging of PHI access and modifications</p>
                      </div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">High</span>
                    </div>
                    <div className="mt-3 text-sm text-orange-700">
                      <strong>Impact:</strong> Inability to track security incidents
                    </div>
                  </div>

                  <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-800">Outdated Security Software</h4>
                        <p className="text-orange-700 text-sm mt-1">Several critical systems running outdated antivirus and security patches</p>
                      </div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">High</span>
                    </div>
                    <div className="mt-3 text-sm text-orange-700">
                      <strong>Impact:</strong> Vulnerability to malware and cyber attacks
                    </div>
                  </div>

                  <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-yellow-800">Insufficient Staff Training</h4>
                        <p className="text-yellow-700 text-sm mt-1">20% of staff lacking current HIPAA training certification</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Medium</span>
                    </div>
                    <div className="mt-3 text-sm text-yellow-700">
                      <strong>Impact:</strong> Increased risk of human error and violations
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Status */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">HIPAA Compliance Status</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-200 px-4 py-3 text-left font-medium">Safeguard Category</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-medium">Required Controls</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-medium">Implemented</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3">Administrative</td>
                        <td className="border border-gray-200 px-4 py-3">12</td>
                        <td className="border border-gray-200 px-4 py-3">10</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Partial</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3">Physical</td>
                        <td className="border border-gray-200 px-4 py-3">8</td>
                        <td className="border border-gray-200 px-4 py-3">7</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Compliant</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3">Technical</td>
                        <td className="border border-gray-200 px-4 py-3">15</td>
                        <td className="border border-gray-200 px-4 py-3">13</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Partial</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Priority Recommendations</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-red-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Implement End-to-End Encryption</h4>
                      <p className="text-gray-600 text-sm mt-1">Deploy encryption for all data transmission channels, especially legacy systems.</p>
                      <p className="text-gray-500 text-xs mt-1"><strong>Timeline:</strong> 30 days | <strong>Priority:</strong> Critical</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-orange-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Review and Update Access Controls</h4>
                      <p className="text-gray-600 text-sm mt-1">Conduct comprehensive access review and implement principle of least privilege.</p>
                      <p className="text-gray-500 text-xs mt-1"><strong>Timeline:</strong> 45 days | <strong>Priority:</strong> High</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-yellow-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Enhance Audit Logging</h4>
                      <p className="text-gray-600 text-sm mt-1">Implement comprehensive audit logging for all PHI access and modifications.</p>
                      <p className="text-gray-500 text-xs mt-1"><strong>Timeline:</strong> 60 days | <strong>Priority:</strong> High</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Update Security Software</h4>
                      <p className="text-gray-600 text-sm mt-1">Update all security software and implement automated patch management.</p>
                      <p className="text-gray-500 text-xs mt-1"><strong>Timeline:</strong> 21 days | <strong>Priority:</strong> Medium</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
                    <li>Schedule remediation planning meeting within 7 days</li>
                    <li>Assign responsible parties for each critical and high-priority item</li>
                    <li>Establish weekly progress review meetings</li>
                    <li>Plan follow-up assessment in 90 days</li>
                    <li>Update risk register and board reporting materials</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end items-center p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Mock download functionality
                    const link = document.createElement('a');
                    link.href = 'data:text/plain;charset=utf-8,Comprehensive Risk Assessment Report - Generated on ' + new Date().toLocaleDateString();
                    link.download = 'risk-assessment-report-' + new Date().toISOString().split('T')[0] + '.pdf';
                    link.click();
                  }}
                  className="bg-purple-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-900 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}