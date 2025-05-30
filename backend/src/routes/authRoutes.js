
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient, createAdminClient } = require('../services/supabase');
const userModel = require('../models/user');
const orgModel = require('../models/organization');
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
  try {
    const { email, password, firstName, lastName, organizationName, jobTitle } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !organizationName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create Supabase user
    const supabase = createAdminClient();
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError) {
      console.error('Supabase auth error:', authError);
      return res.status(400).json({ error: authError.message });
    }

    // Create organization first
    const orgData = {
      name: organizationName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .insert(orgData)
      .select()
      .single();

    if (orgError) {
      // Clean up auth user if org creation fails
      await supabase.auth.admin.deleteUser(authUser.user.id);
      throw new Error(`Failed to create organization: ${orgError.message}`);
    }

    // Get or create default admin role for this organization
    let adminRole = await roleModel.getRoleByName('Admin', organization.id);
    if (!adminRole) {
      // Create default admin role for this organization
      adminRole = await roleModel.createRole({
        name: 'Admin',
        description: 'Full system administrator',
        organizationId: organization.id,
        createdBy: authUser.user.id
      });
    }
    const roleId = adminRole.id;

    // Create user record in database
    const userData = {
      id: authUser.user.id,
      email: email.toLowerCase(),
      firstName,
      lastName,
      jobTitle,
      organizationId: organization.id,
      roleId: roleId,
      status: 'active'
    };

    const user = await userModel.createUser(userData);

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
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt for:', req.body.email);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Authenticate with Supabase
    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.log('Supabase auth error:', authError);
      return res.status(401).json({ error: 'Invalid credentials' });
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
        status: user.status,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
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
      console.error('Password reset error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Password reset email sent' });

  } catch (error) {
    console.error('Forgot password error:', error);
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
      console.error('OAuth error:', error);
      return res.status(400).json({ error: error.message });
    }

    // Redirect to OAuth provider
    res.redirect(data.url);

  } catch (error) {
    console.error('OAuth error:', error);
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
      console.error('OAuth callback error:', error);
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
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'OAuth callback failed' });
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
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

module.exports = router;
