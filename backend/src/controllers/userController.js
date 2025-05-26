const userModel = require('../models/user');
const auditService = require('../services/auditService');

class UserController {
  async getAllUsers(req, res) {
    try {
      const { page = 1, limit = 10, search, role, status, department } = req.query;
      
      const filters = {
        ...(search && { search }),
        ...(role && { role }),
        ...(status && { status }),
        ...(department && { department }),
      };

      const result = await userModel.getUsers({
        page: parseInt(page),
        limit: parseInt(limit),
        filters,
      });

      await auditService.log({
        userId: req.user.id,
        action: 'VIEW_USERS',
        resource: 'users',
        details: { filters },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await auditService.log({
        userId: req.user.id,
        action: 'VIEW_USER',
        resource: 'users',
        resourceId: id,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await userModel.createUser({
        ...userData,
        organizationId: req.user.organizationId,
        createdBy: req.user.id,
      });

      await auditService.log({
        userId: req.user.id,
        action: 'CREATE_USER',
        resource: 'users',
        resourceId: user.id,
        details: { email: userData.email, role: userData.role },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const existingUser = await userModel.getUserById(id);
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      const updatedUser = await userModel.updateUser(id, updateData);

      await auditService.log({
        userId: req.user.id,
        action: 'UPDATE_USER',
        resource: 'users',
        resourceId: id,
        details: { changes: updateData },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      
      const existingUser = await userModel.getUserById(id);
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      await userModel.deleteUser(id);

      await auditService.log({
        userId: req.user.id,
        action: 'DELETE_USER',
        resource: 'users',
        resourceId: id,
        details: { deletedUser: existingUser.email },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async bulkImport(req, res) {
    try {
      const { users } = req.body;
      const results = await userModel.bulkCreateUsers(users, {
        organizationId: req.user.organizationId,
        createdBy: req.user.id,
      });

      await auditService.log({
        userId: req.user.id,
        action: 'BULK_IMPORT_USERS',
        resource: 'users',
        details: { count: users.length },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(results);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();