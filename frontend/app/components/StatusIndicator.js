'use client';

export default function StatusIndicator({ status, size = 'md', showText = true, className = '' }) {
  const getStatusConfig = (status) => {
    const configs = {
      'active': {
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50',
        text: 'Active'
      },
      'inactive': {
        color: 'bg-gray-500',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-50',
        text: 'Inactive'
      },
      'pending': {
        color: 'bg-yellow-500',
        textColor: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        text: 'Pending'
      },
      'suspended': {
        color: 'bg-red-500',
        textColor: 'text-red-700',
        bgColor: 'bg-red-50',
        text: 'Suspended'
      },
      'online': {
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50',
        text: 'Online'
      },
      'offline': {
        color: 'bg-gray-500',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-50',
        text: 'Offline'
      }
    };

    return configs[status?.toLowerCase()] || configs['inactive'];
  };

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const config = getStatusConfig(status);

  if (showText) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${config.bgColor} ${className}`}>
        <span className={`${sizeClasses[size]} ${config.color} rounded-full`}></span>
        <span className={`font-medium ${config.textColor} ${textSizeClasses[size]}`}>
          {config.text}
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex ${sizeClasses[size]} ${config.color} rounded-full ${className}`} title={config.text}></span>
  );
}