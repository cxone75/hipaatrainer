const express = require('express');
const { createClient } = require('../services/supabase');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');

const router = express.Router();
const auth = authMiddleware.verifyToken.bind(authMiddleware);
const rbac = rbacMiddleware.requireRole;

// Get all blog posts
router.get('/', async (req, res) => {
  console.log('Backend: GET all blog posts request received');
  console.log('Backend: Query params:', req.query);
  
  try {
    const { category, status, featured } = req.query;
    const supabase = createClient();

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (category && category !== 'All') {
      query = query.eq('category', category);
      console.log('Backend: Filtering by category:', category);
    }

    if (status) {
      query = query.eq('status', status);
      console.log('Backend: Filtering by status:', status);
    }

    if (featured !== undefined) {
      query = query.eq('featured', featured === 'true');
      console.log('Backend: Filtering by featured:', featured);
    }

    console.log('Backend: Executing query for all blog posts...');
    const { data, error } = await query;

    if (error) {
      console.error('Backend: Database error fetching all posts:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log('Backend: Successfully fetched', data?.length || 0, 'blog posts');
    res.json(data);
  } catch (error) {
    console.error('Backend: Error fetching blog posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single blog post by slug or ID
router.get('/:identifier', async (req, res) => {
  console.log('Backend: GET blog post request received for identifier:', req.params.identifier);
  
  try {
    const { identifier } = req.params;
    const supabase = createClient();

    // Check if identifier is a number (ID) or string (slug)
    const isId = /^\d+$/.test(identifier);
    console.log('Backend: Identifier type - isId:', isId, 'identifier:', identifier);

    let query = supabase
      .from('blog_posts')
      .select('*');

    if (isId) {
      // If it's an ID, don't filter by status (for admin access)
      query = query.eq('id', parseInt(identifier));
      console.log('Backend: Querying by ID:', parseInt(identifier));
    } else {
      // If it's a slug, filter by published status (for public access)
      query = query.eq('slug', identifier).eq('status', 'published');
      console.log('Backend: Querying by slug:', identifier, 'with published status');
    }

    console.log('Backend: Executing Supabase query...');
    const { data, error } = await query.single();

    if (error) {
      console.error('Backend: Database error:', error);
      console.error('Backend: Error code:', error.code);
      console.error('Backend: Error message:', error.message);
      return res.status(404).json({ error: 'Blog post not found' });
    }

    if (!data) {
      console.log('Backend: No data returned from query');
      return res.status(404).json({ error: 'Blog post not found' });
    }

    console.log('Backend: Successfully found blog post:', data.id, data.title);
    res.json(data);
  } catch (error) {
    console.error('Backend: Error fetching blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new blog post (admin only)
router.post('/', auth, rbac(['admin']), async (req, res) => {
  try {
    const {
      title,
      subtitle,
      content,
      excerpt,
      category,
      author,
      featured,
      status
    } = req.body;

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Calculate read time
    const readTime = `${Math.ceil(content.split(' ').length / 200)} min read`;

    const supabase = createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title,
        subtitle,
        content,
        excerpt,
        category,
        author,
        slug,
        featured: featured || false,
        status: status || 'draft',
        read_time: readTime,
        created_by: req.user.id
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update blog post (admin only)
router.put('/:id', auth, rbac(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Regenerate slug if title changed
    if (updateData.title) {
      updateData.slug = updateData.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    }

    // Recalculate read time if content changed
    if (updateData.content) {
      updateData.read_time = `${Math.ceil(updateData.content.split(' ').length / 200)} min read`;
    }

    updateData.updated_at = new Date().toISOString();

    const supabase = createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete blog post (admin only)
router.delete('/:id', auth, rbac(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const supabase = createClient();

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;