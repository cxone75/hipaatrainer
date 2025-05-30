'use client';

import { useState } from 'react';

export default function MockAudit() {
  const [selectedAuditType, setSelectedAuditType] = useState('comprehensive');
  const [auditResults, setAuditResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const auditTypes = [
    {
      id: 'comprehensive',
      name: 'Comprehensive HIPAA Audit',
      description: 'Complete evaluation of all HIPAA requirements',
      duration: '45-60 minutes',
      sections: ['Administrative Safeguards', 'Physical Safeguards', 'Technical Safeguards', 'Privacy Rules']
    },
    {
      id: 'technical',
      name: 'Technical Safeguards Audit',
      description: 'Focus on technical security measures',
      duration: '20-30 minutes',
      sections: ['Access Control', 'Audit Logs', 'Integrity', 'Transmission Security']
    },
    {
      id: 'privacy',
      name: 'Privacy Rules Audit',
      description: 'Review privacy policies and procedures',
      duration: '30-40 minutes',
      sections: ['Individual Rights', 'Privacy Notices', 'Minimum Necessary', 'Business Associates']
    }
  ];

  const runMockAudit = async () => {
    setIsRunning(true);
    setAuditResults(null);

    try {
      // Simulate audit execution
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate mock results
      const mockResults = {
        auditType: selectedAuditType,
        completedAt: new Date().toISOString(),
        overallScore: Math.floor(Math.random() * 20) + 75, // 75-95%
        sections: auditTypes.find(t => t.id === selectedAuditType).sections.map(section => ({
          name: section,
          score: Math.floor(Math.random() * 30) + 65, // 65-95%
          issues: Math.floor(Math.random() * 5),
          recommendations: Math.floor(Math.random() * 3) + 1
        })),
        findings: [
          {
            id: 1,
            severity: 'high',
            title: 'Incomplete Access Controls',
            description: 'Some user accounts lack proper role-based access restrictions',
            section: 'Technical Safeguards'
          },
          {
            id: 2,
            severity: 'medium',
            title: 'Audit Log Retention',
            description: 'Audit logs are not being retained for the required 6-year period',
            section: 'Technical Safeguards'
          },
          {
            id: 3,
            severity: 'low',
            title: 'Privacy Notice Updates',
            description: 'Privacy notice should be updated to reflect current practices',
            section: 'Privacy Rules'
          }
        ]
      };

      setAuditResults(mockResults);
    } catch (error) {
      console.error('Mock audit failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Mock Audit</h2>
        <p className="text-gray-600">
          Run simulated HIPAA compliance audits to identify potential issues before real audits.
        </p>
      </div>

      {!auditResults && (
        <div className="space-y-6">
          {/* Audit Type Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Audit Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {auditTypes.map((type) => (
                <div
                  key={type.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedAuditType === type.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAuditType(type.id)}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="auditType"
                      value={type.id}
                      checked={selectedAuditType === type.id}
                      onChange={() => setSelectedAuditType(type.id)}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <label className="ml-2 font-medium text-gray-900">{type.name}</label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <div className="text-xs text-gray-500 mb-2">Duration: {type.duration}</div>
                  <div className="text-xs text-gray-500">
                    Sections: {type.sections.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Run Audit Button */}
          <div className="text-center">
            <button
              onClick={runMockAudit}
              disabled={isRunning}
              className="bg-purple-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
            >
              {isRunning ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Running Audit...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Start Mock Audit</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Audit Results */}
      {auditResults && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Audit Results</h3>
            <button
              onClick={() => setAuditResults(null)}
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              Run New Audit
            </button>
          </div>

          {/* Overall Score */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(auditResults.overallScore)}`}>
                {auditResults.overallScore}%
              </div>
              <div className="text-gray-600">Overall Compliance Score</div>
              <div className="text-sm text-gray-500 mt-1">
                Completed: {new Date(auditResults.completedAt).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Section Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditResults.sections.map((section, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{section.name}</h4>
                  <span className={`text-lg font-semibold ${getScoreColor(section.score)}`}>
                    {section.score}%
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{section.issues} issues found</span>
                  <span>{section.recommendations} recommendations</span>
                </div>
              </div>
            ))}
          </div>

          {/* Findings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4">Key Findings</h4>
            <div className="space-y-4">
              {auditResults.findings.map((finding) => (
                <div key={finding.id} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(finding.severity)}`}>
                      {finding.severity.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">{finding.section}</span>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-1">{finding.title}</h5>
                  <p className="text-sm text-gray-600">{finding.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Review and address high-severity findings immediately</li>
              <li>• Create corrective action plans for identified issues</li>
              <li>• Schedule follow-up audits to track improvements</li>
              <li>• Update documentation and policies as needed</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}