
export async function GET() {
  try {
    // Fetch all published blog posts
    const response = await fetch('http://0.0.0.0:3001/api/blog?status=published');
    const blogPosts = response.ok ? await response.json() : [];
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hipaatrainer.com';
    
    // Static pages
    const staticPages = [
      { url: '', changefreq: 'daily', priority: '1.0' },
      { url: '/blog', changefreq: 'daily', priority: '0.9' },
      { url: '/hipaa-compliance', changefreq: 'weekly', priority: '0.8' },
      { url: '/contact', changefreq: 'monthly', priority: '0.7' },
      { url: '/privacy', changefreq: 'monthly', priority: '0.5' },
      { url: '/terms', changefreq: 'monthly', priority: '0.5' },
    ];
    
    // Dynamic blog post pages
    const blogPages = blogPosts.map(post => ({
      url: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: post.updated_at || post.created_at
    }));
    
    const allPages = [...staticPages, ...blogPages];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${new Date(page.lastmod).toISOString()}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
