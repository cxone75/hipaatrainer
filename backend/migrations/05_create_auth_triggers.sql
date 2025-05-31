
-- Create a trigger function that sets up organization when a new auth user is created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER 
AS $$
DECLARE
    v_org_id UUID;
    v_admin_role_id UUID;
    v_user_role_id UUID;
    v_viewer_role_id UUID;
    v_org_name VARCHAR;
    v_user_metadata JSONB;
    v_first_name VARCHAR;
    v_last_name VARCHAR;
    v_job_title VARCHAR;
BEGIN
    -- Log the trigger execution for debugging
    RAISE WARNING 'handle_new_user trigger fired for user: %', NEW.id;
    
    -- Get user metadata from auth.users
    v_user_metadata := NEW.raw_user_meta_data;
    
    -- Log metadata for debugging
    RAISE WARNING 'User metadata: %', v_user_metadata;
    
    -- Extract organization name from metadata
    v_org_name := v_user_metadata->>'organizationName';
    v_first_name := COALESCE(v_user_metadata->>'firstName', '');
    v_last_name := COALESCE(v_user_metadata->>'lastName', '');
    v_job_title := v_user_metadata->>'jobTitle';
    
    -- Only proceed if organization name is provided (signup flow)
    IF v_org_name IS NOT NULL AND v_org_name != '' THEN
        RAISE WARNING 'Processing new organization signup for: %', v_org_name;
        -- Check if organization already exists
        SELECT id INTO v_org_id FROM public.organizations WHERE name = v_org_name;
        
        IF v_org_id IS NULL THEN
            -- Create new organization
            INSERT INTO public.organizations (name, created_at, updated_at)
            VALUES (v_org_name, NOW(), NOW())
            RETURNING id INTO v_org_id;
RAISE WARNING 'v_org_id: %', v_org_id;

            -- Create default Admin role
            INSERT INTO public.roles (organization_id, name, description, is_default, created_by, created_at, updated_at)
            VALUES (v_org_id, 'Admin', 'Full system administrator with all permissions', false, NEW.id, NOW(), NOW())
            RETURNING id INTO v_admin_role_id;

            -- Create default User role
            INSERT INTO public.roles (organization_id, name, description, is_default, created_by, created_at, updated_at)
            VALUES (v_org_id, 'User', 'Standard user with basic permissions', true, NEW.id, NOW(), NOW())
            RETURNING id INTO v_user_role_id;

            -- Create default Viewer role
            INSERT INTO public.roles (organization_id, name, description, is_default, created_by, created_at, updated_at)
            VALUES (v_org_id, 'Viewer', 'Read-only access to most resources', false, NEW.id, NOW(), NOW())
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
        ELSE
            -- Organization exists, get the default user role
            SELECT id INTO v_user_role_id FROM public.roles 
            WHERE organization_id = v_org_id AND is_default = true 
            LIMIT 1;
            
            -- If no default role, get any role
            IF v_user_role_id IS NULL THEN
                SELECT id INTO v_user_role_id FROM public.roles 
                WHERE organization_id = v_org_id 
                ORDER BY created_at ASC 
                LIMIT 1;
            END IF;
        END IF;

        RAISE WARNING 'Records created so far: organization_id=%, role_id=%', v_org_id, v_admin_role_id;

        -- Create user record in our users table
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
            NEW.id,
            v_org_id,
            COALESCE(v_admin_role_id, v_user_role_id), -- Admin role for new org, user role for existing
            NEW.email,
            v_first_name,
            v_last_name,
            v_job_title,
            'active',
            NOW(),
            NOW()
        );
        
        RAISE WARNING 'Successfully created user record for: %', NEW.email;

        -- Log the organization creation if new org
        IF v_admin_role_id IS NOT NULL THEN
            PERFORM create_audit_log(
                v_org_id,
                NEW.id,
                'CREATE_ORGANIZATION',
                'organizations',
                v_org_id,
                jsonb_build_object(
                    'organization_name', v_org_name,
                    'admin_email', NEW.email,
                    'trigger_created', true
                ),
                NULL,
                NULL
            );
        END IF;
    END IF;

    RAISE WARNING 'Successfully completed handle_new_user for: %', NEW.email;
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log detailed error information
        RAISE WARNING 'Failed to create organization records for user % (email: %): % - SQL State: %', NEW.id, NEW.email, SQLERRM, SQLSTATE;
        
        -- For critical errors, we might want to fail the auth user creation
        -- But for now, we'll let it succeed and handle cleanup in the application
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to handle user deletion cleanup
CREATE OR REPLACE FUNCTION handle_user_delete()
RETURNS TRIGGER AS $$
DECLARE
    v_org_id UUID;
    v_user_count INTEGER;
BEGIN
    -- Get the user's organization
    SELECT organization_id INTO v_org_id FROM public.users WHERE id = OLD.id;
    
    IF v_org_id IS NOT NULL THEN
        -- Delete user record
        DELETE FROM public.users WHERE id = OLD.id;
        
        -- Check if this was the last user in the organization
        SELECT COUNT(*) INTO v_user_count FROM public.users WHERE organization_id = v_org_id;
        
        -- If no users left, clean up the organization
        IF v_user_count = 0 THEN
            DELETE FROM public.organizations WHERE id = v_org_id;
        END IF;
    END IF;
    
    RETURN OLD;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Failed to cleanup records for deleted user %: %', OLD.id, SQLERRM;
        RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger for user deletion
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
    AFTER DELETE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_user_delete();
