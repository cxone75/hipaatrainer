const { createClient } = require('../services/supabase');
const bcrypt = require('bcryptjs');

class UserModel {
  constructor() {
    this.supabase = createClient();
  }

  async getUsers({ page = 1, limit = 10, filters = {} }) {
    let query = this.supabase
      .from('users')
      .select(`
        *,
        role:role_id(
          id,
          name,
          description,
          organization_id,
          is_default,
          created_at,
          updated_at
        ),
        organization:organization_id(name)
      `);

    // Apply filters
    if (filters.search) {
      query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }
    if (filters.role) {
      query = query.eq('role_id', filters.role);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.department) {
      query = query.eq('department', filters.department);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: users, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    return {
      users: users || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    };
  }

  async getUserById(userId) {
    try {
      // Use admin client to bypass RLS for user lookup during registration
      const adminSupabase = require('../services/supabase').createAdminClient();

      const { data: user, error } = await adminSupabase
        .from('users')
        .select(`
          *,
          role:roles(*),
          organization:organizations(*)
        `)
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('User lookup error:', error);
        throw new Error(`Failed to fetch user: ${error.message}`);
      }

      return user;
    } catch (error) {
      console.error('Failed to get user by ID:', error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    const { data: user, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }

    return user;
  }

  async createUser(userData) {
    const {
      email,
      firstName,
      lastName,
      phone,
      department,
      roleId,
      organizationId,
      password,
      ...rest
    } = userData;

    // Hash password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    const userToCreate = {
      email: email.toLowerCase(),
      first_name: firstName,
      last_name: lastName,
      phone,
      department,
      role_id: roleId,
      organization_id: organizationId,
      password_hash: hashedPassword,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...rest,
    };

    const { data: user, error } = await this.supabase
      .from('users')
      .insert(userToCreate)
      .select(`
        *,
        role:role_id(
          id,
          name,
          description,
          organization_id,
          is_default,
          created_at,
          updated_at
        ),
        organization:organization_id(name)
      `)
      .single();

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return user;
  }

  async updateUser(id, updateData) {
    const {
      firstName,
      lastName,
      phone,
      department,
      roleId,
      status,
      preferences,
      ...rest
    } = updateData;

    const userToUpdate = {
      ...(firstName && { first_name: firstName }),
      ...(lastName && { last_name: lastName }),
      ...(phone && { phone }),
      ...(department && { department }),
      ...(roleId && { role_id: roleId }),
      ...(status && { status }),
      ...(preferences && { preferences }),
      updated_at: new Date().toISOString(),
      ...rest,
    };

    const { data: user, error } = await this.supabase
      .from('users')
      .update(userToUpdate)
      .eq('id', id)
      .select(`
        *,
        role:role_id(
          id,
          name,
          description,
          organization_id,
          is_default,
          created_at,
          updated_at
        ),
        organization:organization_id(name)
      `)
      .single();

    if (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }

    return user;
  }

  async deleteUser(id) {
    const { error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }

    return true;
  }

  async bulkCreateUsers(usersData, context) {
    const results = {
      successful: [],
      failed: [],
    };

    for (const userData of usersData) {
      try {
        const user = await this.createUser({
          ...userData,
          organizationId: context.organizationId,
        });
        results.successful.push(user);
      } catch (error) {
        results.failed.push({
          userData,
          error: error.message,
        });
      }
    }

    return results;
  }

  async validatePassword(userId, password) {
    const { data: user, error } = await this.supabase
      .from('users')
      .select('password_hash')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return false;
    }

    return bcrypt.compare(password, user.password_hash);
  }

  async updatePassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const { error } = await this.supabase
      .from('users')
      .update({
        password_hash: hashedPassword,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to update password: ${error.message}`);
    }

    return true;
  }
}

module.exports = new UserModel();