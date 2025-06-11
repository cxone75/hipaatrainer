'use client';

import { useState } from 'react';
import UserStatistics from './UserStatistics';
import UserSearch from './UserSearch';
import AdvancedSearchPanel from './AdvancedSearchPanel';
import UserTable from './UserTable';
import BulkActions from './BulkActions';
import UserProfileModal from './UserProfileModal';

export default function UserDirectory() {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <UserStatistics />

      {/* Advanced Search Panel */}
      <AdvancedSearchPanel 
        isOpen={showAdvancedSearch} 
        onClose={() => setShowAdvancedSearch(false)} 
      />

      {/* Main Content */}
      <div>
        {/* User Table */}
        <UserTable 
          selectedUsers={selectedUsers}
          onSelectionChange={setSelectedUsers}
        />
      </div>

      {/* Mobile Filters Dropdown */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          className={`w-full px-4 py-3 text-sm font-medium rounded-lg border transition-colors ${
            showAdvancedSearch 
              ? 'bg-purple-800 text-white border-purple-800' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {showAdvancedSearch ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      </div>
  );
}