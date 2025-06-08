
const express = require('express');
const router = express.Router();
const { supabase } = require('../services/supabase');

// Save subscription to database
router.post('/save', async (req, res) => {
  try {
    const { email, planName, planPrice, features } = req.body;

    if (!email || !planName) {
      return res.status(400).json({ error: 'Email and plan name are required' });
    }

    // Insert subscription record
    const { data, error } = await supabase
      .from('subscription_signups')
      .insert({
        email,
        plan_name: planName,
        plan_price: planPrice,
        features: features || {},
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
      data: { email: data.email, planName: data.plan_name }
    });

  } catch (error) {
    console.error('Subscription save error:', error);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

module.exports = router;
