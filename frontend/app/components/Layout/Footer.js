
export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-400 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Compliance Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-white text-sm">HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-white text-sm">OSHA Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-white text-sm">3 pending tasks</span>
          </div>
        </div>

        {/* Center - Last Updated */}
        <div className="text-muted text-sm">
          Last updated: <span suppressHydrationWarning>{new Date().toLocaleDateString()}</span> at <span suppressHydrationWarning>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Right side - Links */}
        <div className="flex items-center space-x-4 text-sm">
          <a href="/help" className="text-muted hover:text-white">Help</a>
          <a href="/privacy" className="text-muted hover:text-white">Privacy</a>
          <a href="/terms" className="text-muted hover:text-white">Terms</a>
          <span className="text-muted">v1.2.3</span>
        </div>
      </div>
    </footer>
  );
}
