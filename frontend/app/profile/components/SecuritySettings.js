export default function SecuritySettings() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Change Password</h4>
          <form className="space-y-3">
            <input type="password" placeholder="Current Password" className="w-full p-2 border rounded" />
            <input type="password" placeholder="New Password" className="w-full p-2 border rounded" />
            <input type="password" placeholder="Confirm New Password" className="w-full p-2 border rounded" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Change Password
            </button>
          </form>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
          <div className="flex items-center justify-between">
            <span>Enable 2FA</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Login History</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Last login: Jan 15, 2024 10:30 AM</span>
              <span className="text-green-500">Success</span>
            </div>
            <div className="flex justify-between">
              <span>Previous: Jan 14, 2024 4:45 PM</span>
              <span className="text-green-500">Success</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}