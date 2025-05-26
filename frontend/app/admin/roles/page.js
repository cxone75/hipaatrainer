import RoleEditor from './components/RoleEditor';
import PermissionMatrix from './components/PermissionMatrix';

export default function RolesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Role Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RoleEditor />
        <PermissionMatrix />
      </div>
    </div>
  );
}