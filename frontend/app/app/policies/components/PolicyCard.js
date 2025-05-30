
'use client';

import { useState } from 'react';

export default function PolicyCard({ policy, selected, onSelect, onAttest }) {
  const [isViewing, setIsViewing] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'attested':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewPolicy = () => {
    setIsViewing(true);
    // Simulate document loading
    setTimeout(() => {
      window.open(policy.storageUrl, '_blank');
      setIsViewing(false);
    }, 1000);
  };

  const daysUntilDeadline = policy.attestationDeadline 
    ? Math.ceil((new Date(policy.attestationDeadline) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${
      selected ? 'ring-2 ring-purple-800' : ''
    }`}>
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={selected}
              onChange={(e) => onSelect(e.target.checked)}
              className="mt-1 w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {policy.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Version {policy.version}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                  {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="px-6 py-4">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {policy.description}
        </p>

        {/* Policy Metrics */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Last Updated:</span>
            <span className="text-gray-900">{formatDate(policy.lastUpdated)}</span>
          </div>

          {policy.attestationDeadline && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Deadline:</span>
              <div className="text-right">
                <span className="text-gray-900">{formatDate(policy.attestationDeadline)}</span>
                {daysUntilDeadline !== null && (
                  <div className={`text-xs ${
                    daysUntilDeadline < 0 ? 'text-red-600' : 
                    daysUntilDeadline <= 7 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {daysUntilDeadline < 0 
                      ? `${Math.abs(daysUntilDeadline)} days overdue`
                      : `${daysUntilDeadline} days left`
                    }
                  </div>
                )}
              </div>
            </div>
          )}

          {policy.status !== 'draft' && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Distributed To:</span>
                <span className="text-gray-900">{policy.distributedTo} users</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Attestation Rate:</span>
                <span className="text-gray-900">{policy.attestationRate}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    policy.attestationRate >= 90 ? 'bg-green-500' :
                    policy.attestationRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${policy.attestationRate}%` }}
                />
              </div>

              {policy.pendingAttestations > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Pending:</span>
                  <span className="text-orange-600 font-medium">{policy.pendingAttestations} attestations</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleViewPolicy}
            disabled={isViewing}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isViewing ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View Policy</span>
              </>
            )}
          </button>

          {policy.status !== 'draft' && policy.status !== 'attested' && (
            <button
              onClick={onAttest}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-800 text-white rounded-md text-sm font-medium hover:bg-purple-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Attest</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
