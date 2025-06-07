
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

// Add email to waitlist
router.post('/join', async (req, res) => {
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

    // Try to insert the email, ignore if duplicate
    const { data, error } = await supabase
      .from('waitlist')
      .upsert(
        { email: email.toLowerCase() },
        { 
          onConflict: 'email',
          ignoreDuplicates: true 
        }
      )
      .select()
      .single();

    if (error && error.code !== '23505') { // 23505 is unique violation error code
      console.error('Waitlist error:', error);
      return res.status(500).json({ error: 'Failed to join waitlist' });
    }

    res.json({ 
      message: 'Successfully joined waitlist',
      email: email.toLowerCase()
    });

  } catch (error) {
    console.error('Waitlist error:', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
});

// Get waitlist count (optional - for admin use)
router.get('/count', async (req, res) => {
  try {
    const supabase = createClient();
    
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return res.status(500).json({ error: 'Failed to get count' });
    }

    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get count' });
  }
});

module.exports = router;
