
'use client';

import { useState } from 'react';

export default function RoleMatrix({ userId = '2', userRoles = new Set(['manager', 'staff']) }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingRole, setPendingRole] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [currentUserRoles, setUserRoles] = useState(userRoles);

  const availableRoles = [
    { 
      id: 'admin', 
      name: 'Administrator', 
      description: 'Full system access and user management',
      sensitive: true
    },
    { 
      id: 'manager', 
      name: 'Manager', 
      description: 'Department oversight and reporting access',
      sensitive: false
    },
    { 
      id: 'staff', 
      name: 'Staff Member', 
      description: 'Standard user access to assigned modules',
      sensitive: false
    },
    { 
      id: 'viewer', 
      name: 'View Only', 
      description: 'Read-only access to permitted content',
      sensitive: false
    },
    { 
      id: 'compliance', 
      name: 'Compliance Officer', 
      description: 'Access to compliance and audit features',
      sensitive: true
    }
  ];

  const handleRoleToggle = (roleId, isChecked) => {
    const role = availableRoles.find(r => r.id === roleId);

    if (role.sensitive) {
      setPendingRole(role);
      setPendingAction(isChecked ? 'add' : 'remove');
      setShowConfirmation(true);
      return;
    }

    updateUserRole(roleId, isChecked);
  };

  const confirmRoleChange = () => {
    if (pendingRole && pendingAction) {
      updateUserRole(pendingRole.id, pendingAction === 'add');
    }
    setShowConfirmation(false);
    setPendingRole(null);
    setPendingAction(null);
  };

  const updateUserRole = (roleId, shouldAdd) => {
    const newRoles = new Set(currentUserRoles);
    if (shouldAdd) {
      newRoles.add(roleId);
    } else {
      newRoles.delete(roleId);
    }
    setUserRoles(newRoles);

    // Here you would typically make an API call to update the user's roles
    console.log(`Updated roles for user ${userId}:`, Array.from(newRoles));
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
          aria-label="User role assignment"
        >
          {availableRoles.map((role) => {
            const isChecked = currentUserRoles.has(role.id);
            return (
              <div 
                key={role.id}
                className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors ${
                  isChecked ? 'bg-purple-50 border-purple-200' : 'hover:bg-gray-50'
                }`}
                role="gridcell"
              >
                <input
                  type="checkbox"
                  id={`role-${role.id}`}
                  checked={isChecked}
                  onChange={(e) => handleRoleToggle(role.id, e.target.checked)}
                  className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  aria-describedby={`role-${role.id}-desc`}
                />
                <div className="flex-1 min-w-0">
                  <label 
                    htmlFor={`role-${role.id}`}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="font-medium text-gray-900">{role.name}</span>
                    {role.sensitive && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Sensitive
                      </span>
                    )}
                  </label>
                  <p 
                    id={`role-${role.id}-desc`}
                    className="text-sm text-gray-600 mt-1"
                  >
                    {role.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && pendingRole && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmation-title"
        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 id="confirmation-title" className="text-lg font-semibold mb-4">
              Confirm Role Change
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to {pendingAction} the "{pendingRole.name}" role? 
              This is a sensitive role that affects system access.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={confirmRoleChange}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setPendingRole(null);
                  setPendingAction(null);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
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
