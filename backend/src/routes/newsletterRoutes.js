
const express = require('express');
const { createClient } = require('../services/supabase');

const router = express.Router();

// Handle preflight requests
router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', true);
  res.sendStatus(200);
});

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const supabase = createClient();

    // Check if email already exists in newsletter subscriptions
    const { data: existingEmail, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existingEmail) {
      return res.status(409).json({ error: 'Email already subscribed to newsletter' });
    }

    // Insert new email subscription
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email: email.toLowerCase() }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({ error: 'Email already subscribed to newsletter' });
      }
      throw error;
    }

    res.status(201).json({ 
      message: 'Successfully subscribed to newsletter',
      data: { email: data.email }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
});

module.exports = router;
