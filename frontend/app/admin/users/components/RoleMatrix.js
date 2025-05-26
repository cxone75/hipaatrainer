export default function RoleMatrix() {
  const roles = ['Admin', 'Manager', 'User', 'Viewer'];
  const permissions = ['Read', 'Write', 'Delete', 'Admin'];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Role Permission Matrix</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Role</th>
              {permissions.map(permission => (
                <th key={permission} className="px-4 py-2 text-center">{permission}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role} className="border-t">
                <td className="px-4 py-2 font-medium">{role}</td>
                {permissions.map(permission => (
                  <td key={permission} className="px-4 py-2 text-center">
                    <input type="checkbox" className="rounded" />
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