import UserCard from './UserCard';
import UserSearch from './UserSearch';

export default function UserDirectory() {
  return (
    <div className="space-y-6">
      <UserSearch />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
}