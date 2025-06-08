const express = require('express');
const { supabase } = require('../services/supabase');

const router = express.Router();

// Save subscription signup
router.post('/save', async (req, res) => {
  try {
    console.log('Raw request body:', req.body);
    console.log('Request body keys:', Object.keys(req.body));
    
    const { email, plan_name } = req.body;

    console.log('Destructured values:', { email, plan_name });
    console.log('plan_name type:', typeof plan_name);

    if (!email || !plan_name) {
      return res.status(400).json({ 
        error: 'Email and plan name are required',
        received: { email, plan_name, fullBody: req.body }
      });
    }

    // Save to database using the supabase client
    const { data, error } = await supabase
      .from('subscription_signups')
      .insert({
        email,
        plan_name,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({ error: 'Email already has a subscription signup' });
      }
      throw error;
    }

    res.status(201).json({ 
      message: 'Subscription saved successfully',
      data: { email: data.email, plan_name: data.plan_name }
    });

  } catch (error) {
    console.error('Subscription save error:', error);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

module.exports = router;