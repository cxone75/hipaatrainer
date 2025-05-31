'use client';

import { useState, useEffect } from 'react';

export default function ProgressChart() {
  const [timeframe, setTimeframe] = useState('7d');

  // Sample data for different timeframes
  const chartData = {
    '7d': [
      { label: 'Mon', compliance: 78, training: 45 },
      { label: 'Tue', compliance: 82, training: 52 },
      { label: 'Wed', compliance: 85, training: 58 },
      { label: 'Thu', compliance: 83, training: 61 },
      { label: 'Fri', compliance: 87, training: 65 },
      { label: 'Sat', compliance: 89, training: 68 },
      { label: 'Sun', compliance: 85, training: 70 }
    ],
    '30d': [
      { label: 'Week 1', compliance: 75, training: 40 },
      { label: 'Week 2', compliance: 80, training: 50 },
      { label: 'Week 3', compliance: 85, training: 60 },
      { label: 'Week 4', compliance: 87, training: 68 }
    ],
    '90d': [
      { label: 'Month 1', compliance: 70, training: 35 },
      { label: 'Month 2', compliance: 80, training: 55 },
      { label: 'Month 3', compliance: 87, training: 68 }
    ]
  };

  const data = chartData[timeframe];
  const maxValue = Math.max(...data.flatMap(item => [item.compliance, item.training]));

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Compliance Progress</h3>
        <div className="flex items-center space-x-2">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 400 240"
          className="overflow-hidden"
          preserveAspectRatio="xMidYMid meet"
        >
          {data.map((item, index) => {
            const barHeight = 28;
            const spacing = 32;
            const y = index * spacing + 20;
            const maxBarWidth = 280; // Reduced to fit container
            const complianceWidth = (item.compliance / maxValue) * maxBarWidth;
            const trainingWidth = (item.training / maxValue) * maxBarWidth;

            return (
              <g key={index}>
                {/* Background bar */}
                <rect
                  x="70"
                  y={y}
                  width={maxBarWidth}
                  height={barHeight}
                  fill="#f3f4f6"
                  rx="4"
                />

                {/* Compliance bar */}
                <rect
                  x="70"
                  y={y}
                  width={complianceWidth}
                  height={barHeight}
                  fill="#c084fc"
                  rx="4"
                />

                {/* Training bar */}
                <rect
                  x="70"
                  y={y + 4}
                  width={trainingWidth}
                  height={barHeight - 8}
                  fill="#8b5cf6"
                  rx="2"
                />

                {/* Day label */}
                <text
                  x="60"
                  y={y + barHeight/2 + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-600"
                  fontSize="11"
                >
                  {item.label}
                </text>

                {/* Values */}
                <text
                  x="360"
                  y={y + 12}
                  textAnchor="start"
                  className="text-xs fill-gray-700"
                  fontSize="10"
                >
                  {item.compliance}%
                </text>
                <text
                  x="360"
                  y={y + 24}
                  textAnchor="start"
                  className="text-xs fill-gray-500"
                  fontSize="10"
                >
                  {item.training}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-600 rounded"></div>
          <span className="text-sm text-gray-600">Training Completion</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-200 rounded"></div>
          <span className="text-sm text-gray-600">Overall Compliance</span>
        </div>
      </div>
    </div>
  );
}