
<old_str>export default function UserProfilePage({ params }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <p>User ID: {params.id}</p>
    </div>
  );
}</old_str>
<new_str>import MainLayout from '../../../components/Layout/MainLayout';
import UserCard from '../components/UserCard';
import RoleMatrix from '../components/RoleMatrix';
import ActivityMonitor from '../components/ActivityMonitor';
import Link from 'next/link';

export default function UserProfilePage({ params }) {
  // Mock user data - in real app, this would come from API
  const user = {
    id: params.id,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    department: 'Clinical',
    location: 'New York, NY',
    role: 'Manager',
    roles: ['staff', 'manager'],
    status: 'active',
    complianceStatus: 'compliant',
    lastLogin: '2025-05-26T10:30:00Z',
    joinedDate: '2023-01-15T00:00:00Z',
    avatar: null
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Administration', href: '/admin' },
    { label: 'User Management', href: '/admin/users' },
    { label: user.name }
  ];

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <p className="text-gray-600">User ID: {params.id}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <Link 
              href={`/admin/users/${params.id}/edit`}
              className="bg-purple-800 text-white px-6 py-3 rounded font-medium hover:bg-purple-900 transition-colors text-center"
            >
              Edit Profile
            </Link>
            <button className="bg-red-600 text-white px-6 py-3 rounded font-medium hover:bg-red-700 transition-colors">
              Archive User
            </button>
          </div>
        </div>

        {/* Main Content - Mobile: Stacked, Desktop: Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-purple-100 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt="User Photo" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl md:text-3xl font-bold text-purple-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Department</label>
                      <p className="text-gray-900">{user.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Location</label>
                      <p className="text-gray-900">{user.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Role History */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-md font-medium mb-3">Role History</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Manager</span>
                    <span className="text-gray-500">Jan 15, 2024 - Present</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Staff</span>
                    <span className="text-gray-500">Jan 15, 2023 - Jan 15, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role Assignment Matrix */}
          <div className="lg:col-span-1">
            <RoleMatrix userId={params.id} currentRoles={user.roles} />
          </div>

          {/* Activity Monitor - Full width on mobile, spans both columns on desktop */}
          <div className="lg:col-span-2">
            <ActivityMonitor userId={params.id} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}</new_str>
