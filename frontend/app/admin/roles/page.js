
import MainLayout from '../../components/Layout/MainLayout';
import RoleEditor from './components/RoleEditor';
import PermissionMatrix from './components/PermissionMatrix';

export default function RolesPage() {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Administration', href: '/admin' },
    { label: 'Role Management' }
  ];

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
            <p className="text-gray-600 mt-2">Manage user roles and permissions</p>
          </div>
          <button className="bg-purple-800 text-white px-6 py-3 rounded font-medium hover:bg-purple-900 transition-colors">
            Create Role
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RoleEditor />
          <PermissionMatrix />
        </div>
      </div>
    </MainLayout>
  );
}
