
-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_organizations_updated_at 
    BEFORE UPDATE ON public.organizations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roles_updated_at 
    BEFORE UPDATE ON public.roles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at 
    BEFORE UPDATE ON public.subscriptions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to log user logins
CREATE OR REPLACE FUNCTION log_user_login(
    p_user_id UUID,
    p_email VARCHAR,
    p_success BOOLEAN,
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL,
    p_failure_reason VARCHAR DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    login_id UUID;
BEGIN
    INSERT INTO public.login_histories (
        user_id,
        email,
        success,
        ip_address,
        user_agent,
        failure_reason,
        created_at
    ) VALUES (
        p_user_id,
        p_email,
        p_success,
        p_ip_address,
        p_user_agent,
        p_failure_reason,
        NOW()
    ) RETURNING id INTO login_id;
    
    -- Update user's last login time if successful
    IF p_success AND p_user_id IS NOT NULL THEN
        UPDATE public.users 
        SET last_login_at = NOW() 
        WHERE id = p_user_id;
    END IF;
    
    RETURN login_id;
END;
$$ LANGUAGE plpgsql;

-- Function to create audit log entry
CREATE OR REPLACE FUNCTION create_audit_log(
    p_organization_id UUID,
    p_user_id UUID,
    p_action VARCHAR,
    p_resource VARCHAR,
    p_resource_id UUID DEFAULT NULL,
    p_details JSONB DEFAULT '{}',
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    audit_id UUID;
BEGIN
    INSERT INTO public.audit_logs (
        organization_id,
        user_id,
        action,
        resource,
        resource_id,
        details,
        ip_address,
        user_agent,
        created_at
    ) VALUES (
        p_organization_id,
        p_user_id,
        p_action,
        p_resource,
        p_resource_id,
        p_details,
        p_ip_address,
        p_user_agent,
        NOW()
    ) RETURNING id INTO audit_id;
    
    RETURN audit_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get user with role and organization info
CREATE OR REPLACE FUNCTION get_user_with_details(p_user_id UUID)
RETURNS TABLE (
    id UUID,
    organization_id UUID,
    role_id UUID,
    email VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    phone VARCHAR,
    department VARCHAR,
    job_title VARCHAR,
    status VARCHAR,
    preferences JSONB,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    role_name VARCHAR,
    role_description TEXT,
    organization_name VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.organization_id,
        u.role_id,
        u.email,
        u.first_name,
        u.last_name,
        u.phone,
        u.department,
        u.job_title,
        u.status,
        u.preferences,
        u.last_login_at,
        u.created_at,
        u.updated_at,
        r.name as role_name,
        r.description as role_description,
        o.name as organization_name
    FROM public.users u
    LEFT JOIN public.roles r ON u.role_id = r.id
    LEFT JOIN public.organizations o ON u.organization_id = o.id
    WHERE u.id = p_user_id;
END;
$$ LANGUAGE plpgsql;
