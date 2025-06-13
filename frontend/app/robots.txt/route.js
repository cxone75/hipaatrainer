
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://hipaatrainer.net/sitemap.xml

# Disallow admin areas
Disallow: /app/
Disallow: /api/
Disallow: /onboarding

# Allow important pages
Allow: /blog
Allow: /landing
Allow: /contact
Allow: /faq
Allow: /hipaa-compliance
Allow: /privacy
Allow: /terms

# Crawl delay (optional)
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
