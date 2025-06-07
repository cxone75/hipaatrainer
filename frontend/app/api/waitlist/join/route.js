
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Proxy the request to the backend
    const backendResponse = await fetch('http://0.0.0.0:3001/api/waitlist/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    // Return the response from the backend
    return new Response(JSON.stringify(data), {
      status: backendResponse.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to connect to backend' }), 
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
