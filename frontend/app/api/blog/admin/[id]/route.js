
export async function GET(request, { params }) {
  console.log('=== FRONTEND API DEBUG ===');
  console.log('Frontend API: GET request received for blog ID:', params.id);
  console.log('Frontend API: Request URL:', request.url);
  
  try {
    const { id } = params;
    console.log('Frontend API: Extracted ID from params:', id);
    
    // Forward authorization header
    const headers = {};
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
      console.log('Frontend API: Authorization header found:', authHeader.substring(0, 20) + '...');
    } else {
      console.log('Frontend API: No authorization header found');
    }
    
    const backendUrl = `http://0.0.0.0:3001/api/blog/${id}`;
    console.log('Frontend API: Making request to backend:', backendUrl);
    console.log('Frontend API: Request headers:', headers);
    
    const response = await fetch(backendUrl, { headers });
    
    console.log('Frontend API: Backend response status:', response.status);
    console.log('Frontend API: Backend response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Frontend API: Backend response error status:', response.status);
      console.error('Frontend API: Backend response error text:', errorText);
      console.log('=== END FRONTEND API DEBUG (ERROR) ===');
      return Response.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    const data = await response.json();
    console.log('Frontend API: Successfully retrieved blog post:', data.id, data.title);
    console.log('Frontend API: Full blog post data:', JSON.stringify(data, null, 2));
    console.log('=== END FRONTEND API DEBUG (SUCCESS) ===');
    return Response.json(data);
  } catch (error) {
    console.error('Frontend API: GET error:', error);
    console.error('Frontend API: Error stack:', error.stack);
    console.log('=== END FRONTEND API DEBUG (EXCEPTION) ===');
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  console.log('Frontend API: PUT request received for blog ID:', params.id);
  
  try {
    const { id } = params;
    const body = await request.json();
    
    console.log('Frontend API: PUT request body keys:', Object.keys(body));
    
    // Forward authorization header
    const headers = {
      'Content-Type': 'application/json'
    };
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
      console.log('Frontend API: Authorization header found for PUT');
    } else {
      console.log('Frontend API: No authorization header found for PUT');
    }
    
    const backendUrl = `http://0.0.0.0:3001/api/blog/${id}`;
    console.log('Frontend API: Making PUT request to backend:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
    
    console.log('Frontend API: Backend PUT response status:', response.status);
    console.log('Frontend API: Backend PUT response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Frontend API: Backend PUT response error:', errorText);
      return Response.json({ error: 'Failed to update blog post' }, { status: response.status });
    }
    
    const data = await response.json();
    console.log('Frontend API: Successfully updated blog post:', data.id);
    return Response.json(data);
  } catch (error) {
    console.error('Frontend API: PUT error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  console.log('Frontend API: DELETE request received for blog ID:', params.id);
  
  try {
    const { id } = params;
    
    // Forward authorization header
    const headers = {};
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
      console.log('Frontend API: Authorization header found for DELETE');
    } else {
      console.log('Frontend API: No authorization header found for DELETE');
    }
    
    const backendUrl = `http://0.0.0.0:3001/api/blog/${id}`;
    console.log('Frontend API: Making DELETE request to backend:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers
    });
    
    console.log('Frontend API: Backend DELETE response status:', response.status);
    console.log('Frontend API: Backend DELETE response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Frontend API: Backend DELETE response error:', errorText);
      return Response.json({ error: 'Failed to delete blog post' }, { status: response.status });
    }
    
    const data = await response.json();
    console.log('Frontend API: Successfully deleted blog post:', id);
    return Response.json(data);
  } catch (error) {
    console.error('Frontend API: DELETE error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
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
