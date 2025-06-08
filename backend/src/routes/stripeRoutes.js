
const express = require('express');
const { supabase } = require('../services/supabase');
const Stripe = require('stripe');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Webhook endpoint to handle Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Received Stripe event:', event.type);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment succeeded for session:', session.id);
      
      try {
        // Get the customer email from the session
        const customerEmail = session.customer_email || session.customer_details?.email;
        
        if (!customerEmail) {
          console.error('No customer email found in session');
          break;
        }

        // Update the subscription_signups record status to 'active'
        const { data, error } = await supabase
          .from('subscription_signups')
          .update({ 
            status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('email', customerEmail)
          .select();

        if (error) {
          console.error('Error updating subscription status:', error);
        } else {
          console.log('Successfully updated subscription status to active for:', customerEmail);
          console.log('Updated record:', data);
        }

      } catch (error) {
        console.error('Error processing checkout.session.completed:', error);
      }
      break;

    case 'checkout.session.expired':
      const expiredSession = event.data.object;
      console.log('Payment session expired:', expiredSession.id);
      
      try {
        const customerEmail = expiredSession.customer_email || expiredSession.customer_details?.email;
        
        if (customerEmail) {
          // Update status to 'expired'
          await supabase
            .from('subscription_signups')
            .update({ 
              status: 'expired',
              updated_at: new Date().toISOString()
            })
            .eq('email', customerEmail);
          
          console.log('Updated subscription status to expired for:', customerEmail);
        }
      } catch (error) {
        console.error('Error processing checkout.session.expired:', error);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
});

module.exports = router;
