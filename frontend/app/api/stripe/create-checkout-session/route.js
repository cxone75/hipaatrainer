
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    console.log('Stripe checkout API called');
    
    const body = await request.json();
    console.log('Received request body:', body);
    
    const { priceId, planName, email } = body;

    console.log('Extracted values:', { priceId, planName, email });

    if (!priceId || !email) {
      console.error('Missing required fields:', { priceId, email });
      return NextResponse.json(
        { error: 'Price ID and email are required' },
        { status: 400 }
      );
    }

    // Verify Stripe key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY not found in environment');
      return NextResponse.json(
        { error: 'Stripe configuration error' },
        { status: 500 }
      );
    }

    console.log('Creating Stripe checkout session...');

    // Create Checkout Sessions from body params
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    console.log('Using origin:', origin);
    
    const sessionData = {
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: email,
      metadata: {
        planName: planName || 'Unknown Plan',
      },
    };

    console.log('Session data:', sessionData);

    const session = await stripe.checkout.sessions.create(sessionData);

    console.log('Stripe session created successfully:', session.id);

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error('Stripe error details:', {
      message: err.message,
      type: err.type,
      code: err.code,
      statusCode: err.statusCode,
      stack: err.stack
    });
    return NextResponse.json(
      { error: err.message || 'Failed to create checkout session' },
      { status: err.statusCode || 500 }
    );
  }
}
