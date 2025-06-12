
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
    
    const response = await fetch(apiUrl);
    
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
