
import MainLayout from './components/Layout/MainLayout';

export default function Home() {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' }
  ];

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">HIPAA Trainer Dashboard</h1>
          <p className="text-lg text-gray-600 mb-8">User Management and Compliance Tracking System</p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-purple-800 text-white p-6 rounded-lg">
              <h3 className="text-2xl font-bold">156</h3>
              <p className="text-purple-200">Active Users</p>
            </div>
            <div className="bg-blue-400 text-gray-900 p-6 rounded-lg">
              <h3 className="text-2xl font-bold">23</h3>
              <p className="text-blue-800">Pending Trainings</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg">
              <h3 className="text-2xl font-bold">98%</h3>
              <p className="text-green-200">Compliance Rate</p>
            </div>
            <div className="bg-red-600 text-white p-6 rounded-lg">
              <h3 className="text-2xl font-bold">3</h3>
              <p className="text-red-200">Overdue Tasks</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600 mb-4">View and manage user accounts and permissions</p>
              <a href="/admin/users" className="bg-purple-800 text-white px-6 py-3 rounded font-medium hover:bg-purple-900 transition-colors">
                Manage Users
              </a>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Training Courses</h3>
              <p className="text-gray-600 mb-4">Access HIPAA and OSHA training materials</p>
              <a href="/courses" className="bg-blue-400 text-gray-900 px-6 py-3 rounded font-medium hover:bg-blue-500 transition-colors">
                View Courses
              </a>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Reports</h3>
              <p className="text-gray-600 mb-4">Generate and download compliance reports</p>
              <a href="/reports" className="bg-green-500 text-white px-6 py-3 rounded font-medium hover:bg-green-600 transition-colors">
                View Reports
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
