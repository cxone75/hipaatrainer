
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

      {/* Chart Area */}
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-1">
              {/* Bars */}
              <div className="w-full max-w-12 space-y-1">
                <div className="relative">
                  <div 
                    className="bg-purple-200 rounded-t"
                    style={{ height: `${(item.compliance / maxValue) * 200}px` }}
                  ></div>
                  <div 
                    className="bg-purple-600 rounded-t"
                    style={{ height: `${(item.training / maxValue) * 200}px` }}
                  ></div>
                </div>
              </div>
              
              {/* Labels */}
              <span className="text-xs text-gray-600 text-center">{item.label}</span>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>
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
