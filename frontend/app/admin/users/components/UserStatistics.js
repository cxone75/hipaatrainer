
export default function UserStatistics() {
  const stats = [
    { label: 'Total Users', value: '1,247', change: '+12%', changeType: 'positive' },
    { label: 'Active Users', value: '1,156', change: '+8%', changeType: 'positive' },
    { label: 'Pending Users', value: '23', change: '-15%', changeType: 'negative' },
    { label: 'Archived Users', value: '68', change: '+3%', changeType: 'neutral' },
    { label: 'Compliance Rate', value: '94.2%', change: '+2.1%', changeType: 'positive' },
    { label: 'Last 30 Days', value: '156', change: '+24%', changeType: 'positive' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 
              stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
