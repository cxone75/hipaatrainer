
export async function GET() {
  try {
    // Fetch all published blog posts
    const response = await fetch('http://0.0.0.0:3001/api/blog?status=published');
    const blogPosts = response.ok ? await response.json() : [];
    
    const baseUrl = 'https://hipaatrainer.net';
    
    // Static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/landing', priority: '0.9', changefreq: 'weekly' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
      { url: '/faq', priority: '0.7', changefreq: 'monthly' },
      { url: '/hipaa-compliance', priority: '0.8', changefreq: 'weekly' },
      { url: '/privacy', priority: '0.6', changefreq: 'yearly' },
      { url: '/terms', priority: '0.6', changefreq: 'yearly' },
    ];
    
    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${blogPosts.map(post => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at || post.created_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
