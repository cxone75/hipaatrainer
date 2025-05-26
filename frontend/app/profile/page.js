import ProfileForm from './components/ProfileForm';
import SecuritySettings from './components/SecuritySettings';

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileForm />
        <SecuritySettings />
      </div>
    </div>
  );
}