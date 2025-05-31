const { createClient } = require('./supabase');

class AuditService {
  constructor() {
    this.supabase = createClient();
  }

  async log(auditData) {
    try {
      const {
        userId,
        action,
        resource,
        resourceId,
        ipAddress,
        userAgent,
        method,
        url,
        statusCode,
        organizationId,
        details = {},
      } = auditData;

      const auditLogEntry = {
        user_id: userId,
        organization_id: organizationId,
        action,
        resource,
        resource_id: resourceId,
        ip_address: ipAddress,
        user_agent: userAgent,
        method,
        url,
        status_code: statusCode,
        details,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabase
        .from('audit_logs')
        .insert(auditLogEntry)
        .select('*')
        .single();

      if (error) {
        throw new Error(`Audit logging failed: ${error.message || 'Database connection error'}`);
      }

      return data;
    } catch (error) {
      // Don't throw error to prevent audit logging from breaking the main request
      // Instead, log the error and continue
      this.logAuditError(error, auditData);
      return null;
    }
  }

  async getAuditLogs({ page = 1, limit = 50, filters = {} }) {
    try {
      let query = this.supabase
        .from('audit_logs')
        .select(`
          *,
          user:users(
            id, email, first_name, last_name
          )
        `);

      // Apply filters
      if (filters.organizationId) {
        query = query.eq('organization_id', filters.organizationId);
      }
      if (filters.userId) {
        query = query.eq('user_id', filters.userId);
      }
      if (filters.action) {
        query = query.eq('action', filters.action);
      }
      if (filters.resource) {
        query = query.eq('resource', filters.resource);
      }
      if (filters.startDate) {
        query = query.gte('created_at', filters.startDate.toISOString());
      }
      if (filters.endDate) {
        query = query.lte('created_at', filters.endDate.toISOString());
      }
      if (filters.ipAddress) {
        query = query.eq('ip_address', filters.ipAddress);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to).order('created_at', { ascending: false });

      const { data: auditLogs, error, count } = await query;

      if (error) {
        throw new Error(`Failed to fetch audit logs: ${error.message}`);
      }

      return {
        auditLogs: auditLogs || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async getAuditLogById(id) {
    try {
      const { data: auditLog, error } = await this.supabase
        .from('audit_logs')
        .select(`
          *,
          user:users(
            id, email, first_name, last_name
          )
        `)
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(`Failed to fetch audit log: ${error.message}`);
      }

      return auditLog;
    } catch (error) {
      throw error;
    }
  }

  async getUserActivity(userId, { page = 1, limit = 50, startDate, endDate } = {}) {
    try {
      let query = this.supabase
        .from('audit_logs')
        .select('*')
        .eq('user_id', userId);

      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      if (endDate) {
        query = query.lte('created_at', endDate.toISOString());
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to).order('created_at', { ascending: false });

      const { data: activities, error, count } = await query;

      if (error) {
        throw new Error(`Failed to fetch user activity: ${error.message}`);
      }

      return {
        activities: activities || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async getResourceActivity(resource, resourceId, { page = 1, limit = 50 } = {}) {
    try {
      let query = this.supabase
        .from('audit_logs')
        .select(`
          *,
          user:users(
            id, email, first_name, last_name
          )
        `)
        .eq('resource', resource);

      if (resourceId) {
        query = query.eq('resource_id', resourceId);
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to).order('created_at', { ascending: false });

      const { data: activities, error, count } = await query;

      if (error) {
        throw new Error(`Failed to fetch resource activity: ${error.message}`);
      }

      return {
        activities: activities || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async getAuditStatistics(organizationId, { startDate, endDate } = {}) {
    try {
      let query = this.supabase
        .from('audit_logs')
        .select('action, resource, created_at')
        .eq('organization_id', organizationId);

      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      if (endDate) {
        query = query.lte('created_at', endDate.toISOString());
      }

      const { data: logs, error } = await query;

      if (error) {
        throw new Error(`Failed to fetch audit statistics: ${error.message}`);
      }

      // Process statistics
      const stats = {
        totalEvents: logs.length,
        actionBreakdown: {},
        resourceBreakdown: {},
        dailyActivity: {},
        topActions: [],
        topResources: [],
      };

      logs.forEach(log => {
        // Action breakdown
        stats.actionBreakdown[log.action] = (stats.actionBreakdown[log.action] || 0) + 1;
        
        // Resource breakdown
        stats.resourceBreakdown[log.resource] = (stats.resourceBreakdown[log.resource] || 0) + 1;
        
        // Daily activity
        const date = new Date(log.created_at).toISOString().split('T')[0];
        stats.dailyActivity[date] = (stats.dailyActivity[date] || 0) + 1;
      });

      // Top actions and resources
      stats.topActions = Object.entries(stats.actionBreakdown)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([action, count]) => ({ action, count }));

      stats.topResources = Object.entries(stats.resourceBreakdown)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([resource, count]) => ({ resource, count }));

      return stats;
    } catch (error) {
      throw error;
    }
  }

  async exportAuditLogs(organizationId, { startDate, endDate, format = 'json' } = {}) {
    try {
      let query = this.supabase
        .from('audit_logs')
        .select(`
          *,
          user:users(
            id, email, first_name, last_name
          )
        `)
        .eq('organization_id', organizationId);

      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      if (endDate) {
        query = query.lte('created_at', endDate.toISOString());
      }

      query = query.order('created_at', { ascending: false });

      const { data: logs, error } = await query;

      if (error) {
        throw new Error(`Failed to export audit logs: ${error.message}`);
      }

      // Format the data based on requested format
      switch (format) {
        case 'csv':
          return this.convertToCSV(logs);
        case 'json':
        default:
          return logs;
      }
    } catch (error) {
      throw error;
    }
  }

  convertToCSV(data) {
    if (!data || data.length === 0) {
      return '';
    }

    const headers = [
      'timestamp',
      'user_email',
      'user_name',
      'action',
      'resource',
      'resource_id',
      'ip_address',
      'user_agent',
      'status_code',
      'details'
    ];

    const csvRows = [
      headers.join(','),
      ...data.map(row => {
        const values = [
          row.created_at,
          row.user?.email || '',
          `"${row.user?.first_name || ''} ${row.user?.last_name || ''}"`.trim(),
          row.action,
          row.resource,
          row.resource_id || '',
          row.ip_address || '',
          `"${row.user_agent || ''}"`,
          row.status_code || '',
          `"${JSON.stringify(row.details || {})}"`
        ];
        return values.join(',');
      })
    ];

    return csvRows.join('\n');
  }

  async cleanupOldLogs(retentionDays = 90) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      const { data, error } = await this.supabase
        .from('audit_logs')
        .delete()
        .lt('created_at', cutoffDate.toISOString());

      if (error) {
        throw new Error(`Failed to cleanup old audit logs: ${error.message}`);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async logAuditError(error, originalAuditData) {
    try {
      // Log audit errors to a separate table or file for debugging
      // Could save error details to a separate error log table here
      
      // Optionally save to a separate error log table
      // This would require creating an audit_errors table
    } catch (logError) {
      // Silently handle logging errors
    }
  }

  // Convenience methods for common audit actions
  async logUserLogin(userId, ipAddress, userAgent, success = true, failureReason = null) {
    return this.log({
      userId,
      action: success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILURE',
      resource: 'authentication',
      ipAddress,
      userAgent,
      details: {
        success,
        ...(failureReason && { failureReason }),
      },
    });
  }

  async logUserLogout(userId, ipAddress, userAgent) {
    return this.log({
      userId,
      action: 'LOGOUT',
      resource: 'authentication',
      ipAddress,
      userAgent,
    });
  }

  async logPasswordChange(userId, ipAddress, userAgent, changedBy = null) {
    return this.log({
      userId,
      action: 'PASSWORD_CHANGE',
      resource: 'authentication',
      ipAddress,
      userAgent,
      details: {
        changedBy: changedBy || userId,
        selfChange: !changedBy || changedBy === userId,
      },
    });
  }

  async logPermissionChange(userId, targetUserId, oldPermissions, newPermissions, ipAddress, userAgent) {
    return this.log({
      userId,
      action: 'PERMISSION_CHANGE',
      resource: 'users',
      resourceId: targetUserId,
      ipAddress,
      userAgent,
      details: {
        oldPermissions,
        newPermissions,
        changes: this.diffPermissions(oldPermissions, newPermissions),
      },
    });
  }

  diffPermissions(oldPermissions, newPermissions) {
    return {
      added: newPermissions.filter(p => !oldPermissions.includes(p)),
      removed: oldPermissions.filter(p => !newPermissions.includes(p)),
    };
  }
}

module.exports = new AuditService();