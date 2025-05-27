
'use client';

import { useState } from 'react';

export default function UpdateCard({ 
  update, 
  isExpanded, 
  onExpand, 
  onSetReminder, 
  getImpactColor 
}) {
  const [isSettingReminder, setIsSettingReminder] = useState(false);

  const handleSetReminder = async () => {
    setIsSettingReminder(true);
    try {
      await onSetReminder();
    } finally {
      setIsSettingReminder(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
      role="article"
      aria-label={`Regulatory Update: ${update.title}`}
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(update.impact)}`}>
                {update.impact} Impact
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
                {update.category}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {update.title}
            </h3>
            
            <p className="text-gray-600 mb-3">
              {update.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Effective: {formatDate(update.effectiveDate)}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Updated: {formatDate(update.lastUpdated)}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleSetReminder}
              disabled={isSettingReminder}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Add to Calendar"
            >
              {isSettingReminder ? (
                <>
                  <svg className="animate-spin w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Setting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add to Calendar
                </>
              )}
            </button>
            
            <button
              onClick={onExpand}
              className="flex items-center justify-center px-4 py-2 bg-purple-800 text-white rounded-md text-sm font-medium hover:bg-purple-900"
              aria-expanded={isExpanded}
              aria-controls={`update-details-${update.id}`}
            >
              {isExpanded ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Hide Details
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  View Details
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div 
          id={`update-details-${update.id}`}
          className="border-t border-gray-200 bg-gray-50 p-6"
        >
          <div className="space-y-6">
            {/* Overview */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">Overview</h4>
              <p className="text-gray-700">{update.guidance.overview}</p>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">Key Requirements</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {update.guidance.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            {/* Timeline and Penalties */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-2">Implementation Timeline</h4>
                <p className="text-gray-700">{update.guidance.timeline}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-2">Penalties for Non-Compliance</h4>
                <p className="text-gray-700">{update.guidance.penalties}</p>
              </div>
            </div>

            {/* Source */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Source: {update.source}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
