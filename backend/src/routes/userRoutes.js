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
    // Restrict what users can update about themselves
    const allowedFields = ['firstName', 'lastName', 'phone', 'preferences'];
    req.body = Object.keys(req.body)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});
    userController.updateUser(req, res);
  }
);

module.exports = router;