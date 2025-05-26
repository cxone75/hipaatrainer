const express = require('express');
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const rateLimit = require('../middleware/rateLimit');

const router = express.Router();

// Apply authentication to all routes
router.use(authMiddleware.verifyToken);

// Get all roles
router.get('/', 
  rbacMiddleware.requirePermission('roles:read'),
  rateLimit.apiLimiter,
  roleController.getAllRoles
);

// Get role by ID
router.get('/:id', 
  rbacMiddleware.requirePermission('roles:read'),
  rateLimit.apiLimiter,
  roleController.getRoleById
);

// Create new role
router.post('/', 
  rbacMiddleware.requirePermission('roles:create'),
  rateLimit.strictLimiter,
  roleController.createRole
);

// Update role
router.put('/:id', 
  rbacMiddleware.requirePermission('roles:update'),
  rateLimit.apiLimiter,
  roleController.updateRole
);

// Delete role
router.delete('/:id', 
  rbacMiddleware.requirePermission('roles:delete'),
  rateLimit.strictLimiter,
  roleController.deleteRole
);

// Get all available permissions
router.get('/system/permissions', 
  rbacMiddleware.requirePermission('roles:read'),
  rateLimit.apiLimiter,
  roleController.getPermissions
);

module.exports = router;