const { createClient } = require('@supabase/supabase-js');

class SupabaseService {
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_ANON_KEY;
    this.supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!this.supabaseUrl || !this.supabaseKey) {
      throw new Error('Missing Supabase configuration. Please check SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    }
  }

  // Create client with anonymous key (for general use)
  createClient() {
    return createClient(this.supabaseUrl, this.supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  // Create admin client with service role key (for admin operations)
  createAdminClient() {
    if (!this.supabaseServiceKey) {
      throw new Error('Missing Supabase service role key. Please check SUPABASE_SERVICE_ROLE_KEY environment variable.');
    }

    return createClient(this.supabaseUrl, this.supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  // Create authenticated client for a specific user
  createUserClient(accessToken) {
    const client = createClient(this.supabaseUrl, this.supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Set the auth token
    client.auth.setSession({
      access_token: accessToken,
      refresh_token: null,
    });

    return client;
  }

  // Test database connection
  async testConnection() {
    try {
      const client = this.createClient();
      const { data, error } = await client
        .from('organizations')
        .select('id')
        .limit(1);

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: 'Database connection successful',
      };
    } catch (error) {
      return {
        success: false,
        message: `Database connection failed: ${error.message}`,
        error,
      };
    }
  }

  // Health check for the service
  async healthCheck() {
    try {
      const connectionTest = await this.testConnection();
      
      return {
        status: connectionTest.success ? 'healthy' : 'unhealthy',
        database: connectionTest.success ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
        ...(!connectionTest.success && { error: connectionTest.message }),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        database: 'error',
        timestamp: new Date().toISOString(),
        error: error.message,
      };
    }
  }

  // Execute raw SQL query (admin only)
  async executeQuery(query, params = []) {
    try {
      const client = this.createAdminClient();
      const { data, error } = await client.rpc('execute_sql', {
        query,
        params,
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw new Error(`Query execution failed: ${error.message}`);
    }
  }

  // Get database statistics
  async getDatabaseStats() {
    try {
      const client = this.createAdminClient();
      
      const [usersCount, rolesCount, orgsCount] = await Promise.all([
        client.from('users').select('id', { count: 'exact', head: true }),
        client.from('roles').select('id', { count: 'exact', head: true }),
        client.from('organizations').select('id', { count: 'exact', head: true }),
      ]);

      return {
        users: usersCount.count || 0,
        roles: rolesCount.count || 0,
        organizations: orgsCount.count || 0,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(`Failed to get database statistics: ${error.message}`);
    }
  }
}

// Export singleton instance
const supabaseService = new SupabaseService();

module.exports = {
  createClient: () => supabaseService.createClient(),
  createAdminClient: () => supabaseService.createAdminClient(),
  createUserClient: (token) => supabaseService.createUserClient(token),
  testConnection: () => supabaseService.testConnection(),
  healthCheck: () => supabaseService.healthCheck(),
  executeQuery: (query, params) => supabaseService.executeQuery(query, params),
  getDatabaseStats: () => supabaseService.getDatabaseStats(),
  supabaseService,
};