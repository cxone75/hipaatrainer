export default function ProfileForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" className="w-full p-2 border rounded" defaultValue="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full p-2 border rounded" defaultValue="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input type="tel" className="w-full p-2 border rounded" defaultValue="+1 (555) 123-4567" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select className="w-full p-2 border rounded">
            <option>IT Department</option>
            <option>HR Department</option>
            <option>Finance Department</option>
            <option>Operations</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}