
'use client';

import { useState } from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import PolicyCard from './components/PolicyCard';
import DistributionModal from './components/DistributionModal';
import AttestationModal from './components/AttestationModal';

export default function PolicyManagement() {
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [showAttestationModal, setShowAttestationModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock policy data
  const [policies] = useState([
    {
      id: '1',
      name: 'Privacy Notice',
      version: '2.1',
      status: 'attested',
      description: 'HIPAA Privacy Notice outlining patient rights and our privacy practices.',
      lastUpdated: '2024-12-15',
      attestationDeadline: '2025-06-30',
      storageUrl: '/documents/privacy-notice-v2.1.pdf',
      attestationRate: 95,
      distributedTo: 48,
      pendingAttestations: 2
    },
    {
      id: '2',
      name: 'Security Policy',
      version: '1.8',
      status: 'pending',
      description: 'Comprehensive security policies and procedures for data protection.',
      lastUpdated: '2024-11-20',
      attestationDeadline: '2025-05-15',
      storageUrl: '/documents/security-policy-v1.8.pdf',
      attestationRate: 72,
      distributedTo: 50,
      pendingAttestations: 14
    },
    {
      id: '3',
      name: 'Breach Notification Policy',
      version: '1.3',
      status: 'overdue',
      description: 'Procedures for handling and reporting security breaches.',
      lastUpdated: '2024-10-05',
      attestationDeadline: '2025-04-01',
      storageUrl: '/documents/breach-notification-v1.3.pdf',
      attestationRate: 68,
      distributedTo: 50,
      pendingAttestations: 16
    },
    {
      id: '4',
      name: 'Workforce Training Policy',
      version: '2.0',
      status: 'draft',
      description: 'Training requirements and procedures for all workforce members.',
      lastUpdated: '2024-12-01',
      attestationDeadline: null,
      storageUrl: '/documents/workforce-training-v2.0.pdf',
      attestationRate: 0,
      distributedTo: 0,
      pendingAttestations: 0
    }
  ]);

  const handleDistributePolicies = () => {
    if (selectedPolicies.length === 0) {
      alert('Please select at least one policy to distribute.');
      return;
    }
    setShowDistributionModal(true);
  };

  const handleAttestPolicy = (policy) => {
    setSelectedPolicy(policy);
    setShowAttestationModal(true);
  };

  const handlePolicySelection = (policyId, selected) => {
    if (selected) {
      setSelectedPolicies([...selectedPolicies, policyId]);
    } else {
      setSelectedPolicies(selectedPolicies.filter(id => id !== policyId));
    }
  };

  const handleSelectAll = () => {
    if (selectedPolicies.length === filteredPolicies.length) {
      setSelectedPolicies([]);
    } else {
      setSelectedPolicies(filteredPolicies.map(policy => policy.id));
    }
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || policy.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const breadcrumbItems = [
    { label: 'Policy Management', href: '/app/policies' }
  ];

  const getStatusCounts = () => {
    return {
      all: policies.length,
      attested: policies.filter(p => p.status === 'attested').length,
      pending: policies.filter(p => p.status === 'pending').length,
      overdue: policies.filter(p => p.status === 'overdue').length,
      draft: policies.filter(p => p.status === 'draft').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Policy Management</h1>
            <p className="text-gray-600">
              Manage, distribute, and track policy attestations across your organization.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button
              onClick={handleDistributePolicies}
              disabled={selectedPolicies.length === 0}
              className="bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Distribute Policies</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Policies', count: statusCounts.all, color: 'bg-blue-50 text-blue-700' },
            { label: 'Attested', count: statusCounts.attested, color: 'bg-green-50 text-green-700' },
            { label: 'Pending', count: statusCounts.pending, color: 'bg-yellow-50 text-yellow-700' },
            { label: 'Overdue', count: statusCounts.overdue, color: 'bg-red-50 text-red-700' },
            { label: 'Draft', count: statusCounts.draft, color: 'bg-gray-50 text-gray-700' }
          ].map((stat, index) => (
            <div key={index} className={`p-4 rounded-lg ${stat.color}`}>
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[
              { value: 'all', label: 'All' },
              { value: 'attested', label: 'Attested' },
              { value: 'pending', label: 'Pending' },
              { value: 'overdue', label: 'Overdue' },
              { value: 'draft', label: 'Draft' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  filterStatus === filter.value
                    ? 'bg-purple-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Actions */}
        {filteredPolicies.length > 0 && (
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedPolicies.length === filteredPolicies.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
              />
              <span className="text-sm font-medium text-gray-700">
                Select All ({filteredPolicies.length})
              </span>
            </label>
            {selectedPolicies.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{selectedPolicies.length} selected</span>
                <button
                  onClick={() => setSelectedPolicies([])}
                  className="text-purple-800 hover:text-purple-900 font-medium"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy) => (
            <PolicyCard
              key={policy.id}
              policy={policy}
              selected={selectedPolicies.includes(policy.id)}
              onSelect={(selected) => handlePolicySelection(policy.id, selected)}
              onAttest={() => handleAttestPolicy(policy)}
            />
          ))}
        </div>

        {filteredPolicies.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No policies found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Distribution Modal */}
        {showDistributionModal && (
          <DistributionModal
            selectedPolicies={selectedPolicies.map(id => policies.find(p => p.id === id))}
            onClose={() => setShowDistributionModal(false)}
            onDistribute={(distributionData) => {
              console.log('Distributing policies:', distributionData);
              setShowDistributionModal(false);
              setSelectedPolicies([]);
            }}
          />
        )}

        {/* Attestation Modal */}
        {showAttestationModal && selectedPolicy && (
          <AttestationModal
            policy={selectedPolicy}
            onClose={() => {
              setShowAttestationModal(false);
              setSelectedPolicy(null);
            }}
            onAttest={(attestationData) => {
              console.log('Attesting policy:', attestationData);
              setShowAttestationModal(false);
              setSelectedPolicy(null);
            }}
          />
        )}
      </div>
    </MainLayout>
  );
}
