
export async function GET(request) {
  try {
    // Forward authorization header
    const headers = {};
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
    }
    
    const response = await fetch('http://0.0.0.0:3001/api/blog', { headers });
    
    if (!response.ok) {
      return Response.json({ error: 'Failed to fetch blog posts' }, { status: response.status });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Admin blog API proxy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
