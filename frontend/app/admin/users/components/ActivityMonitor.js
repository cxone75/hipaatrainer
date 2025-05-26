export default function ActivityMonitor() {
  const activities = [
    { user: 'John Doe', action: 'Logged in', timestamp: '2024-01-15 10:30 AM' },
    { user: 'Jane Smith', action: 'Updated profile', timestamp: '2024-01-15 10:25 AM' },
    { user: 'Bob Johnson', action: 'Created new user', timestamp: '2024-01-15 10:20 AM' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <span className="font-medium">{activity.user}</span>
              <span className="text-gray-600 ml-2">{activity.action}</span>
            </div>
            <span className="text-sm text-gray-500">{activity.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}