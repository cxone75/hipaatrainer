
'use client';

import { useState, useEffect } from 'react';

export default function RemediationPlan({ plan, onUpdateData }) {
  const [remediationPlan, setRemediationPlan] = useState([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    // Initialize with AI-generated sample remediation plan
    const samplePlan = [
      {
        id: 'implement-mfa',
        title: 'Implement Multi-Factor Authentication',
        description: 'Deploy MFA across all critical systems and user accounts',
        priority: 'High',
        estimatedCost: 500,
        timeframe: '30 days',
        riskReduction: 30,
        effort: 'Medium',
        category: 'Authentication',
        steps: [
          'Evaluate MFA solutions',
          'Configure MFA for admin accounts',
          'Roll out to all users',
          'Provide user training'
        ],
        status: 'Not Started',
        assignee: 'IT Security Team',
        impact: 'Significantly reduces account takeover risk'
      },
      {
        id: 'email-encryption',
        title: 'Enable Email Encryption',
        description: 'Implement end-to-end encryption for all email communications',
        priority: 'High',
        estimatedCost: 1200,
        timeframe: '45 days',
        riskReduction: 40,
        effort: 'High',
        category: 'Data Protection',
        steps: [
          'Select encryption solution',
          'Configure email servers',
          'Deploy client certificates',
          'Train staff on encrypted email'
        ],
        status: 'In Progress',
        assignee: 'IT Infrastructure Team',
        impact: 'Protects sensitive data in transit'
      },
      {
        id: 'password-policy',
        title: 'Strengthen Password Policy',
        description: 'Update password requirements and implement regular rotation',
        priority: 'Medium',
        estimatedCost: 200,
        timeframe: '14 days',
        riskReduction: 20,
        effort: 'Low',
        category: 'Access Control',
        steps: [
          'Define new password policy',
          'Update system configurations',
          'Notify users of changes',
          'Monitor compliance'
        ],
        status: 'Not Started',
        assignee: 'IT Security Team',
        impact: 'Reduces brute force attack success'
      },
      {
        id: 'software-updates',
        title: 'System Software Updates',
        description: 'Update all outdated software components to latest secure versions',
        priority: 'Critical',
        estimatedCost: 800,
        timeframe: '21 days',
        riskReduction: 50,
        effort: 'High',
        category: 'System Security',
        steps: [
          'Audit current software versions',
          'Test updates in staging environment',
          'Schedule maintenance windows',
          'Deploy updates to production'
        ],
        status: 'Planning',
        assignee: 'DevOps Team',
        impact: 'Eliminates known vulnerability exploits'
      },
      {
        id: 'backup-strategy',
        title: 'Improve Backup Strategy',
        description: 'Implement automated, tested backup and recovery procedures',
        priority: 'Medium',
        estimatedCost: 600,
        timeframe: '60 days',
        riskReduction: 25,
        effort: 'Medium',
        category: 'Business Continuity',
        steps: [
          'Design backup architecture',
          'Implement automated backups',
          'Create recovery procedures',
          'Test restoration process'
        ],
        status: 'Not Started',
        assignee: 'IT Operations Team',
        impact: 'Ensures business continuity'
      }
    ];

    setRemediationPlan(samplePlan);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'not started':
        return 'bg-gray-100 text-gray-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGeneratePlan = async () => {
    setGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGenerating(false);
      // Add a new AI-generated action
      const newAction = {
        id: 'ai-generated-' + Date.now(),
        title: 'Enhanced Network Monitoring',
        description: 'Deploy advanced threat detection and monitoring tools',
        priority: 'High',
        estimatedCost: 1500,
        timeframe: '90 days',
        riskReduction: 35,
        effort: 'High',
        category: 'Network Security',
        steps: [
          'Evaluate monitoring solutions',
          'Design monitoring architecture',
          'Deploy monitoring tools',
          'Configure alerting rules'
        ],
        status: 'Not Started',
        assignee: 'Security Team',
        impact: 'Provides early threat detection'
      };
      setRemediationPlan(prev => [newAction, ...prev]);
    }, 2000);
  };

  const handleStatusChange = (actionId, newStatus) => {
    setRemediationPlan(prev =>
      prev.map(action =>
        action.id === actionId ? { ...action, status: newStatus } : action
      )
    );
  };

  const totalCost = remediationPlan.reduce((sum, action) => sum + action.estimatedCost, 0);
  const totalRiskReduction = remediationPlan.reduce((sum, action) => sum + action.riskReduction, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">AI-Generated Remediation Plan</h2>
          <p className="text-gray-600">Actionable steps to address identified security risks</p>
        </div>
        <button
          onClick={handleGeneratePlan}
          disabled={generating}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center space-x-2"
        >
          {generating ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Actions</span>
            </>
          )}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-green-600">{totalRiskReduction}%</div>
              <div className="text-sm text-green-800">Total Risk Reduction</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-blue-600">${totalCost.toLocaleString()}</div>
              <div className="text-sm text-blue-800">Total Investment</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-purple-600">{remediationPlan.length}</div>
              <div className="text-sm text-purple-800">Action Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="space-y-6">
        {remediationPlan.map((action) => (
          <div 
            key={action.id}
            className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(action.priority)}`}>
                    {action.priority} Priority
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(action.status)}`}>
                    {action.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{action.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Cost:</span>
                    <div className="text-gray-600">${action.estimatedCost.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Timeframe:</span>
                    <div className="text-gray-600">{action.timeframe}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Risk Reduction:</span>
                    <div className="text-gray-600">{action.riskReduction}%</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Effort:</span>
                    <div className="text-gray-600">{action.effort}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="font-medium text-gray-700 text-sm">Assignee:</span>
                  <span className="ml-2 text-gray-600 text-sm">{action.assignee}</span>
                </div>

                <div className="mb-4">
                  <span className="font-medium text-gray-700 text-sm">Impact:</span>
                  <p className="text-gray-600 text-sm mt-1">{action.impact}</p>
                </div>

                <div className="mb-4">
                  <span className="font-medium text-gray-700 text-sm">Implementation Steps:</span>
                  <ul className="mt-2 space-y-1">
                    {action.steps.map((step, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="ml-4 flex flex-col space-y-2">
                <select
                  value={action.status}
                  onChange={(e) => handleStatusChange(action.id, e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  Edit Action
                </button>
              </div>
            </div>

            {/* ROI Indicator */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">ROI Estimate:</span>
                <span className="text-green-600 font-medium">
                  {((action.riskReduction / action.estimatedCost) * 1000).toFixed(1)}% reduction per $1000
                </span>
              </div>
            </div>
          </div>
        ))}

        {remediationPlan.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No remediation actions</h3>
            <p className="mt-1 text-sm text-gray-500">Generate AI recommendations to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
