'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogManagementPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication first
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('Admin blog page: No token found, redirecting to login');
      window.location.href = '/login';
      return;
    }

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.log('Admin blog page: No token available, redirecting to login');
        window.location.href = '/login';
        return;
      }

      const response = await fetch('/api/blog/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        console.log('Admin blog page: Authentication failed, clearing token and redirecting to login');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return;
      }

      if (response.ok) {
        const data = await response.json();
        const formattedPosts = data.map(post => ({
          ...post,
          date: new Date(post.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        }));
        setPosts(formattedPosts);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/blog/admin/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setPosts(posts.filter(post => post.id !== id));
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const post = posts.find(p => p.id === id);
      const newStatus = post.status === 'published' ? 'draft' : 'published';

      const response = await fetch(`/api/blog/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setPosts(posts.map(post => 
          post.id === id 
            ? { ...post, status: newStatus }
            : post
        ));
      } else {
        console.error('Failed to update post status');
      }
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
        <Link 
          href="/app/admin/blog/create"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Author</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {post.excerpt}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{post.author}</td>
                    <td className="py-3 px-4 text-gray-500">{post.date}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(post.id)}
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.status}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Link
                          href={`/app/admin/blog/${post.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}