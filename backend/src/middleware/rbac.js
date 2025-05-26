const roleModel = require('../models/role');

class RBACMiddleware {
  requirePermission(requiredPermission) {
    return async (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        // Get user permissions
        const permissions = await roleModel.getUserPermissions(req.user.id);
        
        // Check if user has the required permission
        const hasPermission = permissions.some(permission => {
          const permissionString = `${permission.resource}:${permission.action}`;
          return permissionString === requiredPermission;
        });

        if (!hasPermission) {
          return res.status(403).json({ 
            error: 'Insufficient permissions', 
            required: requiredPermission 
          });
        }

        next();
      } catch (error) {
        console.error('RBAC middleware error:', error);
        return res.status(500).json({ error: 'Permission check failed' });
      }
    };
  }

  requireAnyPermission(requiredPermissions) {
    return async (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        const permissions = await roleModel.getUserPermissions(req.user.id);
        
        const hasAnyPermission = requiredPermissions.some(required => {
          return permissions.some(permission => {
            const permissionString = `${permission.resource}:${permission.action}`;
            return permissionString === required;
          });
        });

        if (!hasAnyPermission) {
          return res.status(403).json({ 
            error: 'Insufficient permissions', 
            required: requiredPermissions 
          });
        }

        next();
      } catch (error) {
        console.error('RBAC middleware error:', error);
        return res.status(500).json({ error: 'Permission check failed' });
      }
    };
  }

  requireAllPermissions(requiredPermissions) {
    return async (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        const permissions = await roleModel.getUserPermissions(req.user.id);
        
        const hasAllPermissions = requiredPermissions.every(required => {
          return permissions.some(permission => {
            const permissionString = `${permission.resource}:${permission.action}`;
            return permissionString === required;
          });
        });

        if (!hasAllPermissions) {
          return res.status(403).json({ 
            error: 'Insufficient permissions', 
            required: requiredPermissions 
          });
        }

        next();
      } catch (error) {
        console.error('RBAC middleware error:', error);
        return res.status(500).json({ error: 'Permission check failed' });
      }
    };
  }

  requireRole(requiredRoles) {
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        const userRole = req.user.role?.name;
        const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
        
        if (!rolesArray.includes(userRole)) {
          return res.status(403).json({ 
            error: 'Insufficient role privileges', 
            required: requiredRoles,
            current: userRole 
          });
        }

        next();
      } catch (error) {
        console.error('Role check error:', error);
        return res.status(500).json({ error: 'Role check failed' });
      }
    };
  }

  requireSelfOrPermission(permission) {
    return async (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        const targetUserId = req.params.id || req.params.userId;
        
        // Allow if user is accessing their own resource
        if (req.user.id === targetUserId) {
          return next();
        }

        // Otherwise, check permission
        const permissions = await roleModel.getUserPermissions(req.user.id);
        const hasPermission = permissions.some(p => {
          const permissionString = `${p.resource}:${p.action}`;
          return permissionString === permission;
        });

        if (!hasPermission) {
          return res.status(403).json({ 
            error: 'Insufficient permissions', 
            required: permission 
          });
        }

        next();
      } catch (error) {
        console.error('Self or permission check error:', error);
        return res.status(500).json({ error: 'Permission check failed' });
      }
    };
  }

  requireOrganizationAccess(req, res, next) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const targetOrgId = req.params.orgId || req.query.organizationId;
      
      if (targetOrgId && req.user.organizationId !== targetOrgId) {
        return res.status(403).json({ error: 'Access denied to organization resource' });
      }

      next();
    } catch (error) {
      console.error('Organization access check error:', error);
      return res.status(500).json({ error: 'Organization access check failed' });
    }
  }
}

module.exports = new RBACMiddleware();