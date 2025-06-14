
export async function GET() {
  try {
    // Fetch all published blog posts
    const response = await fetch('http://0.0.0.0:3001/api/blog?status=published');
    const blogPosts = response.ok ? await response.json() : [];
    
    const baseUrl = 'https://hipaatrainer.net';
    
    // Static pages with better priorities and change frequencies
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/blog', priority: '0.9', changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/hipaa-compliance', priority: '0.9', changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/landing', priority: '0.8', changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/contact', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/faq', priority: '0.7', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/privacy', priority: '0.6', changefreq: 'yearly', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/terms', priority: '0.6', changefreq: 'yearly', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/signup', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/login', priority: '0.7', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
    ];
    
    // Blog categories for better SEO
    const blogCategories = [
      'Product Updates', 'HIPAA Compliance', 'Training', 'Risk Management', 
      'Policy Updates', 'Best Practices'
    ];
    
    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${blogCategories.map(category => `  <url>
    <loc>${baseUrl}/blog?category=${encodeURIComponent(category)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
${blogPosts.map(post => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at || post.created_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${post.featured_image ? `
    <image:image>
      <image:loc>${post.featured_image}</image:loc>
      <image:title>${post.title}</image:title>
      <image:caption>${post.excerpt}</image:caption>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
