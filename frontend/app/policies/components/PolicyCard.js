'use client';

import { useState, useEffect } from 'react';

export default function PolicyCard({ policy, selected, onSelect, onAttest }) {
  const [isViewing, setIsViewing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'attested': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'attested':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17Z" />
          </svg>
        );
      case 'overdue':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
          </svg>
        );
      case 'draft':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleViewPolicy = () => {
    setIsViewing(true);
    // Simulate opening PDF
    setTimeout(() => {
      window.open(policy.storageUrl, '_blank');
      setIsViewing(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    if (!isClient) {
      return 'Loading date...'; // Or some placeholder
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDeadline = getDaysUntilDeadline(policy.attestationDeadline);

  return (
    <div 
      className={`bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
        selected ? 'border-purple-800 shadow-md' : 'border-gray-200'
      }`}
      role="article"
      aria-label={`Policy: ${policy.name}`}
      tabIndex={0}
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3 flex-1">
            <input
              type="checkbox"
              checked={selected}
              onChange={(e) => onSelect(e.target.checked)}
              className="mt-1 w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
              aria-label={`Select ${policy.name}`}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {policy.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">v{policy.version}</span>
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                  {getStatusIcon(policy.status)}
                  <span className="capitalize">{policy.status}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

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
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              <span>Attest</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}