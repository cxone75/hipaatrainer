const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const rateLimit = require('../middleware/rateLimit');

const router = express.Router();

// Apply authentication to all routes
router.use(authMiddleware.verifyToken);

// Get all users with pagination and filtering
router.get('/', 
  rbacMiddleware.requirePermission('users:read'),
  rateLimit.apiLimiter,
  userController.getAllUsers
);

// Get user by ID
router.get('/:id', 
  rbacMiddleware.requirePermission('users:read'),
  rateLimit.apiLimiter,
  userController.getUserById
);

// Create new user
router.post('/', 
  rbacMiddleware.requirePermission('users:create'),
  rateLimit.strictLimiter,
  userController.createUser
);

// Update user
router.put('/:id', 
  rbacMiddleware.requirePermission('users:update'),
  rateLimit.apiLimiter,
  userController.updateUser
);

// Delete user
router.delete('/:id', 
  rbacMiddleware.requirePermission('users:delete'),
  rateLimit.strictLimiter,
  userController.deleteUser
);

// Bulk import users
router.post('/bulk/import', 
  rbacMiddleware.requirePermission('users:create'),
  rateLimit.strictLimiter,
  userController.bulkImport
);

// Get current user profile (self)
router.get('/me/profile', 
  rateLimit.apiLimiter,
  (req, res) => {
    req.params.id = req.user.id;
    userController.getUserById(req, res);
  }
);

// Update current user profile (self)
router.put('/me/profile', 
  rateLimit.apiLimiter,
  (req, res) => {
    req.params.id = req.user.id;
    // Restrict what users can update about themselves using literal property names
    const sanitizedBody = {};
    if (req.body.firstName !== undefined) sanitizedBody.firstName = req.body.firstName;
    if (req.body.lastName !== undefined) sanitizedBody.lastName = req.body.lastName;
    if (req.body.phone !== undefined) sanitizedBody.phone = req.body.phone;
    if (req.body.preferences !== undefined) sanitizedBody.preferences = req.body.preferences;
    
    req.body = sanitizedBody;
    userController.updateUser(req, res);
  }
);

// Auth verification endpoint (no additional auth middleware needed since verifyToken is already applied)
router.get('/verify', async (req, res) => {
  try {
    // If we reach here, the token is valid (verified by middleware)
    res.json({
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        organizationId: req.user.organizationId,
        roleId: req.user.roleId,
        status: req.user.status,
      }
    });
  } catch (error) {
    console.error('Auth verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;