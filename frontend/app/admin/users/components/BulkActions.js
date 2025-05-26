export default function BulkActions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Bulk Operations</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Upload CSV File</label>
          <input type="file" accept=".csv" className="w-full p-2 border rounded" />
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Import Users</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Export Users</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Bulk Delete</button>
        </div>
      </div>
    </div>
  );
}