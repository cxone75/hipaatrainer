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
    console.error('Blog admin API proxy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Forward authorization header
    const headers = {
      'Content-Type': 'application/json'
    };
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
    }

    const response = await fetch('http://0.0.0.0:3001/api/blog', {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return Response.json({ error: 'Failed to create blog post' }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Blog create API proxy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}