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
'use client';

export default function RoleBadge({ role, size = 'md', className = '' }) {
  const getRoleColor = (roleName) => {
    const roleColors = {
      'admin': 'bg-red-100 text-red-800 border-red-200',
      'manager': 'bg-blue-100 text-blue-800 border-blue-200',
      'supervisor': 'bg-purple-100 text-purple-800 border-purple-200',
      'employee': 'bg-green-100 text-green-800 border-green-200',
      'contractor': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'guest': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    const normalizedRole = roleName?.toLowerCase() || 'employee';
    return roleColors[normalizedRole] || roleColors['employee'];
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${getRoleColor(role)} ${sizeClasses[size]} ${className}`}>
      {role || 'Employee'}
    </span>
  );
}
