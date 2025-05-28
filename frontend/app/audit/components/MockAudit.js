
'use client';

import { useState } from 'react';

export default function MockAudit() {
  const [isRunning, setIsRunning] = useState(false);
  const [auditResults, setAuditResults] = useState(null);
  const [selectedAuditType, setSelectedAuditType] = useState('comprehensive');

  const auditTypes = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Audit',
      description: 'Full HIPAA compliance audit covering all requirements',
      duration: '15-20 minutes',
      checks: 45
    },
    {
      id: 'security',
      name: 'Security Focused',
      description: 'Focus on security safeguards and technical requirements',
      duration: '8-12 minutes',
      checks: 25
    },
    {
      id: 'privacy',
      name: 'Privacy Rules',
      description: 'Privacy rule compliance and patient rights',
      duration: '10-15 minutes',
      checks: 20
    },
    {
      id: 'administrative',
      name: 'Administrative Safeguards',
      description: 'Administrative requirements and policies',
      duration: '6-10 minutes',
      checks: 18
    }
  ];

  const runMockAudit = async () => {
    setIsRunning(true);
    setAuditResults(null);

    try {
      // Simulate API call to run mock audit
      const response = await fetch('/api/audit/mock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auditType: selectedAuditType,
        }),
      });

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock results for demonstration
      const mockResults = {
        auditType: selectedAuditType,
        completedAt: new Date().toISOString(),
        overallScore: 78,
        totalChecks: auditTypes.find(t => t.id === selectedAuditType).checks,
        passedChecks: Math.floor(auditTypes.find(t => t.id === selectedAuditType).checks * 0.78),
        categories: [
          {
            name: 'Administrative Safeguards',
            score: 85,
            totalChecks: 12,
            passedChecks: 10,
            issues: [
              {
                severity: 'Medium',
                title: 'Missing workforce training documentation',
                description: 'Some employees lack documented HIPAA training completion records.'
              },
              {
                severity: 'Low',
                title: 'Outdated access control procedures',
                description: 'Access control documentation needs updating to reflect current practices.'
              }
            ]
          },
          {
            name: 'Physical Safeguards',
            score: 92,
            totalChecks: 8,
            passedChecks: 7,
            issues: [
              {
                severity: 'Low',
                title: 'Workstation positioning',
                description: 'Some workstations in public areas lack privacy screens.'
              }
            ]
          },
          {
            name: 'Technical Safeguards',
            score: 65,
            totalChecks: 15,
            passedChecks: 10,
            issues: [
              {
                severity: 'High',
                title: 'Multi-factor authentication not implemented',
                description: 'Critical systems lack multi-factor authentication protection.'
              },
              {
                severity: 'Medium',
                title: 'Encryption gaps identified',
                description: 'Some data transmissions are not properly encrypted.'
              },
              {
                severity: 'Medium',
                title: 'Audit log monitoring',
                description: 'Automated audit log monitoring needs improvement.'
              }
            ]
          },
          {
            name: 'Privacy Rules',
            score: 88,
            totalChecks: 10,
            passedChecks: 9,
            issues: [
              {
                severity: 'Low',
                title: 'Notice of Privacy Practices updates',
                description: 'Privacy notices need minor updates for current regulations.'
              }
            ]
          }
        ],
        recommendations: [
          'Implement multi-factor authentication for all system access',
          'Update workforce training documentation and tracking',
          'Enhance encryption protocols for all data transmissions',
          'Install privacy screens for workstations in public areas',
          'Improve automated audit log monitoring systems'
        ]
      };

      setAuditResults(mockResults);
    } catch (error) {
      console.error('Error running mock audit:', error);
      alert('Failed to run mock audit. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
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
      {!auditResults ? (
        <div>
          {/* Audit Type Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Audit Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditTypes.map((type) => (
                <div
                  key={type.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedAuditType === type.id
                      ? 'border-purple-800 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAuditType(type.id)}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={type.id}
                      name="auditType"
                      value={type.id}
                      checked={selectedAuditType === type.id}
                      onChange={() => setSelectedAuditType(type.id)}
                      className="h-4 w-4 text-purple-800 focus:ring-purple-800 border-gray-300"
                    />
                    <label htmlFor={type.id} className="ml-3 text-lg font-medium text-gray-900">
                      {type.name}
                    </label>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Duration: {type.duration}</span>
                    <span>{type.checks} checks</span>
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
              className="bg-purple-800 text-white px-8 py-4 rounded-lg font-medium hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
            >
              {isRunning ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Running Mock Audit...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Run Mock Audit</span>
                </>
              )}
            </button>
            {isRunning && (
              <p className="mt-4 text-gray-600">
                Running {auditTypes.find(t => t.id === selectedAuditType).name}...
                <br />
                This may take a few minutes to complete.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Audit Results */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Mock Audit Results</h2>
              <button
                onClick={() => setAuditResults(null)}
                className="text-purple-800 hover:text-purple-900 font-medium"
              >
                Run New Audit
              </button>
            </div>
            <p className="text-gray-600">
              Completed: {new Date(auditResults.completedAt).toLocaleString()}
            </p>
          </div>

          {/* Overall Score */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(auditResults.overallScore)}`}>
                {auditResults.overallScore}%
              </div>
              <p className="text-gray-600 mb-4">Overall Compliance Score</p>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-green-600">{auditResults.passedChecks}</div>
                  <div className="text-gray-600">Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-red-600">{auditResults.totalChecks - auditResults.passedChecks}</div>
                  <div className="text-gray-600">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-600">{auditResults.totalChecks}</div>
                  <div className="text-gray-600">Total</div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Results */}
          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
            {auditResults.categories.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">{category.name}</h4>
                  <div className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                    {category.score}%
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>{category.passedChecks} of {category.totalChecks} checks passed</span>
                </div>
                
                {category.issues.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Issues Found</h5>
                    <div className="space-y-3">
                      {category.issues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="border-l-4 border-gray-200 pl-4">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                              {issue.severity}
                            </span>
                            <h6 className="font-medium text-gray-900">{issue.title}</h6>
                          </div>
                          <p className="text-gray-600 text-sm">{issue.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Recommendations</h3>
            <ul className="space-y-2">
              {auditResults.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-blue-800">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
