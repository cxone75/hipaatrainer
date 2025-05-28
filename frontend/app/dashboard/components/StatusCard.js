'use client';

import { useState } from 'react';

export default function StatusCard({ type, score, status, count, title, onClick, ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  if (type === 'score') {
    return (
      <div 
        className="bg-white rounded-lg shadow border p-4 h-32 flex flex-col items-center justify-center"
        {...props}
      >
        <div className="relative w-16 h-16 mb-2">
          {/* Circular gauge background */}
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={score >= 90 ? "#10b981" : score >= 70 ? "#d946ef" : "#ef4444"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 314.16} 314.16`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900">{score}%</span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 text-center">{title}</h3>
        <div className="mt-1 flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${
            score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-magenta-500' : 'bg-red-500'
          }`}></div>
          <span className="text-xs text-gray-600">
            {score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : 'Needs Attention'}
          </span>
        </div>
      </div>
    );
  }

  if (type === 'task') {
    const getStatusColor = (status) => {
    switch (status) {
      case 'urgent':
        return 'bg-white border-red-300 text-red-800 hover:border-red-400';
      case 'warning':
        return 'bg-white border-yellow-300 text-yellow-800 hover:border-yellow-400';
      case 'compliant':
        return 'bg-white border-green-300 text-green-800 hover:border-green-400';
      default:
        return 'bg-white border-gray-300 text-gray-800 hover:border-gray-400';
    }
  };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'urgent':
          return (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          );
        case 'warning':
          return (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
        case 'compliant':
          return (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <div 
        className={`rounded-lg border-2 p-3 h-32 cursor-pointer transition-all duration-200 ${getStatusColor(status)} ${
          isHovered ? 'transform scale-105 shadow-lg' : 'shadow'
        } flex flex-col justify-between`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5">
              {getStatusIcon(status)}
            </div>
            <span className="font-semibold text-xs">{title}</span>
          </div>
          {count > 0 && (
            <span className="bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs font-bold">
              {count}
            </span>
          )}
        </div>
        <div className="text-xs opacity-90">
          {status === 'urgent' && count > 0 && `${count} overdue items`}
          {status === 'warning' && count > 0 && `${count} items need attention`}
          {status === 'compliant' && 'All up to date'}
        </div>
      </div>
    );
  }

  return null;
}