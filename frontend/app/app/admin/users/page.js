
'use client';

import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import UserDirectory from './components/UserDirectory';

export default function UserManagementPage() {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/app' },
    { label: 'Admin', href: '/app/admin' },
    { label: 'User Management', href: '/app/admin/users' }
  ];

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
        </div>

        {/* User Directory Component */}
        <UserDirectory />
      </div>
    </MainLayout>
  );
}
