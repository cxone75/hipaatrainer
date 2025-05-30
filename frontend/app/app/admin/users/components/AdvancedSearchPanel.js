
import { useState } from 'react';

export default function AdvancedSearchPanel({ isOpen, onClose }) {
  const [filters, setFilters] = useState({
    search: '',
    roles: [],
    departments: [],
    locations: [],
    status: [],
    complianceStatus: [],
    lastLoginStart: '',
    lastLoginEnd: '',
    createdStart: '',
    createdEnd: '',
    accessLevel: []
  });

  const [savedSearches, setSavedSearches] = useState([
    'Active Admins',
    'Non-compliant Users',
    'Recent Signups',
    'Inactive 30+ Days'
  ]);

  const roles = ['Admin', 'Manager', 'User', 'Instructor', 'Viewer'];
  const departments = ['IT', 'HR', 'Finance', 'Operations', 'Clinical', 'Administration'];
  const locations = ['Main Office', 'Clinic A', 'Clinic B', 'Remote'];
  const statuses = ['Active', 'Inactive', 'Pending', 'Archived'];
  const complianceStatuses = ['Compliant', 'Non-compliant', 'Pending Review', 'Expired'];
  const accessLevels = ['Full Access', 'Limited Access', 'Read Only', 'Restricted'];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType]) 
        ? prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
        : value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      roles: [],
      departments: [],
      locations: [],
      status: [],
      complianceStatus: [],
      lastLoginStart: '',
      lastLoginEnd: '',
      createdStart: '',
      createdEnd: '',
      accessLevel: []
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    count += filters.roles.length;
    count += filters.departments.length;
    count += filters.locations.length;
    count += filters.status.length;
    count += filters.complianceStatus.length;
    count += filters.accessLevel.length;
    if (filters.lastLoginStart || filters.lastLoginEnd) count++;
    if (filters.createdStart || filters.createdEnd) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white border rounded-lg shadow-lg mb-6 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Advanced Search & Filters</h3>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} active
          </span>
          <button 
            onClick={clearAllFilters}
            className="text-sm text-purple-800 hover:text-purple-900 font-medium"
          >
            Clear All
          </button>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Text Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Text</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Name, email, or ID..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Roles Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Roles</label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {roles.map(role => (
              <label key={role} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.roles.includes(role)}
                  onChange={() => handleFilterChange('roles', role)}
                  className="rounded border-gray-300 text-purple-800 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">{role}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Departments Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Departments</label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {departments.map(dept => (
              <label key={dept} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.departments.includes(dept)}
                  onChange={() => handleFilterChange('departments', dept)}
                  className="rounded border-gray-300 text-purple-800 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">{dept}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="space-y-2">
            {statuses.map(status => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status)}
                  onChange={() => handleFilterChange('status', status)}
                  className="rounded border-gray-300 text-purple-800 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Compliance Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Status</label>
          <div className="space-y-2">
            {complianceStatuses.map(status => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.complianceStatus.includes(status)}
                  onChange={() => handleFilterChange('complianceStatus', status)}
                  className="rounded border-gray-300 text-purple-800 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Locations Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Locations</label>
          <div className="space-y-2">
            {locations.map(location => (
              <label key={location} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.locations.includes(location)}
                  onChange={() => handleFilterChange('locations', location)}
                  className="rounded border-gray-300 text-purple-800 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">{location}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Last Login Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Login Date</label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.lastLoginStart}
              onChange={(e) => handleFilterChange('lastLoginStart', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Start date"
            />
            <input
              type="date"
              value={filters.lastLoginEnd}
              onChange={(e) => handleFilterChange('lastLoginEnd', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="End date"
            />
          </div>
        </div>

        {/* Created Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.createdStart}
              onChange={(e) => handleFilterChange('createdStart', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Start date"
            />
            <input
              type="date"
              value={filters.createdEnd}
              onChange={(e) => handleFilterChange('createdEnd', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="End date"
            />
          </div>
        </div>

        {/* Access Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
          <div className="space-y-2">
            {accessLevels.map(level => (
              <label key={level} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.accessLevel.includes(level)}
                  onChange={() => handleFilterChange('accessLevel', level)}
                  className="rounded border-gray-300 text-purple-800 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Saved Searches */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Saved Searches</h4>
          <button className="text-sm text-purple-800 hover:text-purple-900 font-medium">
            Save Current Search
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {savedSearches.map((search, index) => (
            <button
              key={index}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
        <button 
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-purple-800 rounded-lg hover:bg-purple-900">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
