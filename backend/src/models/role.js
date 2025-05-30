const { createClient } = require('../services/supabase');

class RoleModel {
  constructor() {
    this.supabase = createClient();
  }

  async getRoles({ organizationId }) {
    const { data: roles, error } = await this.supabase
      .from('roles')
      .select(`
        *,
        permissions:role_permissions(
          permission:permissions(*)
        )
      `)
      .eq('organization_id', organizationId)
      .order('name');

    if (error) {
      throw new Error(`Failed to fetch roles: ${error.message}`);
    }

    return roles || [];
  }

  async getRoleById(id) {
    const { data: role, error } = await this.supabase
      .from('roles')
      .select(`
        *,
        permissions:role_permissions(
          permission:permissions(*)
        )
      `)
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch role: ${error.message}`);
    }

    return role;
  }

  async getRoleByName(name, organizationId = null) {
    let query = this.supabase
      .from('roles')
      .select(`
        *,
        permissions:role_permissions(
          permission:permissions(*)
        )
      `)
      .eq('name', name);

    if (organizationId) {
      query = query.eq('organization_id', organizationId);
    }

    const { data: role, error } = await query.single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch role: ${error.message}`);
    }

    return role;
  }

  async createRole(roleData) {
    const {
      name,
      description,
      permissions,
      organizationId,
      createdBy,
      ...rest
    } = roleData;

    const roleToCreate = {
      name,
      description,
      organization_id: organizationId,
      created_by: createdBy,
      is_default: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...rest,
    };

    const { data: role, error } = await this.supabase
      .from('roles')
      .insert(roleToCreate)
      .select('*')
      .single();

    if (error) {
      throw new Error(`Failed to create role: ${error.message}`);
    }

    // Add permissions to the role
    if (permissions && permissions.length > 0) {
      await this.updateRolePermissions(role.id, permissions);
    }

    return this.getRoleById(role.id);
  }

  async updateRole(id, updateData) {
    const {
      name,
      description,
      permissions,
      ...rest
    } = updateData;

    const roleToUpdate = {
      ...(name && { name }),
      ...(description && { description }),
      updated_at: new Date().toISOString(),
      ...rest,
    };

    const { data: role, error } = await this.supabase
      .from('roles')
      .update(roleToUpdate)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error(`Failed to update role: ${error.message}`);
    }

    // Update permissions if provided
    if (permissions) {
      await this.updateRolePermissions(id, permissions);
    }

    return this.getRoleById(id);
  }

  async deleteRole(id) {
    // First, remove all role permissions
    await this.supabase
      .from('role_permissions')
      .delete()
      .eq('role_id', id);

    // Then delete the role
    const { error } = await this.supabase
      .from('roles')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete role: ${error.message}`);
    }

    return true;
  }

  async updateRolePermissions(roleId, permissionIds) {
    // Remove existing permissions
    await this.supabase
      .from('role_permissions')
      .delete()
      .eq('role_id', roleId);

    // Add new permissions
    if (permissionIds.length > 0) {
      const rolePermissions = permissionIds.map(permissionId => ({
        role_id: roleId,
        permission_id: permissionId,
        created_at: new Date().toISOString(),
      }));

      const { error } = await this.supabase
        .from('role_permissions')
        .insert(rolePermissions);

      if (error) {
        throw new Error(`Failed to update role permissions: ${error.message}`);
      }
    }

    return true;
  }

  async getAllPermissions() {
    const { data: permissions, error } = await this.supabase
      .from('permissions')
      .select('*')
      .order('resource, action');

    if (error) {
      throw new Error(`Failed to fetch permissions: ${error.message}`);
    }

    return permissions || [];
  }

  async getUserPermissions(userId) {
    const { data: permissions, error } = await this.supabase
      .from('users')
      .select(`
        role:roles(
          permissions:role_permissions(
            permission:permissions(*)
          )
        )
      `)
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch user permissions: ${error.message}`);
    }

    return permissions?.role?.permissions?.map(rp => rp.permission) || [];
  }

  async hasPermission(userId, resource, action) {
    const permissions = await this.getUserPermissions(userId);
    return permissions.some(p => p.resource === resource && p.action === action);
  }
}

module.exports = new RoleModel();