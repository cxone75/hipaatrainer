
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

      if (response.ok) {
        const data = await response.json();
        setAuditResults(data);
      } else {
        // Fallback to mock data if API fails
        generateMockResults();
      }
    } catch (error) {
      console.error('Error running mock audit:', error);
      // Fallback to mock data if API fails
      generateMockResults();
    } finally {
      setIsRunning(false);
    }
  };

  const generateMockResults = () => {
    const selectedType = auditTypes.find(t => t.id === selectedAuditType);
    const mockResults = {
      auditType: selectedType.name,
      completedAt: new Date().toISOString(),
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100%
      checksPerformed: selectedType.checks,
      findings: [
        {
          id: 'finding-1',
          category: 'Administrative Safeguards',
          severity: 'medium',
          title: 'Missing workforce training documentation',
          description: 'Some employees lack documented HIPAA training completion records',
          recommendation: 'Implement a training tracking system and ensure all staff complete annual training'
        },
        {
          id: 'finding-2',
          category: 'Technical Safeguards',
          severity: 'high',
          title: 'Insufficient access controls',
          description: 'User access privileges are not regularly reviewed and updated',
          recommendation: 'Establish quarterly access reviews and implement role-based access controls'
        }
      ],
      passed: [
        'Encryption of PHI at rest and in transit',
        'Business Associate Agreements in place',
        'Incident response procedures documented',
        'Risk assessment conducted within required timeframe'
      ],
      recommendations: [
        'Implement automated access review processes',
        'Enhance workforce training tracking',
        'Consider additional technical safeguards for mobile devices',
        'Develop more detailed incident response procedures'
      ]
    };

    // Simulate processing time
    setTimeout(() => {
      setAuditResults(mockResults);
    }, 3000);
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
                  <div className="flex items-center justify-between text-sm text-gray-500">
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
              <div className="text-4xl font-bold text-purple-800 mb-2">{auditResults.overallScore}%</div>
              <div className="text-lg text-gray-600">Overall Compliance Score</div>
              <div className="text-sm text-gray-500 mt-2">
                Based on {auditResults.checksPerformed} compliance checks
              </div>
            </div>
          </div>

          {/* Findings */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Findings Requiring Attention</h3>
            <div className="space-y-4">
              {auditResults.findings.map((finding) => (
                <div
                  key={finding.id}
                  className={`border rounded-lg p-4 ${
                    finding.severity === 'high' ? 'border-red-200 bg-red-50' :
                    finding.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                    'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-semibold ${
                      finding.severity === 'high' ? 'text-red-800' :
                      finding.severity === 'medium' ? 'text-yellow-800' :
                      'text-blue-800'
                    }`}>
                      {finding.title}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      finding.severity === 'high' ? 'bg-red-100 text-red-800' :
                      finding.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {finding.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className={`text-sm mb-3 ${
                    finding.severity === 'high' ? 'text-red-700' :
                    finding.severity === 'medium' ? 'text-yellow-700' :
                    'text-blue-700'
                  }`}>
                    {finding.description}
                  </p>
                  <div className={`text-sm ${
                    finding.severity === 'high' ? 'text-red-700' :
                    finding.severity === 'medium' ? 'text-yellow-700' :
                    'text-blue-700'
                  }`}>
                    <strong>Recommendation:</strong> {finding.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Passed Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas of Compliance</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <ul className="space-y-2">
                {auditResults.passed.map((item, index) => (
                  <li key={index} className="flex items-center text-green-800">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
