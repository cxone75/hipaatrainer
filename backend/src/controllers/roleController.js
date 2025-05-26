const roleModel = require('../models/role');
const auditService = require('../services/auditService');

class RoleController {
  async getAllRoles(req, res) {
    try {
      const roles = await roleModel.getRoles({
        organizationId: req.user.organizationId,
      });

      await auditService.log({
        userId: req.user.id,
        action: 'VIEW_ROLES',
        resource: 'roles',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRoleById(req, res) {
    try {
      const { id } = req.params;
      const role = await roleModel.getRoleById(id);
      
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }

      if (role.organizationId !== req.user.organizationId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      await auditService.log({
        userId: req.user.id,
        action: 'VIEW_ROLE',
        resource: 'roles',
        resourceId: id,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createRole(req, res) {
    try {
      const roleData = req.body;
      const role = await roleModel.createRole({
        ...roleData,
        organizationId: req.user.organizationId,
        createdBy: req.user.id,
      });

      await auditService.log({
        userId: req.user.id,
        action: 'CREATE_ROLE',
        resource: 'roles',
        resourceId: role.id,
        details: { name: roleData.name, permissions: roleData.permissions },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateRole(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const existingRole = await roleModel.getRoleById(id);
      if (!existingRole) {
        return res.status(404).json({ error: 'Role not found' });
      }

      if (existingRole.organizationId !== req.user.organizationId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const updatedRole = await roleModel.updateRole(id, updateData);

      await auditService.log({
        userId: req.user.id,
        action: 'UPDATE_ROLE',
        resource: 'roles',
        resourceId: id,
        details: { changes: updateData },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(updatedRole);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteRole(req, res) {
    try {
      const { id } = req.params;
      
      const existingRole = await roleModel.getRoleById(id);
      if (!existingRole) {
        return res.status(404).json({ error: 'Role not found' });
      }

      if (existingRole.organizationId !== req.user.organizationId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (existingRole.isDefault) {
        return res.status(400).json({ error: 'Cannot delete default role' });
      }

      await roleModel.deleteRole(id);

      await auditService.log({
        userId: req.user.id,
        action: 'DELETE_ROLE',
        resource: 'roles',
        resourceId: id,
        details: { deletedRole: existingRole.name },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPermissions(req, res) {
    try {
      const permissions = await roleModel.getAllPermissions();
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RoleController();