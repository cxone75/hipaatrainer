'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    category: 'Product Updates',
    author: '',
    excerpt: '',
    featured: false,
    status: 'draft'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const categories = ['Product Updates', 'HIPAA Compliance', 'Training', 'Risk Management', 'Policy Updates', 'Best Practices'];

  useEffect(() => {
    // Check authentication first
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('Edit page: No token found, redirecting to login');
      router.push('/login');
      return;
    }

    fetchBlogPost();
  }, [params.id, router]);

  const fetchBlogPost = async () => {
    console.log('=== EDIT PAGE DEBUG START ===');
    console.log('Edit page: Fetching blog post for ID:', params.id);
    try {
      const token = localStorage.getItem('authToken');
      console.log('Edit page: Token exists:', !!token);

      if (!token) {
        console.log('Edit page: No token available, redirecting to login');
        router.push('/login');
        return;
      }

      console.log('Edit page: Making request to:', `/api/blog/admin/${params.id}`);

      const response = await fetch(`/api/blog/admin/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Edit page: Response status:', response.status);
      console.log('Edit page: Response ok:', response.ok);

      // Handle authentication errors
      if (response.status === 401) {
        console.log('Edit page: Authentication failed, clearing token and redirecting to login');
        localStorage.removeItem('authToken');
        router.push('/login');
        return;
      }

      if (response.ok) {
        console.log('Edit page: Response is OK, parsing JSON...');
        const data = await response.json();
        console.log('Edit page: Successfully loaded blog post data:', data);
        console.log('Edit page: Blog post title:', data.title);
        console.log('Edit page: Blog post ID:', data.id);

        setFormData({
          title: data.title || '',
          subtitle: data.subtitle || '',
          content: data.content || '',
          category: data.category || 'Product Updates',
          author: data.author || '',
          excerpt: data.excerpt || '',
          featured: data.featured || false,
          status: data.status || 'draft'
        });
      } else {
        console.error('Edit page: Response not OK');
        const errorData = await response.json().catch(() => ({}));
        console.error('Edit page: Failed to load blog post. Status:', response.status);
        console.error('Edit page: Error response text:', JSON.stringify(errorData));
        setError(`Failed to load blog post. ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Edit page: Exception caught:', error);
      setError('Failed to load blog post. Please try again.');
    } finally {
      setLoading(false);
      console.log('=== EDIT PAGE DEBUG END ===');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/blog?id=${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/app/admin/blog');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(`Failed to update blog post. ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      setError('Failed to update blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/app/admin/blog')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Blog Management
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
        <p className="text-gray-600 mt-2">Make changes to your blog post below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Brief description of the article for listings..."
            />
          </div>

          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Featured Article</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Article Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              placeholder="Write your article content here. You can use HTML tags for formatting..."
            />
            <p className="text-sm text-gray-500 mt-2">
              You can use HTML tags for formatting (h2, h3, p, ul, ol, li, strong, em, blockquote, etc.)
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push('/app/admin/blog')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

// AuthGuard wrapper component
function AuthGuard({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/login');
        return;
      }

      // Verify token is valid by checking its structure
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;

        if (payload.exp && payload.exp < currentTime) {
          console.log('Token expired, redirecting to login');
          localStorage.removeItem('authToken');
          router.push('/login');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.log('Invalid token format, redirecting to login');
        localStorage.removeItem('authToken');
        router.push('/login');
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
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

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

export default function ProtectedEditBlogPostPage() {
  return (
    <AuthGuard>
      <EditBlogPostPage />
    </AuthGuard>
  );
}