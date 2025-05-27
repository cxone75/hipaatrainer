export default function QuickActions({ onAddUser }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button 
        onClick={onAddUser}
        className="bg-purple-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-900 transition-colors flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add User</span>
      </button>
    </div>
  );
}