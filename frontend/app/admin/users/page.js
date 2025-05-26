
import MainLayout from '../../components/Layout/MainLayout';
import UserDirectory from './components/UserDirectory';

export default function UsersPage() {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Administration', href: '/admin' },
    { label: 'User Management' }
  ];

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">View and manage user accounts and permissions</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-400 text-gray-900 px-6 py-3 rounded font-medium hover:bg-blue-500 transition-colors">
              Bulk Import
            </button>
            <button className="bg-purple-800 text-white px-6 py-3 rounded font-medium hover:bg-purple-900 transition-colors">
              Add User
            </button>
          </div>
        </div>
        <UserDirectory />
      </div>
    </MainLayout>
  );
}
