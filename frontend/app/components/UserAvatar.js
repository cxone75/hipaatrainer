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