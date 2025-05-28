export default function RoleEditor() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Role Editor</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Role Name</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="Enter role name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea className="w-full p-2 border rounded" rows="3" placeholder="Role description"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Permissions</label>
          <div className="space-y-2">
            {['Read Users', 'Write Users', 'Delete Users', 'Manage Roles'].map(permission => (
              <label key={permission} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>{permission}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-800">Save Role</button>
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}