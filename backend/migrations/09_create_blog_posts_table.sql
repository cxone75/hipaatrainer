
-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(255) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    read_time VARCHAR(20),
    image_url TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);

-- Insert sample blog post
INSERT INTO blog_posts (
    title,
    subtitle,
    slug,
    excerpt,
    content,
    category,
    author,
    featured,
    status,
    read_time
) VALUES (
    'Introducing HIPAA Trainer',
    'An innovative AI-powered platform designed to transform your business operations and skyrocket productivity.',
    'introducing-hipaa-trainer',
    'An innovative AI-powered platform designed to transform your business operations and skyrocket productivity.',
    '<p>We''re excited to unveil <strong>HIPAA Trainer</strong>, an innovative AI-powered platform designed to transform your business operations and skyrocket productivity.</p>

<h2>The Challenge We''re Addressing</h2>
<p>In today''s AI-driven world, healthcare organizations face several hurdles:</p>
<ul>
  <li>Overwhelming HIPAA compliance requirements</li>
  <li>Inefficient staff training processes</li>
  <li>Difficulty in maintaining ongoing compliance</li>
</ul>',
    'Product Updates',
    'HIPAA Trainer Team',
    true,
    'published',
    '8 min read'
);
