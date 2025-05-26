export default function StatusIndicator({ status = 'active' }) {
  const statusConfig = {
    active: {
      color: 'bg-green-500',
      label: 'Active'
    },
    inactive: {
      color: 'bg-red-500',
      label: 'Inactive'
    },
    pending: {
      color: 'bg-yellow-500',
      label: 'Pending'
    },
    suspended: {
      color: 'bg-orange-500',
      label: 'Suspended'
    }
  };

  const config = statusConfig[status] || statusConfig.active;

  return (
    <div className="flex items-center space-x-1">
      <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      <span className="text-xs text-gray-600">{config.label}</span>
    </div>
  );
}