// User type definitions

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  department?: string;
  role: Role;
  status: UserStatus;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isEmailVerified: boolean;
  isTwoFactorEnabled: boolean;
  profilePicture?: string;
  preferences: UserPreferences;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  organizationId: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string;
}

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  department?: string;
  roleId: string;
  organizationId: string;
  sendWelcomeEmail?: boolean;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  department?: string;
  roleId?: string;
  status?: UserStatus;
  preferences?: Partial<UserPreferences>;
}

export interface UserSearchParams {
  query?: string;
  role?: string;
  status?: UserStatus;
  department?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLoginAt';
  sortOrder?: 'asc' | 'desc';
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginHistory {
  id: string;
  userId: string;
  loginAt: Date;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  failureReason?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}