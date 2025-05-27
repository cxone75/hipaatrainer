
-- Create documents table for document management
CREATE TABLE IF NOT EXISTS documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT,
    file_path VARCHAR(500) NOT NULL,
    storage_url VARCHAR(500) NOT NULL,
    file_size INTEGER,
    status VARCHAR(50) DEFAULT 'active',
    version VARCHAR(20) DEFAULT '1.0',
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    review_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_organization_id ON documents(organization_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at);

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY documents_organization_isolation ON documents
    USING (organization_id = current_setting('app.current_organization_id')::UUID);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_documents_updated_at 
    BEFORE UPDATE ON documents 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for documents (this would typically be done through Supabase dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Create storage policies for the documents bucket
-- CREATE POLICY "Users can upload documents to their organization folder" ON storage.objects
--     FOR INSERT WITH CHECK (
--         bucket_id = 'documents' AND
--         auth.role() = 'authenticated' AND
--         (storage.foldername(name))[1] = current_setting('app.current_organization_id')
--     );

-- CREATE POLICY "Users can view documents from their organization" ON storage.objects
--     FOR SELECT USING (
--         bucket_id = 'documents' AND
--         auth.role() = 'authenticated' AND
--         (storage.foldername(name))[1] = current_setting('app.current_organization_id')
--     );

-- CREATE POLICY "Users can delete documents from their organization" ON storage.objects
--     FOR DELETE USING (
--         bucket_id = 'documents' AND
--         auth.role() = 'authenticated' AND
--         (storage.foldername(name))[1] = current_setting('app.current_organization_id')
--     );
