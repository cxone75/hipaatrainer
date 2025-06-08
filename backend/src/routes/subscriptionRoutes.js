const express = require('express');
const { supabase } = require('../services/supabase');

const router = express.Router();

// Save subscription signup
router.post('/save', async (req, res) => {
  try {
    console.log('Raw request body:', req.body);
    console.log('Request body keys:', Object.keys(req.body));
    
    // Test Supabase connection
    console.log('Testing Supabase connection...');
    const { data: testData, error: testError } = await supabase
      .from('subscription_signups')
      .select('count', { count: 'exact', head: true });
    
    if (testError) {
      console.error('Supabase connection test failed:', testError);
      return res.status(500).json({ 
        error: 'Database connection failed',
        details: testError.message
      });
    }
    
    console.log('Supabase connection successful, record count:', testData);
    
    const { email, plan_name, plan_price, features } = req.body;

    console.log('Destructured values:', { email, plan_name, plan_price, features });
    console.log('plan_name type:', typeof plan_name);

    if (!email || !plan_name) {
      return res.status(400).json({ 
        error: 'Email and plan name are required',
        received: { email, plan_name, plan_price, features, fullBody: req.body }
      });
    }

    // Save to database using the supabase client
    console.log('Attempting to insert into database...');
    
    const insertData = {
      email,
      plan_name,
      plan_price: plan_price || null,
      features: features || null,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    console.log('Insert data:', insertData);
    
    const { data, error } = await supabase
      .from('subscription_signups')
      .insert(insertData)
      .select()
      .single();

    console.log('Database response:', { data, error });

    if (error) {
      console.error('Database error details:', error);
      if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({ error: 'Email already has a subscription signup' });
      }
      return res.status(500).json({ 
        error: 'Database error occurred',
        details: error.message,
        code: error.code
      });
    }

    res.status(201).json({ 
      message: 'Subscription saved successfully',
      data: { 
        email: data.email, 
        plan_name: data.plan_name,
        plan_price: data.plan_price,
        features: data.features
      }
    });

  } catch (error) {
    console.error('Subscription save error:', error);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

module.exports = router;