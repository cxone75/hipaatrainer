export default function UserProfilePage({ params }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <p>User ID: {params.id}</p>
    </div>
  );
}