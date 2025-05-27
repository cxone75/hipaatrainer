
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
    
    const svgWidth = 400;
    const svgHeight = 200;
    const padding = 40;
    const chartWidth = svgWidth - 2 * padding;
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
      <div className="relative" {...props}>
        <svg width={svgWidth} height={svgHeight} className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(score => {
            const y = padding + ((maxScore - score) / scoreRange) * chartHeight;
            return (
              <g key={score}>
                <line
                  x1={padding}
                  y1={y}
                  x2={svgWidth - padding}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-500"
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
              y={svgHeight - 10}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {formatDate(point.date)}
            </text>
          ))}

          {/* Line path */}
          <path
            d={pathData}
            fill="none"
            stroke="#7c3aed"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="6"
              fill="#7c3aed"
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer hover:r-8 transition-all duration-200"
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
    const barHeight = 30;
    const barSpacing = 20;
    const svgHeight = data.length * (barHeight + barSpacing) - barSpacing + 40;
    const svgWidth = 400;
    const labelWidth = 120;
    const chartWidth = svgWidth - labelWidth - 40;

    return (
      <div className="space-y-4" {...props}>
        {data.map((item, index) => {
          const barWidth = (item.progress / 100) * chartWidth;
          const percentage = item.progress;
          
          return (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-28 text-sm font-medium text-gray-700 text-right">
                {item.category}
              </div>
              <div className="flex-1 relative">
                <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      percentage >= 90 ? 'bg-green-500' :
                      percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700">
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
