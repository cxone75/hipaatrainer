export default function RoleMatrix() {
  const roles = ['Admin', 'Manager', 'User', 'Viewer'];
  const permissions = ['Read', 'Write', 'Delete', 'Admin'];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permission Matrix</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
              {permissions.map(permission => (
                <th key={permission} className="text-center py-3 px-4 font-medium text-gray-700">
                  {permission}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role} className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-900">{role}</td>
                {permissions.map(permission => (
                  <td key={`${role}-${permission}`} className="text-center py-3 px-4">
                    <input
                      type="checkbox"
                      defaultChecked={
                        (role === 'Admin') ||
                        (role === 'Manager' && permission !== 'Admin') ||
                        (role === 'User' && ['Read', 'Write'].includes(permission)) ||
                        (role === 'Viewer' && permission === 'Read')
                      }
                      className="h-4 w-4 text-purple-800 focus:ring-purple-800 border-gray-300 rounded"
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