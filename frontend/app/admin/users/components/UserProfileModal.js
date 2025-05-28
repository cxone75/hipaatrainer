'use client';

import { useState, useEffect } from 'react';
import UserAvatar from '../../../components/UserAvatar';
import RoleBadge from '../../../components/RoleBadge';
import ActivityMonitor from './ActivityMonitor';

export default function UserProfileModal({ user, isOpen, onClose, initialEditMode = false }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [availableRoles] = useState(['Admin', 'Manager', 'Instructor', 'Clinical Staff', 'User', 'Viewer']);

  // Initialize form data when entering edit mode or when modal opens for new user
  const handleEditClick = () => {
    if (user) {
      setFormData({
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        email: user.email,
        department: user.department,
        location: user.location,
        roles: [...user.roles],
        status: user.status || 'active'
      });
    } else {
      // Initialize empty form for new user
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        location: '',
        roles: [],
        status: 'active'
      });
    }
    setIsEditMode(true);
    setActiveTab('profile');
  };

  // Initialize form data when modal opens for new user creation or when edit mode is requested
  useEffect(() => {
    if (isOpen) {
      if (!user) {
        // New user creation - always start in edit mode
        handleEditClick();
      } else if (initialEditMode) {
        // Existing user - start in edit mode if requested
        handleEditClick();
      } else {
        // Existing user - start in view mode
        setIsEditMode(false);
        setActiveTab('profile');
      }
    }
  }, [isOpen, user, initialEditMode]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here - update user data
    console.log('Saving user data:', formData);
    // In a real app, you would make an API call here
    onClose();
  };

  const handleCancel = () => {
    setFormData({});
    onClose();
  };

  const handleRoleToggle = (role) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-[800px] h-[720px] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <UserAvatar 
                  name={user.name} 
                  src={user.avatar}
                  size="lg"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? 'Edit User' : user.name}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add New User</h2>
                <p className="text-gray-600">Create a new user account</p>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ×
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
            {!isEditMode && (
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'activity'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Activity
              </button>
            )}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[480px]">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {isEditMode ? (
                /* Edit Form */
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status || 'active'}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  {/* Role Management */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Roles & Permissions
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableRoles.map((role) => (
                        <label
                          key={role}
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.roles?.includes(role) || false}
                            onChange={() => handleRoleToggle(role)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm font-medium text-gray-700">{role}</span>
                        </label>
                      ))}
                    </div>
                    {formData.roles?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Selected roles:</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.roles.map((role, index) => (
                            <RoleBadge key={index} role={role} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              ) : user ? (
                /* View Mode */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p className="text-gray-900">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Department</label>
                        <p className="text-gray-900">{user.department}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Location</label>
                        <p className="text-gray-900">{user.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Access & Status</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Roles</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {user.roles.map((role, index) => (
                            <RoleBadge key={index} role={role} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Compliance Status</label>
                        <div className="mt-1">
                          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getComplianceStatusColor(user.complianceStatus)}`}>
                            {getComplianceStatusText(user.complianceStatus)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Last Login</label>
                        <p className="text-gray-900">{formatDate(user.lastLogin)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* No User Selected */
                <div className="text-center py-8">
                  <p className="text-gray-500">No user data available</p>
                </div>
              )}

              {/* Additional Information - Only show in view mode */}
              {!isEditMode && user && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Employee ID</label>
                      <p className="text-gray-900">EMP-{user.id.toString().padStart(4, '0')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Hire Date</label>
                      <p className="text-gray-900">January 15, 2022</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Manager</label>
                      <p className="text-gray-900">John Smith</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && user && (
            <div>
              <ActivityMonitor userId={user.id} isModal={true} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            {user ? `User ID: ${user.id} • Created: January 15, 2022` : 'New User'}
          </div>
          <div className="flex space-x-3">
            {isEditMode ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  {user ? 'Save Changes' : 'Create User'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Edit User
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}