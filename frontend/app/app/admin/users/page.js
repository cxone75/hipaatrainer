
'use client';

import React from 'react';
import UserDirectory from './components/UserDirectory';

export default function UserManagementPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
      </div>

      {/* User Directory Component */}
      <UserDirectory />
    </div>
  );
}
