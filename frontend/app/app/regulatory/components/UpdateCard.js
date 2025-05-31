'use client';

import { useState } from 'react';

export default function UpdateCard({ 
  update, 
  isExpanded, 
  onSetReminder, 
  onViewDetails, 
  getImpactColor 
}) {
  const [isSettingReminder, setIsSettingReminder] = useState(false);

  const handleSetReminder = async () => {
    setIsSettingReminder(true);
    try {
      await onSetReminder(update);
    } finally {
      setIsSettingReminder(false);
    }
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
            <div className="flex items-start gap-3 mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(update.impact)}`}>
                {update.impact} Impact
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {update.category}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {update.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {update.summary}
            </p>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
                  </svg>
                  Add to Calendar
                </>
              )}
            </button>

            <button
              onClick={() => onViewDetails(update)}
              className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
              aria-label="View Details"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
              </svg>
              Effective: {new Date(update.effectiveDate).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Published: {new Date(update.publishedDate).toLocaleDateString()}
            </div>
            {update.source && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Source: {update.source}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Full Description</h4>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
              {update.description}
            </p>

            {update.complianceActions && update.complianceActions.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Required Actions</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {update.complianceActions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </div>
            )}

            {update.references && update.references.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">References</h4>
                <ul className="space-y-1">
                  {update.references.map((ref, index) => (
                    <li key={index}>
                      <a 
                        href={ref.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-800 underline"
                      >
                        {ref.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}