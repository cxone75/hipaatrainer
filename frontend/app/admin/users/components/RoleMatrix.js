
export default function RoleMatrix() {
  const roles = ['Admin', 'Manager', 'User', 'Viewer'];
  const permissions = ['Read', 'Write', 'Delete', 'Admin'];

  return (
    <div className="bg-white rounded-lg shadow border p-6">
      <h3 className="text-lg font-semibold mb-4">Role Permissions Matrix</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
              {permissions.map(permission => (
                <th key={permission} className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                  {permission}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {roles.map(role => (
              <tr key={role}>
                <td className="px-4 py-2 font-medium text-gray-900">{role}</td>
                {permissions.map(permission => (
                  <td key={`${role}-${permission}`} className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      defaultChecked={
                        (role === 'Admin') ||
                        (role === 'Manager' && permission !== 'Admin') ||
                        (role === 'User' && ['Read', 'Write'].includes(permission)) ||
                        (role === 'Viewer' && permission === 'Read')
                      }
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
