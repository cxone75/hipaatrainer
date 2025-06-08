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
    console.log('Newsletter subscription request received:', req.body);

    const { email } = req.body;

    if (!email) {
      console.log('No email provided');
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const supabase = createClient();

    console.log('Attempting to subscribe email:', email);

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing subscriber:', checkError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (existing) {
      console.log('Email already subscribed:', email);
      return res.status(200).json({ message: 'Email already subscribed' });
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email: email.toLowerCase(), subscribed_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) {
      console.error('Newsletter subscription error:', error);
      return res.status(500).json({ error: 'Failed to subscribe to newsletter' });
    }

    console.log('Successfully subscribed:', email);
    res.status(201).json({ 
      message: 'Successfully subscribed to newsletter',
      data 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;