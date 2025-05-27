
'use client';

import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import ProfileForm from './components/ProfileForm';
import SecuritySettings from './components/SecuritySettings';

export default function ProfilePage() {
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'My Profile' }
  ];

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      // Handle save logic here
      console.log('Saving profile changes...');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account information and security settings</p>
          </div>
          <button
            onClick={handleSaveChanges}
            disabled={!hasChanges || saving}
            className="bg-purple-800 text-white px-6 py-3 rounded font-medium hover:bg-purple-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileForm onFieldChange={() => setHasChanges(true)} />
          <SecuritySettings onFieldChange={() => setHasChanges(true)} />
        </div>
      </div>
    </MainLayout>
  );
}
