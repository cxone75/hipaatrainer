
'use client';

import { useState } from 'react';

export default function AttestationModal({ policy, onClose, onAttest }) {
  const [formData, setFormData] = useState({
    attestedBy: '',
    attestationDate: new Date().toISOString().split('T')[0],
    acknowledgment: false,
    signature: '',
    comments: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.attestedBy.trim()) {
      newErrors.attestedBy = 'Name is required';
    }

    if (!formData.acknowledgment) {
      newErrors.acknowledgment = 'You must acknowledge that you have read and understood the policy';
    }

    if (!formData.signature.trim()) {
      newErrors.signature = 'Digital signature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const attestationData = {
      ...formData,
      policyId: policy.id,
      attestationTimestamp: new Date().toISOString()
    };

    onAttest(attestationData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Policy Attestation
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Content */}
          <div className="bg-white px-6 py-4 max-h-96 overflow-y-auto">
            {/* Policy Information */}
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{policy.name}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Version:</span>
                    <span className="ml-2 text-gray-900">{policy.version}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(policy.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  {policy.attestationDeadline && (
                    <div className="col-span-2">
                      <span className="text-gray-500">Attestation Deadline:</span>
                      <span className="ml-2 text-red-600 font-medium">
                        {new Date(policy.attestationDeadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-3">{policy.description}</p>
              </div>
            </div>

            {/* Policy Preview */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Policy Document</h5>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{policy.name} v{policy.version}.pdf</span>
                  </div>
                  <button
                    onClick={() => window.open(policy.storageUrl, '_blank')}
                    className="text-purple-800 hover:text-purple-900 text-sm font-medium"
                  >
                    View Full Document →
                  </button>
                </div>
              </div>
            </div>

            {/* Attestation Form */}
            <div className="space-y-4">
              {/* Attested By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.attestedBy}
                  onChange={(e) => setFormData({...formData, attestedBy: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:ring-purple-800 focus:border-purple-800 ${
                    errors.attestedBy ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.attestedBy && (
                  <p className="text-red-600 text-xs mt-1">{errors.attestedBy}</p>
                )}
              </div>

              {/* Attestation Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attestation Date
                </label>
                <input
                  type="date"
                  value={formData.attestationDate}
                  onChange={(e) => setFormData({...formData, attestationDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-purple-800 focus:border-purple-800"
                />
              </div>

              {/* Acknowledgment */}
              <div>
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.acknowledgment}
                    onChange={(e) => setFormData({...formData, acknowledgment: e.target.checked})}
                    className={`mt-1 w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800 ${
                      errors.acknowledgment ? 'border-red-300' : ''
                    }`}
                  />
                  <div className="text-sm">
                    <span className="text-gray-700">
                      I acknowledge that I have read, understood, and agree to comply with this policy. 
                      I understand that failure to comply with this policy may result in disciplinary action.
                    </span>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                </label>
                {errors.acknowledgment && (
                  <p className="text-red-600 text-xs mt-1 ml-6">{errors.acknowledgment}</p>
                )}
              </div>

              {/* Digital Signature */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Digital Signature *
                </label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => setFormData({...formData, signature: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:ring-purple-800 focus:border-purple-800 ${
                    errors.signature ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Type your full name as digital signature"
                />
                {errors.signature && (
                  <p className="text-red-600 text-xs mt-1">{errors.signature}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  By typing your name, you are providing a digital signature equivalent to a handwritten signature.
                </p>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comments (Optional)
                </label>
                <textarea
                  value={formData.comments}
                  onChange={(e) => setFormData({...formData, comments: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-purple-800 focus:border-purple-800"
                  placeholder="Add any comments or questions about this policy..."
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-800 text-white rounded-md text-sm font-medium hover:bg-purple-900"
            >
              Submit Attestation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
