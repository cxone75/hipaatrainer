
'use client';

export default function UpdateCard({ 
  update, 
  isExpanded, 
  onSetReminder, 
  onViewDetails, 
  getImpactColor 
}) {
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
                Effective: {new Date(update.effectiveDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {update.source}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => onSetReminder(update)}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Add to Calendar
            </button>
            <button
              onClick={() => onViewDetails(update.id)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              {isExpanded ? 'Hide Details' : 'View Details'}
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && update.guidance && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Overview</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {update.guidance.overview}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {update.guidance.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                  <p className="text-sm text-gray-600">{update.guidance.timeline}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Penalties</h4>
                  <p className="text-sm text-gray-600">{update.guidance.penalties}</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(update.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
