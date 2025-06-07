const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return await response.text();
    } catch (error) {
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data),
      ...options 
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(data),
      ...options 
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }

  // User endpoints
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/users?${queryString}`);
  }

  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Role endpoints
  async getRoles() {
    return this.request('/roles');
  }

  async createRole(roleData) {
    return this.request('/roles', {
      method: 'POST',
      body: JSON.stringify(roleData),
    });
  }

  // Organization endpoints
  async getOrganizations() {
    return this.request('/organizations');
  }

  async switchOrganization(userId, organizationId) {
    return this.request(`/users/${userId}/switch-org`, {
      method: 'POST',
      body: JSON.stringify({ organizationId }),
    });
  }

  async removeUserFromOrganization(userId, organizationId) {
    return this.request(`/users/${userId}/remove-org`, {
      method: 'DELETE',
      body: JSON.stringify({ organizationId }),
    });
  }

  // Document endpoints
  async getDocuments() {
    return this.request('/documents');
  }

  async uploadDocument(formData) {
    return this.request('/documents', {
      method: 'POST',
      headers: {}, // Don't set Content-Type for FormData
      body: formData,
    });
  }

  async deleteDocument(id) {
    return this.request(`/documents/${id}`, {
      method: 'DELETE',
    });
  }

  // Corrective Actions endpoints
  async getCorrectiveActions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/corrective-actions?${queryString}`);
  }

  async createCorrectiveAction(actionData) {
    return this.request('/corrective-actions', {
      method: 'POST',
      body: JSON.stringify(actionData),
    });
  }

  async updateCorrectiveAction(id, actionData) {
    return this.request(`/corrective-actions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(actionData),
    });
  }

  async deleteCorrectiveAction(id) {
    return this.request(`/corrective-actions/${id}`, {
      method: 'DELETE',
    });
  }
}

const apiClient = new ApiClient();
export default apiClient;