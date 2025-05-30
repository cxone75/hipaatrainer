
'use client';

import { useState, useEffect } from 'react';
import CorrectiveActionModal from './CorrectiveActionModal';

export default function CorrectiveActions() {
  const [actions, setActions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    fetchCorrectiveActions();
  }, []);

  const fetchCorrectiveActions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/corrective-actions');
      if (response.ok) {
        const data = await response.json();
        setActions(data);
      } else {
        console.error('Failed to fetch corrective actions');
        loadSampleActions();
      }
    } catch (error) {
      console.error('Error fetching corrective actions:', error);
      loadSampleActions();
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleActions = () => {
    const sampleActions = [
      {
        id: 'ca-001',
        title: 'Implement Multi-Factor Authentication',
        description: 'Deploy MFA across all systems that handle PHI to enhance access security',
        finding_id: 'finding-001',
        status: 'in_progress',
        priority: 'high',
        assigned_to: 'IT Security Team',
        due_date: '2024-03-15',
        created_at: '2024-01-20T00:00:00Z',
        progress: 75,
        steps: [
          { id: 1, description: 'Evaluate MFA solutions', completed: true },
          { id: 2, description: 'Procure and configure MFA system', completed: true },
          { id: 3, description: 'Pilot test with IT team', completed: true },
          { id: 4, description: 'Roll out to all users', completed: false },
          { id: 5, description: 'Training and documentation', completed: false }
        ]
      },
      {
        id: 'ca-002',
        title: 'Update Data Backup Procedures',
        description: 'Revise backup policies to ensure PHI data recovery capabilities meet compliance requirements',
        finding_id: 'finding-002',
        status: 'pending',
        priority: 'medium',
        assigned_to: 'Data Management Team',
        due_date: '2024-04-01',
        created_at: '2024-01-25T00:00:00Z',
        progress: 0,
        steps: [
          { id: 1, description: 'Review current backup procedures', completed: false },
          { id: 2, description: 'Identify gaps in PHI protection', completed: false },
          { id: 3, description: 'Update backup policies', completed: false },
          { id: 4, description: 'Test recovery procedures', completed: false }
        ]
      }
    ];
    setActions(sampleActions);
  };

  const filteredActions = actions.filter(action => {
    const matchesSearch = action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || action.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || action.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setIsModalOpen(true);
  };

  const handleActionUpdate = (updatedAction) => {
    setActions(prev => prev.map(action => 
      action.id === updatedAction.id ? updatedAction : action
    ));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
        <span className="ml-2 text-gray-600">Loading corrective actions...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Corrective Actions</h2>
          <p className="text-gray-600">Track and manage corrective actions from audit findings.</p>
        </div>
        <button
          onClick={() => {
            setSelectedAction(null);
            setIsModalOpen(true);
          }}
          className="mt-4 md:mt-0 bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Action</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search corrective actions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Actions List */}
      <div className="space-y-4">
        {filteredActions.map((action) => (
          <div
            key={action.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleActionClick(action)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {action.description}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2 ml-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(action.status)}`}>
                  {action.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                  {action.priority.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
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

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {action.assigned_to}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Due: {new Date(action.due_date).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                {action.steps.filter(step => step.completed).length} of {action.steps.length} steps
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredActions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No corrective actions found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria, or add your first corrective action.</p>
          <button
            onClick={() => {
              setSelectedAction(null);
              setIsModalOpen(true);
            }}
            className="bg-purple-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Add Corrective Action
          </button>
        </div>
      )}

      {/* Modal */}
      <CorrectiveActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action={selectedAction}
        onSave={handleActionUpdate}
      />
    </div>
  );
}
