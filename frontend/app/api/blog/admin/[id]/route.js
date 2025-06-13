
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Get authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Authorization token required' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Forward the request to the backend
    const backendUrl = process.env.NODE_ENV === 'production' 
      ? process.env.BACKEND_URL || 'http://0.0.0.0:3001'
      : 'http://0.0.0.0:3001';

    const response = await fetch(`${backendUrl}/api/blog/admin/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return Response.json(
        { error: `Backend error: ${response.status}`, details: errorData }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);

  } catch (error) {
    console.error('Blog post fetch error:', error);
    return Response.json(
      { error: 'Internal server error', details: error.message }, 
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    // Get authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Authorization token required' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const body = await request.json();
    
    // Forward the request to the backend
    const backendUrl = process.env.NODE_ENV === 'production' 
      ? process.env.BACKEND_URL || 'http://0.0.0.0:3001'
      : 'http://0.0.0.0:3001';

    const response = await fetch(`${backendUrl}/api/blog/admin/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return Response.json(
        { error: `Backend error: ${response.status}`, details: errorData }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);

  } catch (error) {
    console.error('Blog post update error:', error);
    return Response.json(
      { error: 'Internal server error', details: error.message }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Get authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Authorization token required' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Forward the request to the backend
    const backendUrl = process.env.NODE_ENV === 'production' 
      ? process.env.BACKEND_URL || 'http://0.0.0.0:3001'
      : 'http://0.0.0.0:3001';

    const response = await fetch(`${backendUrl}/api/blog/admin/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return Response.json(
        { error: `Backend error: ${response.status}`, details: errorData }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);

  } catch (error) {
    console.error('Blog post delete error:', error);
    return Response.json(
      { error: 'Internal server error', details: error.message }, 
      { status: 500 }
    );
  }
}
