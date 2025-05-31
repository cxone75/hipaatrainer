const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient, createAdminClient } = require('../services/supabase');
const userModel = require('../models/user');
const roleModel = require('../models/role');

const router = express.Router();

// Handle preflight requests
router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', true);
  res.sendStatus(200);
});

// User registration
router.post('/register', async (req, res) => {
  const supabase = createAdminClient();

  try {
    const { email, password, firstName, lastName, organizationName, jobTitle } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !organizationName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists in auth
    const { data: authUsers, error: authCheckError } = await supabase.auth.admin.listUsers();
    if (!authCheckError) {
      const existingAuthUser = authUsers.users.find(u => u.email === email.toLowerCase());
      if (existingAuthUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }
    }

    // Create Supabase user with metadata - triggers will handle the rest
    const { data: authUserData, error: authError } = await supabase.auth.admin.createUser({
      email: email.toLowerCase(),
      password,
      email_confirm: true,
      user_metadata: {
        firstName,
        lastName,
        organizationName,
        jobTitle: jobTitle || null
      }
    });

    if (authError) {
      if (authError.message.includes('already been registered')) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }
      return res.status(400).json({ error: authError.message });
    }

    // Wait longer for triggers to complete
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get the created user record (should be created by trigger)
    let user = null;
    let retryCount = 0;
    const maxRetries = 8; // Increased retries
    
    while (!user && retryCount < maxRetries) {
      try {
        user = await userModel.getUserById(authUserData.user.id);
        if (user) {
          break;
        }
        
        // Wait before retrying (increasing delay)
        const delay = 500 + (retryCount * 200);
        await new Promise(resolve => setTimeout(resolve, delay));
        retryCount++;
      } catch (error) {
        retryCount++;
        if (retryCount < maxRetries) {
          const delay = 500 + (retryCount * 200);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    if (!user) {
      // Try direct query to see if user exists anywhere
      const { data: directUser, error: directError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUserData.user.id)
        .single();
      
      // Cleanup auth user and return error
      await supabase.auth.admin.deleteUser(authUserData.user.id);
      throw new Error('Failed to create user records. The organization setup may have failed. Please try again.');
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        organizationId: user.organization_id,
        roleId: user.role_id
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Success
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        organizationId: user.organization_id,
        roleId: user.role_id,
        status: user.status
      }
    });

  } catch (error) {
    // Return appropriate error message
    if (error.message.includes('duplicate key value violates unique constraint') || 
        error.message.includes('already exists') ||
        error.message.includes('already been registered')) {
      res.status(400).json({ error: 'User already exists with this email' });
    } else {
      res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Authenticate with Supabase
    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      if (authError.message.includes('Invalid login credentials')) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Get user data from database
    const user = await userModel.getUserById(authData.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ error: 'Account is not active' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        organizationId: user.organization_id,
        roleId: user.role_id
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.header('Access-Control-Allow-Credentials', 'true');
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        organizationId: user.organization_id,
        roleId: user.role_id,
        status: user.status
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Use Supabase to send password reset email
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Password reset email sent' });

  } catch (error) {
    res.status(500).json({ error: 'Failed to send password reset email' });
  }
});

// OAuth login (Google, Microsoft, etc.)
router.get('/oauth/:provider', async (req, res) => {
  try {
    const { provider } = req.params;

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${process.env.FRONTEND_URL}/auth/callback`
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Redirect to OAuth provider
    res.redirect(data.url);

  } catch (error) {
    res.status(500).json({ error: 'OAuth authentication failed' });
  }
});

// OAuth callback handler
router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code required' });
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if user exists in our database
    let user = await userModel.getUserById(data.user.id);

    if (!user) {
      // Create new user record for OAuth users
      // This would need additional logic to handle organization creation
      // For now, redirect to onboarding
      return res.redirect(`${process.env.FRONTEND_URL}/onboarding?oauth=true&userId=${data.user.id}`);
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        organizationId: user.organization_id,
        roleId: user.role_id
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to app with token
    res.redirect(`${process.env.FRONTEND_URL}/app?token=${token}`);

  } catch (error) {
    res.status(500).json({ error: 'OAuth callback failed' });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user data from database
    const user = await userModel.getUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ error: 'Account is not active' });
    }

    res.json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        organizationId: user.organization_id,
        roleId: user.role_id,
        status: user.status
      }
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(500).json({ error: 'Token verification failed' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      // In a real app, you'd add the token to a blacklist
      // For now, just tell the client to remove it
    }

    res.json({ message: 'Logout successful' });

  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
});

module.exports = router;