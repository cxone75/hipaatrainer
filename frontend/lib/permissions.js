// Frontend permission utilities

export const PERMISSIONS = {
  USERS: {
    READ: 'users:read',
    CREATE: 'users:create',
    UPDATE: 'users:update',
    DELETE: 'users:delete',
  },
  ROLES: {
    READ: 'roles:read',
    CREATE: 'roles:create',
    UPDATE: 'roles:update',
    DELETE: 'roles:delete',
  },
  ORGANIZATIONS: {
    READ: 'organizations:read',
    CREATE: 'organizations:create',
    UPDATE: 'organizations:update',
    DELETE: 'organizations:delete',
  },
  REPORTS: {
    VIEW: 'reports:view',
    EXPORT: 'reports:export',
  },
  SYSTEM: {
    SETTINGS: 'system:settings',
    AUDIT: 'system:audit',
  },
};

export const ROLE_PERMISSIONS = {
  'Super Admin': Object.values(PERMISSIONS).flatMap(p => Object.values(p)),
  'Admin': [
    ...Object.values(PERMISSIONS.USERS),
    ...Object.values(PERMISSIONS.ROLES),
    PERMISSIONS.REPORTS.VIEW,
    PERMISSIONS.REPORTS.EXPORT,
  ],
  'Manager': [
    PERMISSIONS.USERS.READ,
    PERMISSIONS.USERS.UPDATE,
    PERMISSIONS.REPORTS.VIEW,
  ],
  'User': [
    PERMISSIONS.USERS.READ,
  ],
  'Viewer': [
    PERMISSIONS.USERS.READ,
  ],
};

export function hasPermission(userRole, permission) {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
}

export function hasAnyPermission(userRole, permissions) {
  return permissions.some(permission => hasPermission(userRole, permission));
}

export function hasAllPermissions(userRole, permissions) {
  return permissions.every(permission => hasPermission(userRole, permission));
}

export function canAccessRoute(userRole, route) {
  const routePermissions = {
    '/admin/users': [PERMISSIONS.USERS.READ],
    '/admin/users/create': [PERMISSIONS.USERS.CREATE],
    '/admin/users/bulk': [PERMISSIONS.USERS.CREATE, PERMISSIONS.USERS.DELETE],
    '/admin/roles': [PERMISSIONS.ROLES.READ],
    '/profile': [], // Everyone can access their own profile
  };

  const requiredPermissions = routePermissions[route] || [];
  return requiredPermissions.length === 0 || hasAllPermissions(userRole, requiredPermissions);
}