
'use client';

export default function RoleMatrix() {
  const roles = ['Admin', 'Manager', 'User', 'Viewer'];
  const permissions = ['Read', 'Write', 'Delete', 'Admin'];

  function getPermissionStatus(role, permission) {
    // Mock permission logic
    const permissionsMap = {
      'Admin': ['Read', 'Write', 'Delete', 'Admin'],
      'Manager': ['Read', 'Write', 'Delete'],
      'User': ['Read', 'Write'],
      'Viewer': ['Read']
    };
    return permissionsMap[role]?.includes(permission) || false;
  }

  function togglePermission(role, permission) {
    console.log(`Toggling ${permission} for ${role}`);
    // Implement permission toggle logic
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Role Permission Matrix</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Role</th>
              {permissions.map((permission) => (
                <th key={permission} className="px-4 py-2 text-center text-sm font-medium text-gray-900">
                  {permission}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{role}</td>
                {permissions.map((permission) => {
                  const hasPermission = getPermissionStatus(role, permission);
                  return (
                    <td key={permission} className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={hasPermission}
                        onChange={() => togglePermission(role, permission)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
