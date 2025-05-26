import UserDirectory from './components/UserDirectory';

export default function UsersPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <UserDirectory />
    </div>
  );
}