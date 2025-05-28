'use client';

import { useState, useEffect } from 'react';
import CorrectiveActionModal from './CorrectiveActionModal';

export default function CorrectiveActions() {
  const [actions, setActions] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    // Sample corrective actions data - replace with actual API call
    const sampleActions = [
      {
        id: 'ca-001',
        title: 'Implement Multi-Factor Authentication',
        description: 'Deploy MFA for all system access points to enhance security',
        category: 'Technical Safeguards',
        priority: 'High',
        status: 'In Progress',
        assignedTo: 'IT Security Team',
        assignedToEmail: 'security@company.com',
        dueDate: '2025-07-01',
        createdDate: '2024-01-15',
        completionDate: null,
        estimatedCost: '$500',
        riskReduction: '30%',
        compliance: ['164.312(a)(2)(i)', '164.308(a)(5)(ii)(D)'],
        progress: 65,
        notes: 'Hardware tokens ordered, software configuration in progress'
      },
      {
        id: 'ca-002',
        title: 'Update Employee Training Program',
        description: 'Revise and enhance HIPAA training materials and tracking system',
        category: 'Administrative Safeguards',
        priority: 'Medium',
        status: 'Pending',
        assignedTo: 'HR Department',
        assignedToEmail: 'hr@company.com',
        dueDate: '2025-06-15',
        createdDate: '2024-01-20',
        completionDate: null,
        estimatedCost: '$1,200',
        riskReduction: '20%',
        compliance: ['164.308(a)(5)', '164.530(b)'],
        progress: 0,
        notes: 'Waiting for budget approval'
      },
      {
        id: 'ca-003',
        title: 'Install Privacy Screens',
        description: 'Install privacy screens on workstations in public areas',
        category: 'Physical Safeguards',
        priority: 'Low',
        status: 'Completed',
        assignedTo: 'Facilities Management',
        assignedToEmail: 'facilities@company.com',
        dueDate: '2025-05-01',
        createdDate: '2024-01-10',
        completionDate: '2024-01-25',
        estimatedCost: '$300',
        riskReduction: '10%',
        compliance: ['164.310(a)(1)', '164.310(b)'],
        progress: 100,
        notes: 'All workstations now equipped with privacy screens'
      },
      {
        id: 'ca-004',
        title: 'Enhance Data Encryption',
        description: 'Implement end-to-end encryption for all data transmissions',
        category: 'Technical Safeguards',
        priority: 'High',
        status: 'In Progress',
        assignedTo: 'Development Team',
        assignedToEmail: 'dev@company.com',
        dueDate: '2025-08-01',
        createdDate: '2024-01-22',
        completionDate: null,
        estimatedCost: '$2,500',
        riskReduction: '25%',
        compliance: ['164.312(a)(2)(iv)', '164.312(e)(1)'],
        progress: 40,
        notes: 'SSL certificates updated, database encryption in progress'
      },
      {
        id: 'ca-005',
        title: 'Business Associate Agreement Review',
        description: 'Review and update all business associate agreements',
        category: 'Administrative Safeguards',
        priority: 'Medium',
        status: 'Overdue',
        assignedTo: 'Legal Department',
        assignedToEmail: 'legal@company.com',
        dueDate: '2024-12-31',
        createdDate: '2024-01-05',
        completionDate: null,
        estimatedCost: '$800',
        riskReduction: '15%',
        compliance: ['164.308(b)(1)', '164.314(a)'],
        progress: 25,
        notes: 'Delayed due to vendor negotiations'
      }
    ];
    setActions(sampleActions);
  }, []);

  const filteredActions = actions.filter(action => {
    const matchesStatus = filterStatus === 'all' || action.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || action.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate, status) => {
    return status !== 'Completed' && new Date(dueDate) < new Date();
  };

  const updateActionStatus = (actionId, newStatus) => {
    setActions(prev => prev.map(action =>
      action.id === actionId
        ? {
            ...action,
            status: newStatus,
            completionDate: newStatus === 'Completed' ? new Date().toISOString().split('T')[0] : null,
            progress: newStatus === 'Completed' ? 100 : action.progress
          }
        : action
    ));
  };

  const handleSaveAction = async (newAction) => {
    try {
      // Here you would typically make an API call to save the action
      // For now, we'll just add it to the local state
      setActions(prev => [newAction, ...prev]);

      // TODO: Add audit log entry
      console.log('New corrective action added:', newAction);
    } catch (error) {
      console.error('Error saving corrective action:', error);
      throw error;
    }
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
        <div className="md:ml-auto">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center space-x-2 h-12"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Corrective Action</span>
          </button>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-4">
        {filteredActions.map((action) => (
          <div key={action.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex-1">{action.title}</h3>
              <div className="flex space-x-2 ml-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(action.status)}`}>
                  {action.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                  {action.priority}
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{action.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned to:</span>
                <span className="text-gray-900">{action.assignedTo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Due Date:</span>
                <span className={isOverdue(action.dueDate, action.status) ? 'text-red-600 font-medium' : 'text-gray-900'}>
                  {new Date(action.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cost:</span>
                <span className="text-gray-900">{action.estimatedCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Risk Reduction:</span>
                <span className="text-green-600 font-medium">{action.riskReduction}</span>
              </div>
            </div>
            {action.status !== 'Completed' && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{action.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-800 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${action.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table 
            className="min-w-full bg-white border border-gray-200 rounded-lg"
            aria-label="Corrective Actions Table"
          >
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredActions.map((action) => (
                <tr key={action.id} className="hover:bg-gray-50" tabIndex={0}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{action.title}</div>
                      <div className="text-sm text-gray-500">{action.description}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Risk Reduction: <span className="text-green-600 font-medium">{action.riskReduction}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{action.assignedTo}</div>
                    <div className="text-xs text-gray-500">{action.assignedToEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                      {action.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={action.status}
                      onChange={(e) => updateActionStatus(action.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-purple-800 ${getStatusColor(action.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm ${isOverdue(action.dueDate, action.status) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                      {new Date(action.dueDate).toLocaleDateString()}
                    </div>
                    {isOverdue(action.dueDate, action.status) && (
                      <div className="text-xs text-red-500">Overdue</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-800 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${action.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-8">{action.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{action.estimatedCost}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-purple-800 hover:text-purple-900 text-sm font-medium"
                      onClick={() => {
                        setSelectedAction(action);
                        setShowDetailsModal(true);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredActions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No corrective actions found</h3>
          <p className="text-gray-600">Try adjusting your filter criteria or add a new action.</p>
        </div>
      )}

      {/* Corrective Action Modal */}
      <CorrectiveActionModal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSave={handleSaveAction}
      />

      {/* Details Modal */}
      {showDetailsModal && selectedAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedAction.title}</h2>
                <div className="flex items-center space-x-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAction.status)}`}>
                    {selectedAction.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedAction.priority)}`}>
                    {selectedAction.priority} Priority
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedAction(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700">{selectedAction.description}</p>
                  </div>

                  {/* Assignment Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Assignment</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assigned to:</span>
                        <span className="font-medium text-gray-900">{selectedAction.assignedTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="text-gray-900">{selectedAction.assignedToEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="text-gray-900">{selectedAction.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Timeline</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="text-gray-900">{new Date(selectedAction.createdDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className={isOverdue(selectedAction.dueDate, selectedAction.status) ? 'text-red-600 font-medium' : 'text-gray-900'}>
                          {new Date(selectedAction.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      {selectedAction.completionDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span className="text-green-600 font-medium">{new Date(selectedAction.completionDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Progress */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Progress</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Completion</span>
                        <span className="font-medium">{selectedAction.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-purple-800 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${selectedAction.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Impact */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Risk Reduction:</span>
                        <span className="text-green-600 font-medium">{selectedAction.riskReduction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Cost:</span>
                        <span className="text-gray-900">{selectedAction.estimatedCost}</span>
                      </div>
                    </div>
                  </div>

                  {/* Compliance */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Compliance Requirements</h3>
                    <div className="space-y-2">
                      {selectedAction.compliance.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-700">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedAction.notes && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800 text-sm">{selectedAction.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-500">
                Action ID: {selectedAction.id}
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedAction(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Edit functionality would go here
                    alert('Edit functionality would be implemented here');
                  }}
                  className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900"
                >
                  Edit Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}