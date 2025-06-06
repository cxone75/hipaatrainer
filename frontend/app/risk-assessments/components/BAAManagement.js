
'use client';

import { useState, useEffect } from 'react';

export default function BAAManagement({ baas, onUpdateData }) {
  const [baaList, setBaaList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderModalData, setReminderModalData] = useState({
    type: 'success',
    title: '',
    message: ''
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBaa, setEditingBaa] = useState(null);
  const [newBaaForm, setNewBaaForm] = useState({
    vendorName: '',
    vendorType: '',
    contactEmail: '',
    contactPhone: '',
    status: 'Under Review',
    reviewDate: '',
    expirationDate: '',
    riskLevel: 'Medium',
    complianceOfficer: '',
    notes: ''
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Initialize with sample BAAs
    const sampleBAAs = [
      {
        id: 'baa-001',
        vendorName: 'CloudHealth Solutions',
        vendorType: 'Cloud Provider',
        contactEmail: 'compliance@cloudhealth.com',
        contactPhone: '(555) 123-4567',
        status: 'Active',
        signedDate: '2023-06-15',
        reviewDate: '2024-06-15',
        expirationDate: '2025-06-15',
        services: ['Data Storage', 'Analytics Platform'],
        riskLevel: 'Medium',
        complianceOfficer: 'Sarah Johnson',
        notes: 'Quarterly review scheduled'
      },
      {
        id: 'baa-002',
        vendorName: 'MedTech Communications',
        vendorType: 'Communication Service',
        contactEmail: 'legal@medtech.com',
        contactPhone: '(555) 987-6543',
        status: 'Expiring Soon',
        signedDate: '2022-03-10',
        reviewDate: '2024-02-15',
        expirationDate: '2024-03-10',
        services: ['Secure Messaging', 'Video Conferencing'],
        riskLevel: 'High',
        complianceOfficer: 'Mike Chen',
        notes: 'Renewal process initiated'
      },
      {
        id: 'baa-003',
        vendorName: 'DataSecure Analytics',
        vendorType: 'Analytics Provider',
        contactEmail: 'contracts@datasecure.com',
        contactPhone: '(555) 456-7890',
        status: 'Under Review',
        signedDate: null,
        reviewDate: '2024-01-20',
        expirationDate: null,
        services: ['Business Intelligence', 'Reporting'],
        riskLevel: 'Low',
        complianceOfficer: 'Lisa Rodriguez',
        notes: 'Legal review in progress'
      },
      {
        id: 'baa-004',
        vendorName: 'HealthNet Backup Services',
        vendorType: 'Backup Provider',
        contactEmail: 'support@healthnet.com',
        contactPhone: '(555) 234-5678',
        status: 'Active',
        signedDate: '2023-09-01',
        reviewDate: '2024-09-01',
        expirationDate: '2026-09-01',
        services: ['Data Backup', 'Disaster Recovery'],
        riskLevel: 'Medium',
        complianceOfficer: 'David Kim',
        notes: 'Annual audit completed'
      }
    ];

    setBaaList(sampleBAAs);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expiring soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'under review':
        return 'bg-blue-100 text-blue-800';
      case 'terminated':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const handleSetReminder = async (baaId, reminderType) => {
    try {
      // Simulate API call - replace with actual API endpoint when available
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, we'll simulate a successful response
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setReminderModalData({
          type: 'success',
          title: 'Reminder Set',
          message: `${reminderType} reminder has been set successfully! You will be notified before the deadline.`
        });
      } else {
        setReminderModalData({
          type: 'error',
          title: 'Error',
          message: 'Failed to set reminder. Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error setting reminder:', error);
      setReminderModalData({
        type: 'error',
        title: 'Error',
        message: 'An error occurred while setting the reminder. Please check your connection and try again.'
      });
    } finally {
      setShowReminderModal(true);
    }
  };

  const handleStatusChange = (baaId, newStatus) => {
    setBaaList(prev =>
      prev.map(baa =>
        baa.id === baaId ? { ...baa, status: newStatus } : baa
      )
    );
  };

  const handleEdit = (baa) => {
    setEditingBaa(baa);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedBaa) => {
    setBaaList(prev =>
      prev.map(baa =>
        baa.id === updatedBaa.id ? updatedBaa : baa
      )
    );
    setShowEditModal(false);
    setEditingBaa(null);
  };

  const handleAddBaa = (formData) => {
    const newBaa = {
      id: `baa-${Date.now()}`,
      vendorName: formData.get('vendorName'),
      vendorType: formData.get('vendorType'),
      contactEmail: formData.get('contactEmail'),
      contactPhone: formData.get('contactPhone'),
      status: formData.get('status'),
      signedDate: formData.get('status') === 'Active' ? new Date().toISOString().split('T')[0] : null,
      reviewDate: formData.get('reviewDate'),
      expirationDate: formData.get('expirationDate'),
      services: ['New Service'], // Default service
      riskLevel: formData.get('riskLevel'),
      complianceOfficer: formData.get('complianceOfficer'),
      notes: formData.get('notes')
    };

    setBaaList(prev => [...prev, newBaa]);
    setShowAddModal(false);
    setNewBaaForm({
      vendorName: '',
      vendorType: '',
      contactEmail: '',
      contactPhone: '',
      status: 'Under Review',
      reviewDate: '',
      expirationDate: '',
      riskLevel: 'Medium',
      complianceOfficer: '',
      notes: ''
    });
  };

  const renderMobileCard = (baa) => (
    <div key={baa.id} className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{baa.vendorName}</h3>
          <p className="text-sm text-gray-600">{baa.vendorType}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(baa.status)}`}>
            {baa.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(baa.riskLevel)}`}>
            {baa.riskLevel} Risk
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Contact:</span>
          <span className="text-gray-900">{baa.contactEmail}</span>
        </div>
        {baa.signedDate && (
          <div className="flex justify-between">
            <span className="text-gray-600">Signed:</span>
            <span className="text-gray-900">{new Date(baa.signedDate).toLocaleDateString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Review Date:</span>
          <span className="text-gray-900">{new Date(baa.reviewDate).toLocaleDateString()}</span>
        </div>
        {baa.expirationDate && (
          <div className="flex justify-between">
            <span className="text-gray-600">Expires:</span>
            <div className="text-right">
              <span className="text-gray-900">{new Date(baa.expirationDate).toLocaleDateString()}</span>
              {(() => {
                const days = getDaysUntilExpiration(baa.expirationDate);
                if (days !== null) {
                  return (
                    <div className={`text-xs ${days <= 30 ? 'text-red-600' : days <= 90 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {days > 0 ? `${days} days left` : `${Math.abs(days)} days overdue`}
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Officer:</span>
          <span className="text-gray-900">{baa.complianceOfficer}</span>
        </div>
      </div>

      <div className="mt-3">
        <span className="text-sm font-medium text-gray-700">Services:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {baa.services.map((service, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {service}
            </span>
          ))}
        </div>
      </div>

      {baa.notes && (
        <div className="mt-3">
          <span className="text-sm font-medium text-gray-700">Notes:</span>
          <p className="text-sm text-gray-600 mt-1">{baa.notes}</p>
        </div>
      )}

      <div className="flex space-x-2 mt-4">
        <button 
          onClick={() => handleSetReminder(baa.id, 'Review')}
          className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100"
        >
          Set Reminder
        </button>
        <select
          value={baa.status}
          onChange={(e) => handleStatusChange(baa.id, e.target.value)}
          className="flex-1 text-sm border border-gray-300 rounded px-2 py-2"
        >
          <option value="Active">Active</option>
          <option value="Expiring Soon">Expiring Soon</option>
          <option value="Under Review">Under Review</option>
          <option value="Expired">Expired</option>
          <option value="Terminated">Terminated</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Business Associate Agreements</h2>
          <p className="text-gray-600">Manage BAAs and compliance monitoring</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add BAA</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {baaList.filter(baa => baa.status === 'Active').length}
          </div>
          <div className="text-sm text-green-800">Active BAAs</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {baaList.filter(baa => baa.status === 'Expiring Soon').length}
          </div>
          <div className="text-sm text-yellow-800">Expiring Soon</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {baaList.filter(baa => baa.status === 'Under Review').length}
          </div>
          <div className="text-sm text-blue-800">Under Review</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {baaList.filter(baa => baa.status === 'Expired').length}
          </div>
          <div className="text-sm text-red-800">Expired</div>
        </div>
      </div>

      {/* BAA List */}
      {isMobile ? (
        // Mobile: Stacked Cards
        <div className="space-y-4">
          {baaList.map(renderMobileCard)}
        </div>
      ) : (
        // Desktop: Table
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200" aria-label="BAA Management Table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Officer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {baaList.map((baa) => (
                  <tr key={baa.id} className="hover:bg-gray-50" tabIndex={0}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{baa.vendorName}</div>
                        <div className="text-sm text-gray-500">{baa.vendorType}</div>
                        <div className="text-xs text-gray-400">{baa.contactEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={baa.status}
                        onChange={(e) => handleStatusChange(baa.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(baa.status)}`}
                      >
                        <option value="Active">Active</option>
                        <option value="Expiring Soon">Expiring Soon</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Expired">Expired</option>
                        <option value="Terminated">Terminated</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(baa.reviewDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {baa.expirationDate ? (
                        <div>
                          <div className="text-sm text-gray-900">
                            {new Date(baa.expirationDate).toLocaleDateString()}
                          </div>
                          {(() => {
                            const days = getDaysUntilExpiration(baa.expirationDate);
                            if (days !== null) {
                              return (
                                <div className={`text-xs ${days <= 30 ? 'text-red-600' : days <= 90 ? 'text-yellow-600' : 'text-green-600'}`}>
                                  {days > 0 ? `${days} days left` : `${Math.abs(days)} days overdue`}
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(baa.riskLevel)}`}>
                        {baa.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {baa.complianceOfficer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => handleSetReminder(baa.id, 'Review')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Set Reminder
                      </button>
                      <button 
                        onClick={() => handleEdit(baa)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {baaList.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No BAAs found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first Business Associate Agreement.</p>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              {reminderModalData.type === 'success' ? (
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{reminderModalData.title}</h3>
            </div>
            <p className="text-gray-600 mb-6">{reminderModalData.message}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowReminderModal(false)}
                className={`px-4 py-2 rounded font-medium ${
                  reminderModalData.type === 'success'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit BAA Modal */}
      {showEditModal && editingBaa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Edit Business Associate Agreement</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updatedBaa = {
                ...editingBaa,
                vendorName: formData.get('vendorName'),
                vendorType: formData.get('vendorType'),
                contactEmail: formData.get('contactEmail'),
                contactPhone: formData.get('contactPhone'),
                status: formData.get('status'),
                reviewDate: formData.get('reviewDate'),
                expirationDate: formData.get('expirationDate'),
                riskLevel: formData.get('riskLevel'),
                complianceOfficer: formData.get('complianceOfficer'),
                notes: formData.get('notes')
              };
              handleSaveEdit(updatedBaa);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                  <input
                    type="text"
                    name="vendorName"
                    defaultValue={editingBaa.vendorName}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Type</label>
                  <input
                    type="text"
                    name="vendorType"
                    defaultValue={editingBaa.vendorType}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    defaultValue={editingBaa.contactEmail}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    defaultValue={editingBaa.contactPhone}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingBaa.status}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Expiring Soon">Expiring Soon</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Expired">Expired</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                  <select
                    name="riskLevel"
                    defaultValue={editingBaa.riskLevel}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Date</label>
                  <input
                    type="date"
                    name="reviewDate"
                    defaultValue={editingBaa.reviewDate}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                  <input
                    type="date"
                    name="expirationDate"
                    defaultValue={editingBaa.expirationDate}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Compliance Officer</label>
                  <input
                    type="text"
                    name="complianceOfficer"
                    defaultValue={editingBaa.complianceOfficer}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    defaultValue={editingBaa.notes}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows="3"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add BAA Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add New Business Associate Agreement</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddBaa(new FormData(e.target));
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name *</label>
                  <input
                    type="text"
                    name="vendorName"
                    value={newBaaForm.vendorName}
                    onChange={(e) => setNewBaaForm(prev => ({...prev, vendorName: e.target.value}))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Type *</label>
                  <select
                    name="vendorType"
                    value={newBaaForm.vendorType}
                    onChange={(e) => setNewBaaForm(prev => ({...prev, vendorType: e.target.value}))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  >
                    <option value="">Select Vendor Type</option>
                    <option value="Cloud Provider">Cloud Provider</option>
                    <option value="Communication Service">Communication Service</option>
                    <option value="Analytics Provider">Analytics Provider</option>
                    <option value="Backup Provider">Backup Provider</option>
                    <option value="Software Vendor">Software Vendor</option>
                    <option value="Healthcare Technology">Healthcare Technology</option>
                    <option value="Payment Processor">Payment Processor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={newBaaForm.contactEmail}
                    onChange={(e) => setNewBaaForm(prev => ({...prev, contactEmail: e.target.value}))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={newBaaForm.contactPhone}
                    onChange={(e) => setNewBaaForm(prev => ({...prev, contactPhone: e.target.value}))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    name="status"
                    value={newBaaForm.status}
                    onChange={(e) => setNewBaaForm(prev => ({...prev, status: e.target.value}))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  >
                    <option value="Under Review">Under Review</option>
                    <option value="Active">Active</option>
                    <option value="Expiring Soon">Expiring Soon</option>
                    <option value="Expired">Expired</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level *</label>
                  <select
                    name="riskLevel"
                    value={newBaaForm.riskLevel}
                    onChange={(e) => setNewBaaForm(prev => ({...prev, riskLevel: e.target.value}))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Date *</label>
                  <input
                    type="date"
                    name="reviewDate"
                    value={newBaaForm.reviewDate}
                    onChange={(e) => setNewBaaForm(prev => ({...prev, reviewDate: e.target.value}))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                  <input
                    type="date"
                    name="expirationDate"
                    value={newBaaForm.expirationDate}
                    onChange={(e) => setNewBaaForm(prev => ({...prev, expirationDate: e.target.value}))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Compliance Officer *</label>
                  <input
                    type="text"
                    name="complianceOfficer"
                    value={newBaaForm.complianceOfficer}
                    onChange={(e) => setNewBaaForm(prev => ({...prev, complianceOfficer: e.target.value}))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter compliance officer name"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={newBaaForm.notes}
                    onChange={(e) => setNewBaaForm(prev => ({...prev, notes: e.target.value}))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows="3"
                    placeholder="Additional notes or requirements"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Add BAA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
