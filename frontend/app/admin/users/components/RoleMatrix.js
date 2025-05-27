'use client';

import { useState } from 'react';

export default function RoleMatrix({ userId, currentRoles = [] }) {
  const [userRoles, setUserRoles] = useState(new Set(currentRoles));
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingRole, setPendingRole] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  const availableRoles = [
    { id: 'org_admin', name: 'Organization Admin', description: 'Full administrative access', sensitive: true },
    { id: 'manager', name: 'Manager', description: 'Department management access', sensitive: false },
    { id: 'staff', name: 'Staff', description: 'Standard user access', sensitive: false },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access', sensitive: false },
    { id: 'compliance_officer', name: 'Compliance Officer', description: 'Compliance monitoring access', sensitive: true },
    { id: 'auditor', name: 'Auditor', description: 'Audit and reporting access', sensitive: true }
  ];

  const handleRoleToggle = (roleId, isChecked) => {
    const role = availableRoles.find(r => r.id === roleId);

    if (role.sensitive) {
      setPendingRole(role);
      setPendingAction(isChecked ? 'add' : 'remove');
      setShowConfirmation(true);
    } else {
      updateRole(roleId, isChecked);
    }
  };

  const updateRole = (roleId, isChecked) => {
    const newRoles = new Set(userRoles);
    if (isChecked) {
      newRoles.add(roleId);
    } else {
      newRoles.delete(roleId);
    }
    setUserRoles(newRoles);

    // Here you would typically make an API call to update the user's roles
    console.log(`Updated roles for user ${userId}:`, Array.from(newRoles));
  };

  const confirmRoleChange = () => {
    updateRole(pendingRole.id, pendingAction === 'add');
    setShowConfirmation(false);
    setPendingRole(null);
    setPendingAction(null);
  };

  const cancelRoleChange = () => {
    setShowConfirmation(false);
    setPendingRole(null);
    setPendingAction(null);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-4">Role Assignment</h3>
        <p className="text-sm text-gray-600 mb-4">
          Assign or remove roles for this user. Changes to sensitive roles require confirmation.
        </p>

        <div 
          className="space-y-3"
          role="grid"
          aria-label="Role Assignment Grid"
        >
          {availableRoles.map((role) => (
            <div 
              key={role.id} 
              className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center h-5">
                <input
                  id={`role-${role.id}`}
                  type="checkbox"
                  checked={userRoles.has(role.id)}
                  onChange={(e) => handleRoleToggle(role.id, e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  aria-describedby={`role-${role.id}-desc`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <label 
                  htmlFor={`role-${role.id}`}
                  className="text-sm font-medium text-gray-900 cursor-pointer flex items-center gap-2"
                >
                  {role.name}
                  {role.sensitive && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      Sensitive
                    </span>
                  )}
                </label>
                <p 
                  id={`role-${role.id}-desc`}
                  className="text-sm text-gray-500"
                >
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Current Roles</h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(userRoles).map(roleId => {
              const role = availableRoles.find(r => r.id === roleId);
              return (
                <span 
                  key={roleId}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {role?.name}
                </span>
              );
            })}
            {userRoles.size === 0 && (
              <span className="text-sm text-gray-500">No roles assigned</span>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Role Change</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to {pendingAction} the role "{pendingRole?.name}" {pendingAction === 'add' ? 'to' : 'from'} this user? 
              This action will immediately change their access permissions.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelRoleChange}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRoleChange}
                className={`px-4 py-2 text-white rounded transition-colors ${
                  pendingAction === 'add' 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {pendingAction === 'add' ? 'Add Role' : 'Remove Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}