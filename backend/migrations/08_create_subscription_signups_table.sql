
-- Create subscription_signups table
CREATE TABLE IF NOT EXISTS public.subscription_signups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    plan_price DECIMAL(10,2),
    features JSONB DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscription_signups_email ON public.subscription_signups(email);

-- Create index on plan_name
CREATE INDEX IF NOT EXISTS idx_subscription_signups_plan ON public.subscription_signups(plan_name);

-- Add trigger for updated_at
CREATE TRIGGER update_subscription_signups_updated_at 
    BEFORE UPDATE ON public.subscription_signups 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
