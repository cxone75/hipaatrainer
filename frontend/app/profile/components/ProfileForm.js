'use client';

import { useState, useRef } from 'react';

export default function ProfileForm({ onFieldChange }) {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 123-4567',
    email: 'john@example.com',
    photo: null
  });

  const [organizations, setOrganizations] = useState([
    { id: '1', name: 'Healthcare Clinic A', role: 'Admin' },
    { id: '2', name: 'Dental Practice B', role: 'Manager' },
    { id: '3', name: 'Medical Center C', role: 'Staff' }
  ]);

  const [currentOrg, setCurrentOrg] = useState('1');
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [orgToRemove, setOrgToRemove] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    onFieldChange?.();
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, photo: e.target.result }));
        onFieldChange?.();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOrgSwitch = async (orgId) => {
    try {
      // await apiClient.request(`/users/current/switch-org`, {
      //   method: 'POST',
      //   body: { organizationId: orgId }
      // });
      setCurrentOrg(orgId);
      // Reload dashboard with new context
      window.location.href = '/';
    } catch (error) {
      console.error('Error switching organization:', error);
      alert('Failed to switch organization');
    }
  };

  const handleRemoveOrg = async (orgId) => {
    try {
      // await apiClient.request(`/users/current/remove-org`, {
      //   method: 'DELETE',
      //   body: { organizationId: orgId }
      // });
      setOrganizations(prev => prev.filter(org => org.id !== orgId));
      setShowRemoveModal(false);
      setOrgToRemove(null);
      if (currentOrg === orgId && organizations.length > 1) {
        const remainingOrgs = organizations.filter(org => org.id !== orgId);
        handleOrgSwitch(remainingOrgs[0].id);
      }
    } catch (error) {
      console.error('Error removing organization:', error);
      alert('Failed to remove organization');
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <form 
          className="space-y-4"
          aria-label="Profile Form"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Photo Upload */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7 7z" />
              </svg>
            </div>
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200"
              >
                Upload Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                aria-label="Upload profile photo"
              />
              <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={profile.email}
              readOnly
              className="w-full p-2 border rounded bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Organizations */}
          <div>
            <label className="block text-sm font-medium mb-2">Organizations</label>
            <div className="space-y-2">
              {organizations.map((org) => (
                <div key={org.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="currentOrg"
                      value={org.id}
                      checked={currentOrg === org.id}
                      onChange={() => handleOrgSwitch(org.id)}
                      className="text-purple-600"
                      aria-label={`Switch to ${org.name}`}
                    />
                    <div>
                      <p className="font-medium">{org.name}</p>
                      <p className="text-sm text-gray-500">Role: {org.role}</p>
                    </div>
                  </div>
                  {organizations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setOrgToRemove(org);
                        setShowRemoveModal(true);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                      aria-label={`Remove ${org.name}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Remove Organization Modal */}
      {showRemoveModal && orgToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Remove Organization</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove "{orgToRemove.name}" from your profile? 
              This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleRemoveOrg(orgToRemove.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
              <button
                onClick={() => {
                  setShowRemoveModal(false);
                  setOrgToRemove(null);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}