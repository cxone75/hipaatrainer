import { useState } from 'react';

export default function UserSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mockSuggestions = [
    'David Brown - david.brown@example.com',
    'David Garcia - david.garcia@example.com', 
    'David Johnson - david.johnson@example.com',
    'Department: Administration',
    'Role: Admin'
  ];

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value.length > 2) {
      setSuggestions(mockSuggestions.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      ));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="p-4">
        <div className="relative">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by name, email, department, or role..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-200 rounded-lg max-h-60 overflow-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="text-sm text-gray-900">{suggestion}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Instructor</option>
              <option>User</option>
              <option>Viewer</option>
            </select>
            
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
              <option>Archived</option>
            </select>
            
            <button className="bg-purple-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-900 transition-colors">
              Search
            </button>
          </div>
        </div>
        
        {/* Search Results Count */}
        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <span>1,247 users found</span>
          <button className="text-purple-800 hover:text-purple-900 font-medium">
            Clear all filters
          </button>
        </div>
      </div>
    </div>
  );
}