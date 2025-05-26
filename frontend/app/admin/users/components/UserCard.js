import UserAvatar from '../../../components/UserAvatar';
import RoleBadge from '../../../components/RoleBadge';
import StatusIndicator from '../../../components/StatusIndicator';

export default function UserCard({ user = { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' } }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <div className="flex items-center space-x-3 mb-3">
        <UserAvatar name={user.name} />
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <RoleBadge role={user.role} />
        <StatusIndicator status={user.status} />
      </div>
    </div>
  );
}