
export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-400 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Compliance Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-200 text-sm">HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-200 text-sm">OSHA Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-200 text-sm">3 pending tasks</span>
          </div>
        </div>

        {/* Center - Last Updated */}
        <div className="text-gray-400 text-sm">
          Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* Right side - Links */}
        <div className="flex items-center space-x-4 text-sm">
          <a href="/help" className="text-gray-400 hover:text-gray-200">Help</a>
          <a href="/privacy" className="text-gray-400 hover:text-gray-200">Privacy</a>
          <a href="/terms" className="text-gray-400 hover:text-gray-200">Terms</a>
          <span className="text-gray-400">v1.2.3</span>
        </div>
      </div>
    </footer>
  );
}
