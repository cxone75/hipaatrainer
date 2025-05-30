
'use client';

import { useState } from 'react';

export default function BAAManagement({ baas, onUpdateData }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBaa, setSelectedBaa] = useState(null);
  const [filter, setFilter] = useState('all');

  const mockBaas = [
    {
      id: 'aws-baa',
      vendor: 'Amazon Web Services',
      type: 'Cloud Services',
      status: 'Active',
      signedDate: '2023-06-15',
      expirationDate: '2024-06-15',
      riskLevel: 'Low',
      services: ['EC2', 'RDS', 'S3'],
      contact: 'aws-compliance@amazon.com',
      lastReviewed: '2024-01-10',
      complianceStatus: 'Compliant',
      documents: ['signed-baa.pdf', 'security-attestation.pdf']
    },
    {
      id: 'salesforce-baa',
      vendor: 'Salesforce',
      type: 'CRM Platform',
      status: 'Active',
      signedDate: '2023-08-20',
      expirationDate: '2024-08-20',
      riskLevel: 'Medium',
      services: ['Sales Cloud', 'Service Cloud'],
      contact: 'hipaa@salesforce.com',
      lastReviewed: '2023-12-15',
      complianceStatus: 'Compliant',
      documents: ['salesforce-baa.pdf']
    },
    {
      id: 'google-baa',
      vendor: 'Google Workspace',
      type: 'Productivity Suite',
      status: 'Expiring Soon',
      signedDate: '2023-02-01',
      expirationDate: '2024-02-01',
      riskLevel: 'Medium',
      services: ['Gmail', 'Drive', 'Calendar'],
      contact: 'workspace-compliance@google.com',
      lastReviewed: '2024-01-15',
      complianceStatus: 'Review Required',
      documents: ['google-baa.pdf', 'security-summary.pdf']
    },
    {
      id: 'zoom-baa',
      vendor: 'Zoom Communications',
      type: 'Video Conferencing',
      status: 'Expired',
      signedDate: '2022-11-10',
      expirationDate: '2023-11-10',
      riskLevel: 'High',
      services: ['Zoom Meetings', 'Zoom Phone'],
      contact: 'compliance@zoom.us',
      lastReviewed: '2023-10-01',
      complianceStatus: 'Non-Compliant',
      documents: ['zoom-baa.pdf']
    },
    {
      id: 'slack-baa',
      vendor: 'Slack Technologies',
      type: 'Team Communication',
      status: 'Pending',
      signedDate: null,
      expirationDate: null,
      riskLevel: 'Medium',
      services: ['Slack Workspace'],
      contact: 'legal@slack.com',
      lastReviewed: null,
      complianceStatus: 'Pending Review',
      documents: []
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (compliance) => {
    switch (compliance) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Review Required': return 'bg-yellow-100 text-yellow-800';
      case 'Non-Compliant': return 'bg-red-100 text-red-800';
      case 'Pending Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilExpiration = (expirationDate) => {
    if (!expirationDate) return null;
    const today = new Date();
    const expiration = new Date(expirationDate);
    const diffTime = expiration - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredBaas = mockBaas.filter(baa => {
    if (filter === 'all') return true;
    return baa.status.toLowerCase().replace(' ', '-') === filter;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Business Associate Agreements</h2>
            <p className="text-gray-600">Manage and track BAAs with third-party vendors handling PHI</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add New BAA
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'all', label: 'All BAAs', count: mockBaas.length },
              { id: 'active', label: 'Active', count: mockBaas.filter(b => b.status === 'Active').length },
              { id: 'expiring-soon', label: 'Expiring Soon', count: mockBaas.filter(b => b.status === 'Expiring Soon').length },
              { id: 'expired', label: 'Expired', count: mockBaas.filter(b => b.status === 'Expired').length },
              { id: 'pending', label: 'Pending', count: mockBaas.filter(b => b.status === 'Pending').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {mockBaas.filter(b => b.status === 'Active').length}
          </div>
          <div className="text-sm text-green-800">Active BAAs</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {mockBaas.filter(b => b.status === 'Expiring Soon').length}
          </div>
          <div className="text-sm text-yellow-800">Expiring Soon</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {mockBaas.filter(b => b.status === 'Expired').length}
          </div>
          <div className="text-sm text-red-800">Expired</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {mockBaas.filter(b => b.complianceStatus === 'Compliant').length}
          </div>
          <div className="text-sm text-blue-800">Compliant</div>
        </div>
      </div>

      {/* BAA List */}
      <div className="space-y-4">
        {filteredBaas.map((baa) => {
          const daysUntilExpiration = getDaysUntilExpiration(baa.expirationDate);
          
          return (
            <div key={baa.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{baa.vendor}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(baa.status)}`}>
                      {baa.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(baa.riskLevel)}`}>
                      {baa.riskLevel} Risk
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{baa.type}</p>
                  <div className="flex flex-wrap gap-1">
                    {baa.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getComplianceColor(baa.complianceStatus)}`}>
                    {baa.complianceStatus}
                  </span>
                  {daysUntilExpiration !== null && (
                    <div className="mt-2 text-sm text-gray-600">
                      {daysUntilExpiration > 0 ? (
                        <span className={daysUntilExpiration <= 30 ? 'text-yellow-600 font-medium' : ''}>
                          Expires in {daysUntilExpiration} days
                        </span>
                      ) : daysUntilExpiration === 0 ? (
                        <span className="text-red-600 font-medium">Expires today</span>
                      ) : (
                        <span className="text-red-600 font-medium">Expired {Math.abs(daysUntilExpiration)} days ago</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Signed Date:</span>
                  <p className="text-sm text-gray-600">
                    {baa.signedDate ? new Date(baa.signedDate).toLocaleDateString() : 'Not signed'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Expiration Date:</span>
                  <p className="text-sm text-gray-600">
                    {baa.expirationDate ? new Date(baa.expirationDate).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Last Reviewed:</span>
                  <p className="text-sm text-gray-600">
                    {baa.lastReviewed ? new Date(baa.lastReviewed).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700">Contact:</span>
                <p className="text-sm text-gray-600">{baa.contact}</p>
              </div>

              {baa.documents.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Documents:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {baa.documents.map((doc, index) => (
                      <a 
                        key={index} 
                        href="#" 
                        className="text-sm text-purple-600 hover:text-purple-800 underline"
                      >
                        {doc}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {baa.status === 'Expired' && (
                    <span className="text-sm text-red-600 font-medium">⚠ Immediate action required</span>
                  )}
                  {baa.status === 'Expiring Soon' && (
                    <span className="text-sm text-yellow-600 font-medium">⚠ Renewal needed</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedBaa(baa)}
                    className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                    Edit
                  </button>
                  {(baa.status === 'Expired' || baa.status === 'Expiring Soon') && (
                    <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      Renew
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBaas.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">No BAAs found</div>
          <p className="text-sm text-gray-400">Try adjusting your filter or add a new BAA</p>
        </div>
      )}

      {/* Upcoming Renewals Alert */}
      {mockBaas.filter(b => b.status === 'Expiring Soon' || b.status === 'Expired').length > 0 && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="font-medium text-yellow-800">Action Required</h4>
              <p className="text-sm text-yellow-700 mt-1">
                You have {mockBaas.filter(b => b.status === 'Expiring Soon' || b.status === 'Expired').length} BAAs 
                that need immediate attention for renewal or compliance review.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
