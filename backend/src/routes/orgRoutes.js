const express = require('express');
const orgController = require('../controllers/orgController');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const rateLimit = require('../middleware/rateLimit');

const router = express.Router();

// Apply authentication to all routes
router.use(authMiddleware.verifyToken);

// Get organization details
router.get('/', 
  rateLimit.apiLimiter,
  orgController.getOrganization
);

// Update organization
router.put('/', 
  rbacMiddleware.requirePermission('organizations:update'),
  rateLimit.apiLimiter,
  orgController.updateOrganization
);

// Get organization settings
router.get('/settings', 
  rbacMiddleware.requirePermission('system:settings'),
  rateLimit.apiLimiter,
  orgController.getSettings
);

// Update organization settings
router.put('/settings', 
  rbacMiddleware.requirePermission('system:settings'),
  rateLimit.strictLimiter,
  orgController.updateSettings
);

// Get subscription information
router.get('/subscription', 
  rbacMiddleware.requirePermission('organizations:read'),
  rateLimit.apiLimiter,
  orgController.getSubscription
);

// Generate compliance report
router.post('/reports/compliance', 
  rbacMiddleware.requirePermission('reports:export'),
  rateLimit.strictLimiter,
  orgController.generateComplianceReport
);

// Get audit logs
router.get('/audit-logs', 
  rbacMiddleware.requirePermission('system:audit'),
  rateLimit.apiLimiter,
  orgController.getAuditLogs
);

module.exports = router;