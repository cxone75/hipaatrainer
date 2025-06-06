import BulkActions from '../components/BulkActions';

export default function BulkUsersPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bulk User Operations</h1>
      <BulkActions />
    </div>
  );
}