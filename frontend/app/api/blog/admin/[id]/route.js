
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
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

export async function PUT(request, { params }) {
  try {
    const { id } = params;
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

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Forward authorization header
    const headers = {};
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
    }
    
    const response = await fetch(`http://0.0.0.0:3001/api/blog/${id}`, { headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend response error:', errorText);
      return Response.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Blog get API proxy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
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
      const errorText = await response.text();
      console.error('Backend response error:', errorText);
      return Response.json({ error: 'Failed to update blog post' }, { status: response.status });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Blog update API proxy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
