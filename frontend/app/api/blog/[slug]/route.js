
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const response = await fetch(`http://0.0.0.0:3001/api/blog/${slug}`);
    
    if (!response.ok) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Blog post API proxy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
