
'use client';

import { useState } from 'react';

export default function RemediationPlan({ plan, onUpdateData }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  
  const mockRemediationPlan = [
    {
      id: 'encrypt-data',
      title: 'Implement End-to-End Encryption',
      description: 'Deploy TLS 1.3 for all data transmission and AES-256 for data at rest',
      priority: 'Critical',
      status: 'Planned',
      assignee: 'IT Security Team',
      dueDate: '2024-02-15',
      estimatedCost: '$15,000',
      estimatedEffort: '3-4 weeks',
      relatedVulnerabilities: ['unencrypted-data'],
      tasks: [
        { id: 1, title: 'Audit current encryption protocols', completed: false },
        { id: 2, title: 'Select encryption solutions', completed: false },
        { id: 3, title: 'Implement TLS 1.3 on web servers', completed: false },
        { id: 4, title: 'Configure database encryption', completed: false },
        { id: 5, title: 'Test encryption implementation', completed: false }
      ]
    },
    {
      id: 'mfa-implementation',
      title: 'Deploy Multi-Factor Authentication',
      description: 'Implement MFA across all systems accessing PHI',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Security Admin',
      dueDate: '2024-02-28',
      estimatedCost: '$8,000',
      estimatedEffort: '2-3 weeks',
      relatedVulnerabilities: ['missing-mfa', 'weak-passwords'],
      tasks: [
        { id: 1, title: 'Select MFA solution', completed: true },
        { id: 2, title: 'Configure MFA server', completed: true },
        { id: 3, title: 'Deploy to admin accounts', completed: false },
        { id: 4, title: 'Roll out to all users', completed: false },
        { id: 5, title: 'Conduct user training', completed: false }
      ]
    },
    {
      id: 'patch-management',
      title: 'Establish Patch Management Process',
      description: 'Create systematic approach to software updates and security patches',
      priority: 'High',
      status: 'Planned',
      assignee: 'System Administrator',
      dueDate: '2024-03-15',
      estimatedCost: '$5,000',
      estimatedEffort: '2 weeks',
      relatedVulnerabilities: ['outdated-software'],
      tasks: [
        { id: 1, title: 'Inventory all software systems', completed: false },
        { id: 2, title: 'Define patch testing procedures', completed: false },
        { id: 3, title: 'Set up automated patch management', completed: false },
        { id: 4, title: 'Create rollback procedures', completed: false }
      ]
    },
    {
      id: 'backup-strategy',
      title: 'Improve Data Backup Strategy',
      description: 'Implement robust 3-2-1 backup strategy with regular testing',
      priority: 'Medium',
      status: 'Planned',
      assignee: 'Data Management Team',
      dueDate: '2024-04-01',
      estimatedCost: '$12,000',
      estimatedEffort: '3 weeks',
      relatedVulnerabilities: ['data-backup'],
      tasks: [
        { id: 1, title: 'Assess current backup infrastructure', completed: false },
        { id: 2, title: 'Design 3-2-1 backup architecture', completed: false },
        { id: 3, title: 'Implement offsite backup solution', completed: false },
        { id: 4, title: 'Set up automated backup testing', completed: false },
        { id: 5, title: 'Create data recovery procedures', completed: false }
      ]
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planned': return 'bg-yellow-100 text-yellow-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (tasks) => {
    const completedTasks = tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Remediation Plan</h2>
            <p className="text-gray-600">Systematic approach to addressing identified vulnerabilities</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Action Item
          </button>
        </div>
      </div>

      {/* Plan Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {mockRemediationPlan.filter(item => item.priority === 'Critical').length}
          </div>
          <div className="text-sm text-red-800">Critical Actions</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {mockRemediationPlan.filter(item => item.status === 'In Progress').length}
          </div>
          <div className="text-sm text-blue-800">In Progress</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {mockRemediationPlan.filter(item => item.status === 'Completed').length}
          </div>
          <div className="text-sm text-green-800">Completed</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {Math.round(mockRemediationPlan.reduce((sum, item) => sum + calculateProgress(item.tasks), 0) / mockRemediationPlan.length)}%
          </div>
          <div className="text-sm text-yellow-800">Overall Progress</div>
        </div>
      </div>

      {/* Timeline View */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Timeline</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          {mockRemediationPlan
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((item, index) => {
              const daysUntilDue = getDaysUntilDue(item.dueDate);
              const isOverdue = daysUntilDue < 0;
              const progress = calculateProgress(item.tasks);
              
              return (
                <div key={item.id} className="relative flex items-start ml-8 mb-6">
                  <div className={`absolute -left-6 w-3 h-3 rounded-full border-2 ${
                    item.status === 'Completed' ? 'bg-green-500 border-green-500' :
                    item.status === 'In Progress' ? 'bg-blue-500 border-blue-500' :
                    'bg-white border-gray-300'
                  }`}></div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 w-full hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <span className="text-xs text-gray-500">Assignee</span>
                        <p className="text-sm font-medium">{item.assignee}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Due Date</span>
                        <p className={`text-sm font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                          {new Date(item.dueDate).toLocaleDateString()}
                          {isOverdue && ' (Overdue)'}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Cost Estimate</span>
                        <p className="text-sm font-medium">{item.estimatedCost}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs text-gray-700">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            progress === 100 ? 'bg-green-500' :
                            progress > 50 ? 'bg-blue-500' :
                            progress > 25 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedAction(item)}
                      className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                    >
                      View Tasks & Details →
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Action Item Details Modal */}
      {selectedAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{selectedAction.title}</h3>
                <button
                  onClick={() => setSelectedAction(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-gray-600 mb-4">{selectedAction.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm font-medium text-gray-700">Estimated Effort:</span>
                  <p className="text-sm text-gray-600">{selectedAction.estimatedEffort}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Related Vulnerabilities:</span>
                  <p className="text-sm text-gray-600">{selectedAction.relatedVulnerabilities.length} items</p>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">Task Checklist</h4>
              <div className="space-y-2">
                {selectedAction.tasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {/* Handle task completion */}}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-3"
                    />
                    <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedAction(null)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
