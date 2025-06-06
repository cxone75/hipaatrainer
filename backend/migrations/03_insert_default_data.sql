
-- Insert default permissions
INSERT INTO public.permissions (resource, action, description) VALUES
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
    v_existing_org UUID;
BEGIN
    -- Start explicit transaction (redundant but clear intent)
    -- PostgreSQL functions are already atomic, but being explicit
    
    -- Check if user already exists in database
    SELECT id INTO v_existing_user FROM public.users WHERE email = p_admin_email;
    IF v_existing_user IS NOT NULL THEN
        RAISE EXCEPTION 'User with email % already exists in database', p_admin_email;
    END IF;

    -- Check if organization name already exists
    SELECT id INTO v_existing_org FROM public.organizations WHERE name = p_org_name;
    IF v_existing_org IS NOT NULL THEN
        RAISE EXCEPTION 'Organization with name % already exists', p_org_name;
    END IF;

    -- Additional validation
    IF p_admin_user_id IS NULL THEN
        RAISE EXCEPTION 'Admin user ID cannot be null';
    END IF;
    
    IF p_admin_email IS NULL OR p_admin_email = '' THEN
        RAISE EXCEPTION 'Admin email cannot be null or empty';
    END IF;
    
    IF p_org_name IS NULL OR p_org_name = '' THEN
        RAISE EXCEPTION 'Organization name cannot be null or empty';
    END IF;

    -- Create organization
    INSERT INTO public.organizations (name, created_at, updated_at)
    VALUES (p_org_name, NOW(), NOW())
    RETURNING id INTO v_org_id;

    -- Create default Admin role with all permissions
    INSERT INTO public.roles (organization_id, name, description, is_default, created_by, created_at, updated_at)
    VALUES (v_org_id, 'Admin', 'Full system administrator with all permissions', false, p_admin_user_id, NOW(), NOW())
    RETURNING id INTO v_admin_role_id;

    -- Create default User role with limited permissions
    INSERT INTO public.roles (organization_id, name, description, is_default, created_by, created_at, updated_at)
    VALUES (v_org_id, 'User', 'Standard user with basic permissions', true, p_admin_user_id, NOW(), NOW())
    RETURNING id INTO v_user_role_id;

    -- Create default Viewer role with read-only permissions
    INSERT INTO public.roles (organization_id, name, description, is_default, created_by, created_at, updated_at)
    VALUES (v_org_id, 'Viewer', 'Read-only access to most resources', false, p_admin_user_id, NOW(), NOW())
    RETURNING id INTO v_viewer_role_id;

    -- Assign all permissions to Admin role
    INSERT INTO public.role_permissions (role_id, permission_id, created_at)
    SELECT v_admin_role_id, p.id, NOW()
    FROM public.permissions p;

    -- Assign basic permissions to User role
    INSERT INTO public.role_permissions (role_id, permission_id, created_at)
    SELECT v_user_role_id, p.id, NOW()
    FROM public.permissions p
    WHERE (p.resource, p.action) IN (
        ('training', 'read'),
        ('policies', 'read'),
        ('documents', 'read'),
        ('compliance', 'read')
    );

    -- Assign read-only permissions to Viewer role
    INSERT INTO public.role_permissions (role_id, permission_id, created_at)
    SELECT v_viewer_role_id, p.id, NOW()
    FROM public.permissions p
    WHERE p.action = 'read';

    -- Create admin user record and verify it was created
    INSERT INTO public.users (
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

    -- Verify user was created
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = p_admin_user_id) THEN
        RAISE EXCEPTION 'Failed to create admin user';
    END IF;

    -- Create default subscription (trial)
    INSERT INTO public.subscriptions (
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

    -- Final verification that all records were created successfully
    IF NOT EXISTS (SELECT 1 FROM public.organizations WHERE id = v_org_id) THEN
        RAISE EXCEPTION 'Organization creation failed - organization not found';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM public.roles WHERE id = v_admin_role_id) THEN
        RAISE EXCEPTION 'Organization creation failed - admin role not found';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = p_admin_user_id) THEN
        RAISE EXCEPTION 'Organization creation failed - user not found';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM public.subscriptions WHERE organization_id = v_org_id) THEN
        RAISE EXCEPTION 'Organization creation failed - subscription not found';
    END IF;

    -- Log the organization creation
    PERFORM create_audit_log(
        v_org_id,
        p_admin_user_id,
        'CREATE_ORGANIZATION',
        'organizations',
        v_org_id,
        jsonb_build_object(
            'organization_name', p_org_name,
            'admin_email', p_admin_email,
            'transaction_completed', true
        ),
        NULL,
        NULL
    );

    -- Return success with all IDs
    RETURN QUERY SELECT v_org_id, v_admin_role_id, p_admin_user_id;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Log the failure
        RAISE EXCEPTION 'Organization setup transaction failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
