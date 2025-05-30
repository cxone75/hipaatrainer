
import UserAvatar from '../../../components/UserAvatar';
import RoleBadge from '../../../components/RoleBadge';

export default function RecentUsers() {
  const recentUsers = [
    {
      id: 1,
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      role: 'user',
      addedAt: '2 hours ago',
      addedBy: 'Admin User'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      role: 'instructor',
      addedAt: '4 hours ago',
      addedBy: 'HR Manager'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      role: 'manager',
      addedAt: '1 day ago',
      addedBy: 'System Admin'
    },
    {
      id: 4,
      name: 'David Martinez',
      email: 'david.martinez@example.com',
      role: 'user',
      addedAt: '2 days ago',
      addedBy: 'Admin User'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recently Added Users</h3>
        <button className="text-sm text-purple-800 hover:text-purple-900 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {recentUsers.map(user => (
          <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <UserAvatar name={user.name} size="sm" />
              <div>
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RoleBadge role={user.role} size="sm" />
              <div className="text-right">
                <div className="text-xs text-gray-500">{user.addedAt}</div>
                <div className="text-xs text-gray-400">by {user.addedBy}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
