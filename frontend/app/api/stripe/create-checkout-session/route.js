
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { priceId, planName, email } = await request.json();

    // Create Checkout Sessions from body params
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
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
        planName: planName,
      },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
