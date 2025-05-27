
'use client';

import { useState } from 'react';

export default function UserSearch({ onSearch, onClear }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mockSuggestions = [
    'Dr. Sarah Johnson - sarah.johnson@hospital.com',
    'Michael Chen - michael.chen@hospital.com',
    'Emily Rodriguez - emily.rodriguez@hospital.com',
    'David Martinez - david.martinez@hospital.com',
    'Department: Clinical',
    'Department: IT',
    'Department: Nursing',
    'Role: Clinical Staff',
    'Role: Admin',
    'Location: Main Campus',
    'Location: North Clinic',
  ];

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value.length > 2) {
      const filtered = mockSuggestions.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    // Emit search event to parent component
    if (typeof onSearch === 'function') {
      onSearch(searchQuery);
    }
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
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
            onKeyPress={handleKeyPress}
            placeholder="Search by name, email, department, or role..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            aria-label="Search users"
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
                    handleSearch();
                  }}
                >
                  <div className="text-sm text-gray-900">{suggestion}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button 
          onClick={handleSearch}
          className="bg-purple-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-900 transition-colors"
        >
          Search
        </button>
      </div>
      
      {/* Search Results Count */}
      {searchQuery && (
        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <span>Showing results for "{searchQuery}"</span>
          <button 
            onClick={() => {
              setSearchQuery('');
              setShowSuggestions(false);
              if (typeof onClear === 'function') {
                onClear();
              }
            }}
            className="text-purple-800 hover:text-purple-900 font-medium"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowSuggestions(false)}
        ></div>
      )}
    </div>
  );
}
