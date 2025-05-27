
'use client';

import { useState } from 'react';
import UserAvatar from '../../../components/UserAvatar';
import RoleBadge from '../../../components/RoleBadge';
import StatusIndicator from '../../../components/StatusIndicator';
import UserProfileModal from './UserProfileModal';

export default function UserTable({ selectedUsers = [], onSelectionChange }) {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data with all required columns
  const users = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      roles: ['Clinical Staff', 'HIPAA Officer'],
      department: 'Clinical',
      location: 'Main Campus',
      complianceStatus: 'compliant',
      lastLogin: '2025-05-26T14:30:00Z',
      avatar: '/avatars/sarah.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@hospital.com',
      roles: ['IT Admin'],
      department: 'IT',
      location: 'Main Campus',
      complianceStatus: 'overdue',
      lastLogin: '2025-05-25T09:15:00Z',
      avatar: '/avatars/michael.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@hospital.com',
      roles: ['Nurse Manager'],
      department: 'Nursing',
      location: 'North Clinic',
      complianceStatus: 'pending',
      lastLogin: '2025-05-26T16:45:00Z',
      avatar: '/avatars/emily.jpg'
    },
    {
      id: 4,
      name: 'David Martinez',
      email: 'david.martinez@hospital.com',
      roles: ['HR Manager'],
      department: 'HR',
      location: 'Main Campus',
      complianceStatus: 'compliant',
      lastLogin: '2025-05-26T11:20:00Z',
      avatar: '/avatars/david.jpg'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@hospital.com',
      roles: ['Finance Officer'],
      department: 'Finance',
      location: 'Remote',
      complianceStatus: 'pending',
      lastLogin: '2025-05-24T13:30:00Z',
      avatar: '/avatars/lisa.jpg'
    }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(users.map(user => user.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      onSelectionChange([...selectedUsers, userId]);
    } else {
      onSelectionChange(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleRowClick = (userId) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const formatLastLogin = (loginDate) => {
    const date = new Date(loginDate);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getComplianceStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplianceStatusText = (status) => {
    switch (status) {
      case 'compliant': return 'Compliant';
      case 'overdue': return 'Overdue';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Users</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{users.length} users</span>
            <select 
              value={pageSize} 
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table 
          className="min-w-full divide-y divide-gray-200" 
          aria-label="User Directory Table"
          role="table"
        >
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  aria-label="Select all users"
                />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSort('name')}
              >
                Name
                {sortConfig.key === 'name' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('email')}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSort('email')}
              >
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roles
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('department')}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSort('department')}
              >
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compliance Status
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastLogin')}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSort('lastLogin')}
              >
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr 
                key={user.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(user.id)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleRowClick(user.id)}
                role="row"
                aria-label={`User ${user.name}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectUser(user.id, e.target.checked);
                    }}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    aria-label={`Select ${user.name}`}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <UserAvatar 
                      name={user.name} 
                      src={user.avatar}
                      size="sm"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role, index) => (
                      <RoleBadge key={index} role={role} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getComplianceStatusColor(user.complianceStatus)}`}>
                    {getComplianceStatusText(user.complianceStatus)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatLastLogin(user.lastLogin)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    className="text-purple-600 hover:text-purple-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing 1 to {Math.min(pageSize, users.length)} of {users.length} users
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm">
            Page {currentPage} of {Math.ceil(users.length / pageSize)}
          </span>
          <button 
            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
            disabled={currentPage >= Math.ceil(users.length / pageSize)}
          >
            Next
          </button>
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        user={selectedUser}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}
