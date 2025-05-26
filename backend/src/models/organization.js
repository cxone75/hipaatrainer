const { createClient } = require('../services/supabase');

class OrganizationModel {
  constructor() {
    this.supabase = createClient();
  }

  async getOrganizationById(id) {
    const { data: organization, error } = await this.supabase
      .from('organizations')
      .select(`
        *,
        subscription:subscriptions(*)
      `)
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch organization: ${error.message}`);
    }

    return organization;
  }

  async updateOrganization(id, updateData) {
    const {
      name,
      description,
      logo,
      ...rest
    } = updateData;

    const orgToUpdate = {
      ...(name && { name }),
      ...(description && { description }),
      ...(logo && { logo }),
      updated_at: new Date().toISOString(),
      ...rest,
    };

    const { data: organization, error } = await this.supabase
      .from('organizations')
      .update(orgToUpdate)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error(`Failed to update organization: ${error.message}`);
    }

    return organization;
  }

  async getSettings(organizationId) {
    const { data: organization, error } = await this.supabase
      .from('organizations')
      .select('settings')
      .eq('id', organizationId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch organization settings: ${error.message}`);
    }

    return organization?.settings || {};
  }

  async updateSettings(organizationId, settingsData) {
    const { data: organization, error } = await this.supabase
      .from('organizations')
      .update({
        settings: settingsData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', organizationId)
      .select('settings')
      .single();

    if (error) {
      throw new Error(`Failed to update organization settings: ${error.message}`);
    }

    return organization.settings;
  }

  async getSubscription(organizationId) {
    const { data: subscription, error } = await this.supabase
      .from('subscriptions')
      .select('*')
      .eq('organization_id', organizationId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch subscription: ${error.message}`);
    }

    return subscription;
  }

  async generateComplianceReport(reportData) {
    const {
      organizationId,
      type,
      dateRange,
      generatedBy,
    } = reportData;

    let data = {};

    switch (type) {
      case 'user_access':
        data = await this.getUserAccessReport(organizationId, dateRange);
        break;
      case 'login_activity':
        data = await this.getLoginActivityReport(organizationId, dateRange);
        break;
      case 'permission_changes':
        data = await this.getPermissionChangesReport(organizationId, dateRange);
        break;
      case 'data_export':
        data = await this.getDataExportReport(organizationId, dateRange);
        break;
      default:
        throw new Error(`Unknown report type: ${type}`);
    }

    const report = {
      organization_id: organizationId,
      type,
      generated_by: generatedBy,
      generated_at: new Date().toISOString(),
      date_range: dateRange,
      data,
    };

    const { data: savedReport, error } = await this.supabase
      .from('compliance_reports')
      .insert(report)
      .select('*')
      .single();

    if (error) {
      throw new Error(`Failed to save compliance report: ${error.message}`);
    }

    return savedReport;
  }

  async getUserAccessReport(organizationId, dateRange) {
    const { data: users, error } = await this.supabase
      .from('users')
      .select(`
        id, email, first_name, last_name, status, created_at,
        role:roles(name),
        login_history:login_histories(
          created_at, success
        )
      `)
      .eq('organization_id', organizationId)
      .gte('created_at', dateRange.start.toISOString())
      .lte('created_at', dateRange.end.toISOString());

    if (error) {
      throw new Error(`Failed to generate user access report: ${error.message}`);
    }

    return {
      totalUsers: users?.length || 0,
      users: users || [],
    };
  }

  async getLoginActivityReport(organizationId, dateRange) {
    const { data: loginHistory, error } = await this.supabase
      .from('login_histories')
      .select(`
        *,
        user:users(email, first_name, last_name)
      `)
      .gte('created_at', dateRange.start.toISOString())
      .lte('created_at', dateRange.end.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to generate login activity report: ${error.message}`);
    }

    const successfulLogins = loginHistory?.filter(l => l.success) || [];
    const failedLogins = loginHistory?.filter(l => !l.success) || [];

    return {
      totalLogins: loginHistory?.length || 0,
      successfulLogins: successfulLogins.length,
      failedLogins: failedLogins.length,
      loginHistory: loginHistory || [],
    };
  }

  async getPermissionChangesReport(organizationId, dateRange) {
    const { data: auditLogs, error } = await this.supabase
      .from('audit_logs')
      .select(`
        *,
        user:users(email, first_name, last_name)
      `)
      .eq('organization_id', organizationId)
      .in('action', ['UPDATE_USER', 'CREATE_ROLE', 'UPDATE_ROLE', 'DELETE_ROLE'])
      .gte('created_at', dateRange.start.toISOString())
      .lte('created_at', dateRange.end.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to generate permission changes report: ${error.message}`);
    }

    return {
      totalChanges: auditLogs?.length || 0,
      changes: auditLogs || [],
    };
  }

  async getDataExportReport(organizationId, dateRange) {
    const { data: auditLogs, error } = await this.supabase
      .from('audit_logs')
      .select(`
        *,
        user:users(email, first_name, last_name)
      `)
      .eq('organization_id', organizationId)
      .in('action', ['EXPORT_USERS', 'GENERATE_COMPLIANCE_REPORT'])
      .gte('created_at', dateRange.start.toISOString())
      .lte('created_at', dateRange.end.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to generate data export report: ${error.message}`);
    }

    return {
      totalExports: auditLogs?.length || 0,
      exports: auditLogs || [],
    };
  }
}

module.exports = new OrganizationModel();