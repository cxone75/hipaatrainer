
-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    unsubscribe_token UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscriptions(email);

-- Create index on unsubscribe token
CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token ON public.newsletter_subscriptions(unsubscribe_token);

-- Add trigger for updated_at
CREATE TRIGGER update_newsletter_updated_at 
    BEFORE UPDATE ON public.newsletter_subscriptions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
