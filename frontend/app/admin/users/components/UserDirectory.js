'use client';

import { useState } from 'react';
import UserStatistics from './UserStatistics';
import QuickActions from './QuickActions';
import UserSearch from './UserSearch';
import AdvancedSearchPanel from './AdvancedSearchPanel';
import UserTable from './UserTable';
import RecentUsers from './RecentUsers';

export default function UserDirectory() {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <UserStatistics />
      
      {/* Quick Actions */}
      <QuickActions />
      
      {/* Search Bar with Advanced Search Toggle */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <UserSearch />
        </div>
        <button
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
            showAdvancedSearch 
              ? 'bg-purple-800 text-white border-purple-800' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Advanced Search
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Export</span>
        </button>
      </div>

      {/* Advanced Search Panel */}
      <AdvancedSearchPanel 
        isOpen={showAdvancedSearch} 
        onClose={() => setShowAdvancedSearch(false)} 
      />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* User Table - Takes up 3 columns */}
        <div className="lg:col-span-3">
          <UserTable />
        </div>
        
        {/* Recent Users Sidebar - Takes up 1 column */}
        <div className="lg:col-span-1">
          <RecentUsers />
        </div>
      </div>
    </div>
  );
}