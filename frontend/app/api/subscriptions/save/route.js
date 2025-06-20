
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('Frontend API received body:', body);
    console.log('Body keys:', Object.keys(body));
    console.log('plan_name value:', body.plan_name);
    
    // Forward the request to the backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    
    console.log('Forwarding to backend URL:', `${backendUrl}/api/subscriptions/save`);
    console.log('Forwarding body:', JSON.stringify(body));
    
    const response = await fetch(`${backendUrl}/api/subscriptions/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Subscription save API error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
