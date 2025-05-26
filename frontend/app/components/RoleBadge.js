export default function RoleBadge({ role = 'User' }) {
  const roleColors = {
    'Super Admin': 'bg-purple-100 text-purple-800',
    'Admin': 'bg-red-100 text-red-800',
    'Manager': 'bg-blue-100 text-blue-800',
    'User': 'bg-green-100 text-green-800',
    'Viewer': 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role] || roleColors['User']}`}>
      {role}
    </span>
  );
}