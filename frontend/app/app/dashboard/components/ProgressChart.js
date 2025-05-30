
'use client';

import { useState } from 'react';

export default function ProgressChart({ type, data, ...props }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  if (type === 'line') {
    // Line chart for compliance trends
    const maxScore = Math.max(...data.map(d => d.score));
    const minScore = Math.min(...data.map(d => d.score));
    const scoreRange = maxScore - minScore || 1;
    
    const svgWidth = 100; // Use percentage-based width
    const svgHeight = 150;
    const padding = 30;
    const chartWidth = 320; // Fixed chart area width for calculations
    const chartHeight = svgHeight - 2 * padding;

    const points = data.map((item, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + ((maxScore - item.score) / scoreRange) * chartHeight;
      return { x, y, ...item };
    });

    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      // Use UTC to ensure consistent rendering between server and client
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric',
        timeZone: 'UTC'
      });
    };

    const handleMouseMove = (e, point) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setHoveredItem(point);
    };

    return (
      <div className="relative w-full h-full min-h-[150px]" {...props}>
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 400 ${svgHeight}`}
          className="overflow-hidden"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(score => {
            const y = padding + ((maxScore - score) / scoreRange) * chartHeight;
            return (
              <g key={score}>
                <line
                  x1={padding}
                  y1={y}
                  x2={360}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x={padding - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  {score}%
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {points.map((point, index) => (
            <text
              key={index}
              x={point.x}
              y={140}
              textAnchor="middle"
              className="text-xs fill-gray-500"
              fontSize="10"
            >
              {formatDate(point.date)}
            </text>
          ))}

          {/* Line path */}
          <path
            d={pathData}
            fill="none"
            stroke="#6b7280"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Gradient definition */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="pointGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af"/>
              <stop offset="100%" stopColor="#6b7280"/>
            </linearGradient>
          </defs>

          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="5"
              fill="url(#pointGradient)"
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer hover:r-6 transition-all duration-200 drop-shadow-sm"
              onMouseEnter={(e) => handleMouseMove(e, point)}
              onMouseLeave={() => setHoveredItem(null)}
              onMouseMove={(e) => handleMouseMove(e, point)}
              tabIndex={0}
              role="button"
              aria-label={`${formatDate(point.date)}: ${point.score}%`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setHoveredItem(point);
                }
              }}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredItem && (
          <div
            className="absolute bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none z-10"
            style={{
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y - 30,
              transform: 'translateX(-50%)'
            }}
          >
            {formatDate(hoveredItem.date)}: {hoveredItem.score}%
          </div>
        )}
      </div>
    );
  }

  if (type === 'bar') {
    // Bar chart for category progress
    const maxValue = Math.max(...data.map(d => d.progress));
    const barHeight = 20;
    const barSpacing = 12;
    const svgHeight = data.length * (barHeight + barSpacing) - barSpacing + 40;
    const svgWidth = 400;
    const labelWidth = 120;
    const chartWidth = svgWidth - labelWidth - 40;

    const handleCategoryClick = (category) => {
      switch(category.toLowerCase()) {
        case 'training':
          window.location.href = '/training';
          break;
        case 'risk assessment':
          window.location.href = '/risk-assessments';
          break;
        case 'baas':
          window.location.href = '/risk-assessments#baas';
          break;
        case 'policies':
          window.location.href = '/policies';
          break;
        default:
          break;
      }
    };

    return (
      <div className="space-y-2" {...props}>
        {data.map((item, index) => {
          const barWidth = (item.progress / 100) * chartWidth;
          const percentage = item.progress;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-24 text-xs font-medium text-gray-700 text-right">
                {item.category}
              </div>
              <div className="flex-1 relative">
                <div 
                  className="w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-4 relative overflow-hidden cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-all duration-200 shadow-inner"
                  onClick={() => handleCategoryClick(item.category)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.category} details - ${percentage}% complete`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCategoryClick(item.category);
                    }
                  }}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out border ${
                      percentage >= 90 ? 'bg-green-50 border-green-300' :
                      percentage >= 70 ? 'bg-gray-50 border-gray-300' : 
                      'bg-red-50 border-red-300'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700" style={{ fontSize: '10px' }}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}
