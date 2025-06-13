
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    let apiUrl = 'http://0.0.0.0:3001/api/blog';
    const params = new URLSearchParams();
    
    if (status) params.append('status', status);
    if (category) params.append('category', category);
    if (featured) params.append('featured', featured);
    
    if (params.toString()) {
      apiUrl += `?${params.toString()}`;
    }
    
    // Forward authorization header
    const headers = {};
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
    }
    
    const response = await fetch(apiUrl, { headers });
    
    if (!response.ok) {
      return Response.json({ error: 'Failed to fetch blog posts' }, { status: response.status });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Blog API proxy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return Response.json({ error: 'Blog post ID is required' }, { status: 400 });
    }
    
    // Forward authorization header
    const headers = {};
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
    }
    
    const response = await fetch(`http://0.0.0.0:3001/api/blog/${id}`, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      return Response.json({ error: 'Failed to delete blog post' }, { status: response.status });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Blog delete API proxy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return Response.json({ error: 'Blog post ID is required' }, { status: 400 });
    }
    
    const body = await request.json();
    
    // Forward authorization header
    const headers = {
      'Content-Type': 'application/json'
    };
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
    }
    
    const response = await fetch(`http://0.0.0.0:3001/api/blog/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      return Response.json({ error: 'Failed to update blog post' }, { status: response.status });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Blog update API proxy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
