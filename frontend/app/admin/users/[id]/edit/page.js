export default function EditUserPage({ params }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>
      <p>Editing User ID: {params.id}</p>
    </div>
  );
}