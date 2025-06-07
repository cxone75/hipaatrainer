
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

// Join waitlist
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

    // Check if email already exists
    const { data: existingEmail, error: checkError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existingEmail) {
      return res.status(409).json({ error: 'Email already on waitlist' });
    }

    // Insert new email (ignore if check error was just "not found")
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email: email.toLowerCase() }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({ error: 'Email already on waitlist' });
      }
      throw error;
    }

    res.status(201).json({ 
      message: 'Successfully joined waitlist',
      data: { email: data.email }
    });

  } catch (error) {
    console.error('Waitlist join error:', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
});

// Get waitlist count (admin only)
router.get('/count', async (req, res) => {
  try {
    const supabase = createClient();

    const { count, error } = await supabase
      .from('waitlist')
      .select('id', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    res.json({ count: count || 0 });

  } catch (error) {
    console.error('Waitlist count error:', error);
    res.status(500).json({ error: 'Failed to get waitlist count' });
  }
});

module.exports = router;
