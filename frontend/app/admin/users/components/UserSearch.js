export default function UserSearch() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Search users..."
          className="flex-1 p-2 border rounded"
        />
        <select className="p-2 border rounded">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Manager</option>
          <option>User</option>
        </select>
        <select className="p-2 border rounded">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
    </div>
  );
}