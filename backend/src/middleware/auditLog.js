const auditService = require('../services/auditService');

class AuditLogMiddleware {
  logRequest(options = {}) {
    const {
      action,
      resource,
      includeBody = false,
      includeQuery = false,
      skipSuccessResponse = false,
    } = options;

    return async (req, res, next) => {
      const originalSend = res.send;
      let responseBody;
      let statusCode;

      // Capture response
      res.send = function(data) {
        responseBody = data;
        statusCode = res.statusCode;
        return originalSend.call(this, data);
      };

      // Continue with request
      res.on('finish', async () => {
        try {
          // Skip logging if configured and response was successful
          if (skipSuccessResponse && statusCode >= 200 && statusCode < 300) {
            return;
          }

          const auditData = {
            userId: req.user?.id,
            action: action || this.extractActionFromRequest(req),
            resource: resource || this.extractResourceFromRequest(req),
            resourceId: req.params.id || req.params.userId || req.params.roleId,
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent'),
            method: req.method,
            url: req.url,
            statusCode,
            organizationId: req.user?.organizationId,
            details: {
              ...(includeQuery && req.query && Object.keys(req.query).length > 0 && { query: req.query }),
              ...(includeBody && req.body && Object.keys(req.body).length > 0 && { requestBody: this.sanitizeBody(req.body) }),
              ...(statusCode >= 400 && responseBody && { error: responseBody }),
            },
          };

          try {
            // Only log if we have a valid database connection
            if (auditData.userId || auditData.organizationId) {
              await auditService.log(auditData);
            }
          } catch (error) {
            // Don't fail the request if audit logging fails
          }
        } catch (error) {
          // Don't fail the request if audit logging fails
        }
      });

      next();
    };
  }

  extractActionFromRequest(req) {
    const method = req.method.toUpperCase();
    const path = req.route?.path || req.url;

    // Map HTTP methods to actions
    const actionMap = {
      GET: 'VIEW',
      POST: 'CREATE',
      PUT: 'UPDATE',
      PATCH: 'UPDATE',
      DELETE: 'DELETE',
    };

    let action = actionMap[method] || 'UNKNOWN';

    // Add more specific actions based on path
    if (path.includes('/login')) action = 'LOGIN';
    if (path.includes('/logout')) action = 'LOGOUT';
    if (path.includes('/bulk')) action = 'BULK_OPERATION';
    if (path.includes('/export')) action = 'EXPORT';
    if (path.includes('/import')) action = 'IMPORT';
    if (path.includes('/reports')) action = 'GENERATE_REPORT';

    return action;
  }

  extractResourceFromRequest(req) {
    const path = req.route?.path || req.url;

    // Extract resource from path
    if (path.includes('/users')) return 'users';
    if (path.includes('/roles')) return 'roles';
    if (path.includes('/organizations')) return 'organizations';
    if (path.includes('/settings')) return 'settings';
    if (path.includes('/reports')) return 'reports';
    if (path.includes('/audit')) return 'audit';

    return 'unknown';
  }

  sanitizeBody(body) {
    const sensitiveFields = [
      'password',
      'passwordHash',
      'password_hash',
      'token',
      'accessToken',
      'refreshToken',
      'secret',
      'key',
      'apiKey',
      'api_key',
    ];

    const sanitized = { ...body };

    const sanitizeObject = (obj) => {
      for (const key in obj) {
        if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
          obj[key] = '[REDACTED]';
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        }
      }
    };

    sanitizeObject(sanitized);
    return sanitized;
  }

  // Specific audit middleware for different actions
  auditLogin() {
    return this.logRequest({
      action: 'LOGIN_ATTEMPT',
      resource: 'authentication',
      includeBody: true,
    });
  }

  auditLogout() {
    return this.logRequest({
      action: 'LOGOUT',
      resource: 'authentication',
    });
  }

  auditUserCreation() {
    return this.logRequest({
      action: 'CREATE_USER',
      resource: 'users',
      includeBody: true,
    });
  }

  auditUserUpdate() {
    return this.logRequest({
      action: 'UPDATE_USER',
      resource: 'users',
      includeBody: true,
    });
  }

  auditUserDeletion() {
    return this.logRequest({
      action: 'DELETE_USER',
      resource: 'users',
    });
  }

  auditRoleChanges() {
    return this.logRequest({
      action: 'MODIFY_ROLE',
      resource: 'roles',
      includeBody: true,
    });
  }

  auditSettingsChange() {
    return this.logRequest({
      action: 'UPDATE_SETTINGS',
      resource: 'settings',
      includeBody: true,
    });
  }

  auditDataExport() {
    return this.logRequest({
      action: 'EXPORT_DATA',
      resource: 'data',
      includeQuery: true,
    });
  }
}

module.exports = new AuditLogMiddleware();