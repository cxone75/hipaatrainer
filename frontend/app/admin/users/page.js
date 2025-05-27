
'use client';

import { useState } from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import UserDirectory from './components/UserDirectory';
import UserProfileModal from './components/UserProfileModal';

export default function UsersPage() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Administration', href: '/admin' },
    { label: 'User Management' }
  ];

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false);
  };

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">View and manage user accounts and permissions</p>
          </div>
        </div>
        <UserDirectory />
        
        {/* Add User Modal */}
        <UserProfileModal
          user={null}
          isOpen={showAddUserModal}
          onClose={handleCloseAddUserModal}
          isEditMode={true}
        />
      </div>
    </MainLayout>
  );
}
