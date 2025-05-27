
'use client';

import { useState } from 'react';
import UserStatistics from './UserStatistics';
import QuickActions from './QuickActions';
import UserSearch from './UserSearch';
import AdvancedSearchPanel from './AdvancedSearchPanel';
import UserTable from './UserTable';
import BulkActions from './BulkActions';
import UserProfileModal from './UserProfileModal';

export default function UserDirectory() {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    department: '',
    location: '',
    status: ''
  });

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleApplyFilters = () => {
    // Filters are applied automatically when state changes
    console.log('Applied filters:', filters);
  };

  const handleClearFilters = () => {
    setFilters({
      role: '',
      department: '',
      location: '',
      status: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Directory</h1>
        </div>
        <div className="flex-1 max-w-md">
          <UserSearch onSearch={handleSearch} onClear={handleClearSearch} />
        </div>
      </div>

      {/* Statistics Cards */}
      <UserStatistics />
      
      {/* Quick Actions */}
      <QuickActions onAddUser={handleAddUser} />

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
              <select 
                value={filters.role} 
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Instructor">Instructor</option>
                <option value="Clinical Staff">Clinical Staff</option>
                <option value="User">User</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            {/* Department Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select 
                value={filters.department} 
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Departments</option>
                <option value="Clinical">Clinical</option>
                <option value="Administration">Administration</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Nursing">Nursing</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select 
                value={filters.location} 
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                <option value="Main Campus">Main Campus</option>
                <option value="North Clinic">North Clinic</option>
                <option value="South Clinic">South Clinic</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compliance Status
              </label>
              <select 
                value={filters.status} 
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Compliant">Compliant</option>
                <option value="Overdue">Overdue</option>
                <option value="Pending">Pending</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>

            <button 
              onClick={handleApplyFilters}
              className="w-full bg-purple-800 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-900 transition-colors"
            >
              Apply Filters
            </button>
            
            <button 
              onClick={handleClearFilters}
              className="w-full mt-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* User Table - Takes up 3 columns */}
        <div className="lg:col-span-3">
          <UserTable 
            selectedUsers={selectedUsers}
            onSelectionChange={setSelectedUsers}
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>
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

      {/* Add User Modal */}
      <UserProfileModal
        user={null}
        isOpen={showAddUserModal}
        onClose={handleCloseAddUserModal}
        isEditMode={true}
      />
    </div>
  );
}
