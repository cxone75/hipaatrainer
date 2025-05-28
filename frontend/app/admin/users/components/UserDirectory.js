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

      {/* Main Content Area with Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Desktop Filters */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow border p-4">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Role Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" aria-label="Filter by Role">
                Role
              </label>
              <select className="w-full px-3 py-2 border border-light rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Instructor</option>
                <option>Clinical Staff</option>
                <option>User</option>
                <option>Viewer</option>
              </select>
            </div>

            {/* Department Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select className="w-full px-3 py-2 border border-light rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>All Departments</option>
                <option>Clinical</option>
                <option>Administration</option>
                <option>IT</option>
                <option>HR</option>
                <option>Finance</option>
                <option>Nursing</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>All Locations</option>
                <option>Main Campus</option>
                <option>North Clinic</option>
                <option>South Clinic</option>
                <option>Remote</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compliance Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>All Status</option>
                <option>Compliant</option>
                <option>Overdue</option>
                <option>Pending</option>
                <option>Not Started</option>
              </select>
            </div>

            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Apply Filters
            </button>

            <button className="w-full mt-2 bg-white border border-light text-dark py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Clear Filters
            </button>
          </div>
        </div>

        {/* User Table - Takes up 3 columns */}
        <div className="lg:col-span-3">
          <UserTable 
            selectedUsers={selectedUsers}
            onSelectionChange={setSelectedUsers}
          />
        </div>
      </div>

      {/* Mobile Filters Dropdown */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          className={`w-full px-4 py-3 text-sm font-medium rounded-lg border transition-colors ${
            showAdvancedSearch 
              ? 'bg-primary text-white border-primary' 
              : 'bg-white text-dark border-light hover:bg-gray-50'
          }`}
        >
          {showAdvancedSearch ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      </div>
  );
}