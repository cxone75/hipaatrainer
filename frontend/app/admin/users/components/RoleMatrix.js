
'use client';

import { useState } from 'react';

export default function RoleMatrix() {
  const roles = ['Admin', 'Manager', 'User', 'Viewer'];
  const permissions = ['Read', 'Write', 'Delete', 'Admin'];

  return (
    <div className="bg-white rounded-lg shadow border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permission Matrix</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Role</th>
              {permissions.map((permission) => (
                <th key={permission} className="px-4 py-2 text-center text-sm font-medium text-gray-500">
                  {permission}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role}>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">{role}</td>
                {permissions.map((permission) => (
                  <td key={`${role}-${permission}`} className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-800 border-gray-300 rounded focus:ring-purple-800"
                      defaultChecked={true}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
