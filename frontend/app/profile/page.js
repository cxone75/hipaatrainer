
import MainLayout from '../components/Layout/MainLayout';
import ProfileForm from './components/ProfileForm';
import SecuritySettings from './components/SecuritySettings';

export default function ProfilePage() {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Profile' }
  ];

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information and security settings</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileForm />
          <SecuritySettings />
        </div>
      </div>
    </MainLayout>
  );
}
