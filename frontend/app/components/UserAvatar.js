export default function UserAvatar({ name = 'User', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className={`${sizeClasses[size]} bg-blue-500 text-white rounded-full flex items-center justify-center font-medium`}>
      {initials}
    </div>
  );
}
'use client';

export default function UserAvatar({ user, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500'
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  return (
    <div className={`${sizeClasses[size]} ${getAvatarColor(user?.name || 'User')} rounded-full flex items-center justify-center text-white font-medium ${className}`}>
      {user?.avatar ? (
        <img 
          src={user.avatar} 
          alt={user.name || 'User'} 
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{getInitials(user?.name || 'User')}</span>
      )}
    </div>
  );
}
