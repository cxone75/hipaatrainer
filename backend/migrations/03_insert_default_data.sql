
-- Insert default permissions
INSERT INTO permissions (resource, action, description) VALUES
('users', 'create', 'Create new users'),
('users', 'read', 'View user information'),
('users', 'update', 'Update user information'),
('users', 'delete', 'Delete users'),
('users', 'bulk_import', 'Import users in bulk'),

('roles', 'create', 'Create new roles'),
('roles', 'read', 'View role information'),
('roles', 'update', 'Update role information'),
('roles', 'delete', 'Delete roles'),

('organizations', 'read', 'View organization information'),
('organizations', 'update', 'Update organization settings'),

('audit', 'read', 'View audit logs'),
('audit', 'export', 'Export audit data'),

('compliance', 'read', 'View compliance reports'),
('compliance', 'generate', 'Generate compliance reports'),

('training', 'create', 'Create training content'),
('training', 'read', 'View training content'),
('training', 'update', 'Update training content'),
('training', 'delete', 'Delete training content'),
('training', 'assign', 'Assign training to users'),

('policies', 'create', 'Create policies'),
('policies', 'read', 'View policies'),
('policies', 'update', 'Update policies'),
('policies', 'delete', 'Delete policies'),
('policies', 'approve', 'Approve policy changes'),

('risk_assessments', 'create', 'Create risk assessments'),
('risk_assessments', 'read', 'View risk assessments'),
('risk_assessments', 'update', 'Update risk assessments'),
('risk_assessments', 'delete', 'Delete risk assessments'),

('documents', 'create', 'Upload documents'),
('documents', 'read', 'View documents'),
('documents', 'update', 'Update documents'),
('documents', 'delete', 'Delete documents')

ON CONFLICT (resource, action) DO NOTHING;

-- Create a function to set up a new organization with default roles
CREATE OR REPLACE FUNCTION setup_new_organization(
    p_org_name VARCHAR,
    p_admin_user_id UUID,
    p_admin_email VARCHAR,
    p_admin_first_name VARCHAR,
    p_admin_last_name VARCHAR,
    p_admin_job_title VARCHAR DEFAULT NULL
)
RETURNS TABLE (
    organization_id UUID,
    admin_role_id UUID,
    user_id UUID
) AS $$
DECLARE
    v_org_id UUID;
    v_admin_role_id UUID;
    v_user_role_id UUID;
    v_viewer_role_id UUID;
    v_existing_user UUID;
BEGIN
    -- Check if user already exists
    SELECT id INTO v_existing_user FROM users WHERE email = p_admin_email;
    IF v_existing_user IS NOT NULL THEN
        RAISE EXCEPTION 'User with email % already exists', p_admin_email;
    END IF;

    -- Check if organization name already exists
    SELECT id INTO v_org_id FROM organizations WHERE name = p_org_name;
    IF v_org_id IS NOT NULL THEN
        RAISE EXCEPTION 'Organization with name % already exists', p_org_name;
    END IF;

    -- Create organization
    INSERT INTO organizations (name, created_at, updated_at)
    VALUES (p_org_name, NOW(), NOW())
    RETURNING id INTO v_org_id;

    -- Create default Admin role with all permissions
    INSERT INTO roles (organization_id, name, description, is_default, created_by, created_at, updated_at)
    VALUES (v_org_id, 'Admin', 'Full system administrator with all permissions', false, p_admin_user_id, NOW(), NOW())
    RETURNING id INTO v_admin_role_id;

    -- Create default User role with limited permissions
    INSERT INTO roles (organization_id, name, description, is_default, created_by, created_at, updated_at)
    VALUES (v_org_id, 'User', 'Standard user with basic permissions', true, p_admin_user_id, NOW(), NOW())
    RETURNING id INTO v_user_role_id;

    -- Create default Viewer role with read-only permissions
    INSERT INTO roles (organization_id, name, description, is_default, created_by, created_at, updated_at)
    VALUES (v_org_id, 'Viewer', 'Read-only access to most resources', false, p_admin_user_id, NOW(), NOW())
    RETURNING id INTO v_viewer_role_id;

    -- Assign all permissions to Admin role
    INSERT INTO role_permissions (role_id, permission_id, created_at)
    SELECT v_admin_role_id, p.id, NOW()
    FROM permissions p;

    -- Assign basic permissions to User role
    INSERT INTO role_permissions (role_id, permission_id, created_at)
    SELECT v_user_role_id, p.id, NOW()
    FROM permissions p
    WHERE (p.resource, p.action) IN (
        ('training', 'read'),
        ('policies', 'read'),
        ('documents', 'read'),
        ('compliance', 'read')
    );

    -- Assign read-only permissions to Viewer role
    INSERT INTO role_permissions (role_id, permission_id, created_at)
    SELECT v_viewer_role_id, p.id, NOW()
    FROM permissions p
    WHERE p.action = 'read';

    -- Create admin user record
    INSERT INTO users (
        id,
        organization_id,
        role_id,
        email,
        first_name,
        last_name,
        job_title,
        status,
        created_at,
        updated_at
    ) VALUES (
        p_admin_user_id,
        v_org_id,
        v_admin_role_id,
        p_admin_email,
        p_admin_first_name,
        p_admin_last_name,
        p_admin_job_title,
        'active',
        NOW(),
        NOW()
    );

    -- Create default subscription (trial)
    INSERT INTO subscriptions (
        organization_id,
        plan_name,
        status,
        started_at,
        expires_at,
        user_limit,
        features,
        created_at,
        updated_at
    ) VALUES (
        v_org_id,
        'trial',
        'trial',
        NOW(),
        NOW() + INTERVAL '30 days',
        10,
        '{"training": true, "policies": true, "audit": true, "compliance": true}',
        NOW(),
        NOW()
    );

    -- Log the organization creation
    PERFORM create_audit_log(
        v_org_id,
        p_admin_user_id,
        'CREATE_ORGANIZATION',
        'organizations',
        v_org_id,
        jsonb_build_object('organization_name', p_org_name),
        NULL,
        NULL
    );

    RETURN QUERY SELECT v_org_id, v_admin_role_id, p_admin_user_id;
END;
$$ LANGUAGE plpgsql;
