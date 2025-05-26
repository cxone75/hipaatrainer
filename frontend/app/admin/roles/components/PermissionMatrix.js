export default function PermissionMatrix() {
  const roles = ['Super Admin', 'Admin', 'Manager', 'User', 'Viewer'];
  const permissions = [
    'Read Users', 'Create Users', 'Update Users', 'Delete Users',
    'Read Roles', 'Create Roles', 'Update Roles', 'Delete Roles',
    'View Reports', 'Export Data', 'System Settings'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Permission Matrix</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left">Permission</th>
              {roles.map(role => (
                <th key={role} className="px-2 py-2 text-center transform -rotate-45 whitespace-nowrap">
                  <div className="w-8">{role}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map(permission => (
              <tr key={permission} className="border-t">
                <td className="px-2 py-2 font-medium">{permission}</td>
                {roles.map(role => (
                  <td key={role} className="px-2 py-2 text-center">
                    <input type="checkbox" className="w-4 h-4" />
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