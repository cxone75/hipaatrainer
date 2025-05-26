const organizationModel = require('../models/organization');
const auditService = require('../services/auditService');

class OrganizationController {
  async getOrganization(req, res) {
    try {
      const organization = await organizationModel.getOrganizationById(req.user.organizationId);
      
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }

      res.json(organization);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOrganization(req, res) {
    try {
      const updateData = req.body;
      const updatedOrganization = await organizationModel.updateOrganization(
        req.user.organizationId,
        updateData
      );

      await auditService.log({
        userId: req.user.id,
        action: 'UPDATE_ORGANIZATION',
        resource: 'organizations',
        resourceId: req.user.organizationId,
        details: { changes: updateData },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(updatedOrganization);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSettings(req, res) {
    try {
      const settings = await organizationModel.getSettings(req.user.organizationId);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateSettings(req, res) {
    try {
      const settingsData = req.body;
      const updatedSettings = await organizationModel.updateSettings(
        req.user.organizationId,
        settingsData
      );

      await auditService.log({
        userId: req.user.id,
        action: 'UPDATE_ORGANIZATION_SETTINGS',
        resource: 'organizations',
        resourceId: req.user.organizationId,
        details: { changes: settingsData },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(updatedSettings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSubscription(req, res) {
    try {
      const subscription = await organizationModel.getSubscription(req.user.organizationId);
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async generateComplianceReport(req, res) {
    try {
      const { type, startDate, endDate } = req.body;
      
      const report = await organizationModel.generateComplianceReport({
        organizationId: req.user.organizationId,
        type,
        dateRange: { start: new Date(startDate), end: new Date(endDate) },
        generatedBy: req.user.id,
      });

      await auditService.log({
        userId: req.user.id,
        action: 'GENERATE_COMPLIANCE_REPORT',
        resource: 'organizations',
        resourceId: req.user.organizationId,
        details: { reportType: type, dateRange: { startDate, endDate } },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(report);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAuditLogs(req, res) {
    try {
      const { page = 1, limit = 50, startDate, endDate, userId, action } = req.query;
      
      const filters = {
        organizationId: req.user.organizationId,
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(userId && { userId }),
        ...(action && { action }),
      };

      const auditLogs = await auditService.getAuditLogs({
        page: parseInt(page),
        limit: parseInt(limit),
        filters,
      });

      res.json(auditLogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OrganizationController();