'use client';

export default function RoleMatrix() {
  const roles = ['Admin', 'Manager', 'User', 'Viewer'];
  const permissions = ['Read', 'Write', 'Delete', 'Admin'];

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <h2 className="text-lg font-semibold mb-4">Role & Permissions Matrix</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b">Role</th>
              {permissions.map((permission) => (
                <th key={permission} className="text-center py-2 px-4 border-b">
                  {permission}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b font-medium">{role}</td>
                {permissions.map((permission) => (
                  <td key={`${role}-${permission}`} className="text-center py-3 px-4 border-b">
                    <input
                      type="checkbox"
                      className="rounded text-purple-600"
                      defaultChecked={getDefaultPermission(role, permission)}
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

function getDefaultPermission(role, permission) {
  const matrix = {
    'Admin': ['Read', 'Write', 'Delete', 'Admin'],
    'Manager': ['Read', 'Write', 'Delete'],
    'User': ['Read', 'Write'],
    'Viewer': ['Read']
  };

  return matrix[role]?.includes(permission) || false;
}