// Organization type definitions

export interface Organization {
  id: string;
  name: string;
  description?: string;
  domain: string;
  logo?: string;
  settings: OrganizationSettings;
  subscription: Subscription;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface OrganizationSettings {
  allowSelfRegistration: boolean;
  requireEmailVerification: boolean;
  enforceStrongPasswords: boolean;
  sessionTimeout: number; // in minutes
  maxLoginAttempts: number;
  lockoutDuration: number; // in minutes
  requireTwoFactor: boolean;
  allowedEmailDomains: string[];
  auditLogRetention: number; // in days
  complianceMode: 'HIPAA' | 'SOX' | 'GDPR' | 'STANDARD';
}

export interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date;
  maxUsers: number;
  currentUsers: number;
  features: string[];
  billing: BillingInfo;
}

export type SubscriptionPlan = 'free' | 'basic' | 'professional' | 'enterprise';

export type SubscriptionStatus = 'active' | 'inactive' | 'trial' | 'expired' | 'cancelled';

export interface BillingInfo {
  amount: number;
  currency: string;
  interval: 'monthly' | 'annually';
  nextBillingDate?: Date;
  paymentMethod?: string;
}

export interface CreateOrganizationRequest {
  name: string;
  description?: string;
  domain: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
  plan: SubscriptionPlan;
  settings?: Partial<OrganizationSettings>;
}

export interface UpdateOrganizationRequest {
  name?: string;
  description?: string;
  logo?: string;
  settings?: Partial<OrganizationSettings>;
}

export interface OrganizationInvite {
  id: string;
  organizationId: string;
  email: string;
  roleId: string;
  invitedBy: string;
  expiresAt: Date;
  createdAt: Date;
  acceptedAt?: Date;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
}

export interface ComplianceReport {
  id: string;
  organizationId: string;
  type: 'user_access' | 'login_activity' | 'permission_changes' | 'data_export';
  generatedBy: string;
  generatedAt: Date;
  dateRange: {
    start: Date;
    end: Date;
  };
  data: Record<string, any>;
  downloadUrl?: string;
}