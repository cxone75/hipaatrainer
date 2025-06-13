
export async function GET(request, { params }) {
  console.log('Frontend API: GET request received for blog ID:', params.id);
  
  try {
    const { id } = params;
    
    // Forward authorization header
    const headers = {};
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
      console.log('Frontend API: Authorization header found');
    } else {
      console.log('Frontend API: No authorization header found');
    }
    
    const backendUrl = `http://0.0.0.0:3001/api/blog/${id}`;
    console.log('Frontend API: Making request to backend:', backendUrl);
    
    const response = await fetch(backendUrl, { headers });
    
    console.log('Frontend API: Backend response status:', response.status);
    console.log('Frontend API: Backend response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Frontend API: Backend response error:', errorText);
      return Response.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    const data = await response.json();
    console.log('Frontend API: Successfully retrieved blog post:', data.id, data.title);
    return Response.json(data);
  } catch (error) {
    console.error('Frontend API: GET error:', error);
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
