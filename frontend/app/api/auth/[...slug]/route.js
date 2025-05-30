
const BACKEND_URL = process.env.BACKEND_URL || 'http://0.0.0.0:3001';

export async function GET(request, { params }) {
  const { slug } = params;
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  const backendUrl = `${BACKEND_URL}/api/auth/${slug.join('/')}${searchParams ? `?${searchParams}` : ''}`;
  
  console.log('Proxying GET request to:', backendUrl);
  
  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers.entries()),
      },
    });

    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request, { params }) {
  const { slug } = params;
  let body;
  
  try {
    // Parse JSON body properly
    const requestBody = await request.json();
    body = JSON.stringify(requestBody);
    console.log('Parsed request body:', requestBody);
  } catch (error) {
    console.error('Error parsing request body:', error);
    body = '{}';
  }
  
  const backendUrl = `${BACKEND_URL}/api/auth/${slug.join('/')}`;
  
  console.log('Proxying POST request to:', backendUrl);
  console.log('Request body to send:', body);
  
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await response.text();
    console.log('Backend response status:', response.status);
    console.log('Backend response:', data);
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request, { params }) {
  const { slug } = params;
  let body;
  
  try {
    // Parse JSON body properly
    const requestBody = await request.json();
    body = JSON.stringify(requestBody);
  } catch (error) {
    console.error('Error parsing PUT request body:', error);
    body = '{}';
  }
  
  const backendUrl = `${BACKEND_URL}/api/auth/${slug.join('/')}`;
  
  console.log('Proxying PUT request to:', backendUrl);
  
  try {
    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request, { params }) {
  const { slug } = params;
  const backendUrl = `${BACKEND_URL}/api/auth/${slug.join('/')}`;
  
  console.log('Proxying DELETE request to:', backendUrl);
  
  try {
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers.entries()),
      },
    });

    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
