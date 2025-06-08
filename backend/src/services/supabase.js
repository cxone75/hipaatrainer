const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase environment variables, using mock client');
  // Create a mock client for development
  supabase = {
    from: () => ({
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ 
            data: { email: 'test@example.com', plan_name: 'test' }, 
            error: null 
          })
        })
      })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
}

class SupabaseService {
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_ANON_KEY;
    this.supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!this.supabaseUrl || !this.supabaseKey) {
      throw new Error('Missing Supabase configuration. Please check SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    }

    this.client = createClient(this.supabaseUrl, this.supabaseKey);
    this.adminClient = null;
  }

  createAdminClient() {
    if (!this.adminClient && this.supabaseServiceKey) {
      this.adminClient = createClient(this.supabaseUrl, this.supabaseServiceKey);
    }
    return this.adminClient || this.client;
  }

  async testConnection() {
    try {
      const { data, error } = await this.client
        .from('organizations')
        .select('id')
        .limit(1);

      return {
        success: !error,
        error: error?.message || null
      };
    } catch (err) {
      return {
        success: false,
        error: err.message
      };
    }
  }

  async healthCheck() {
    try {
      const connectionTest = await this.testConnection();

      return {
        status: connectionTest.success ? 'healthy' : 'unhealthy',
        database: connectionTest.success ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
        error: connectionTest.error
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
        error: error.message
      };
    }
  }

  async getDatabaseStats() {
    try {
      const client = this.createAdminClient();

      const [usersCount, rolesCount, orgsCount] = await Promise.all([
        client.from('users').select('id', { count: 'exact', head: true }),
        client.from('roles').select('id', { count: 'exact', head: true }),
        client.from('organizations').select('id', { count: 'exact', head: true })
      ]);

      return {
        users: usersCount.count || 0,
        roles: rolesCount.count || 0,
        organizations: orgsCount.count || 0
      };
    } catch (error) {
      console.error('Database stats error:', error);
      return {
        users: 0,
        roles: 0,
        organizations: 0,
        error: error.message
      };
    }
  }
}

// Create functions for backward compatibility
function createClient() {
  return supabase;
}

function createAdminClient() {
  return supabase;
}

// Export both the service class and the supabase client
module.exports = { 
  supabase,
  createClient,
  createAdminClient,
  SupabaseService: new SupabaseService()
};