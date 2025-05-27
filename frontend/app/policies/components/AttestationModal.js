
'use client';

import { useState } from 'react';

export default function AttestationModal({ policy, onClose, onAttest }) {
  const [attestationType, setAttestationType] = useState('digital');
  const [agreement, setAgreement] = useState(false);
  const [isAttesting, setIsAttesting] = useState(false);

  const handleAttest = async () => {
    if (!agreement) {
      alert('Please confirm that you have read and understand the policy.');
      return;
    }

    setIsAttesting(true);

    try {
      if (attestationType === 'digital') {
        // Simulate DocuSign integration
        const attestationData = {
          policyId: policy.id,
          type: 'digital_signature',
          timestamp: new Date().toISOString(),
          ipAddress: '192.168.1.1', // This would be captured server-side
          userAgent: navigator.userAgent,
        };

        // Simulate API call to DocuSign
        const response = await fetch('/api/documents/policies/attest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attestationData),
        });

        if (response.ok) {
          onAttest(attestationData);
        } else {
          throw new Error('Failed to submit attestation');
        }
      } else {
        // Simple attestation
        const attestationData = {
          policyId: policy.id,
          type: 'simple_acknowledgment',
          timestamp: new Date().toISOString(),
        };

        onAttest(attestationData);
      }
    } catch (error) {
      console.error('Error submitting attestation:', error);
      alert('Failed to submit attestation. Please try again.');
    } finally {
      setIsAttesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900" id="modal-title">
                Policy Attestation
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-4">
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

            {/* Attestation Type */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-900 mb-3">Attestation Method</h5>
              <div className="space-y-3">
                <label className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="digital"
                    checked={attestationType === 'digital'}
                    onChange={(e) => setAttestationType(e.target.value)}
                    className="mt-1 w-4 h-4 text-purple-800 border-gray-300 focus:ring-purple-800"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Digital Signature (DocuSign)</div>
                    <div className="text-xs text-gray-500">
                      Legally binding electronic signature with audit trail
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                      </svg>
                      <span className="text-xs text-green-600">Recommended</span>
                    </div>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="simple"
                    checked={attestationType === 'simple'}
                    onChange={(e) => setAttestationType(e.target.value)}
                    className="mt-1 w-4 h-4 text-purple-800 border-gray-300 focus:ring-purple-800"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Simple Acknowledgment</div>
                    <div className="text-xs text-gray-500">
                      Basic confirmation with timestamp and IP address
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="mb-6">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
                />
                <div className="text-sm text-gray-700">
                  I acknowledge that I have read, understood, and agree to comply with this policy. 
                  I understand that failure to comply may result in disciplinary action.
                </div>
              </label>
            </div>

            {/* Attestation Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <div className="font-medium mb-1">Attestation Details:</div>
                  <ul className="space-y-1 text-xs">
                    <li>• Your attestation will be recorded with a timestamp</li>
                    <li>• IP address and browser information will be logged for security</li>
                    <li>• This attestation confirms your understanding and compliance commitment</li>
                    {attestationType === 'digital' && (
                      <li>• Digital signature provides legal validity and non-repudiation</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAttest}
              disabled={!agreement || isAttesting}
              className="px-4 py-2 bg-purple-800 text-white rounded-md text-sm font-medium hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isAttesting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {attestationType === 'digital' ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                  <span>
                    {attestationType === 'digital' ? 'Sign with DocuSign' : 'Submit Attestation'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
