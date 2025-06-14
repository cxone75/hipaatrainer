
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Disallow admin and internal pages
Disallow: /app/admin/
Disallow: /app/settings/
Disallow: /api/
Disallow: /onboarding/
Disallow: /login/
Disallow: /signup/

# Allow important pages
Allow: /blog/
Allow: /hipaa-compliance/
Allow: /contact/
Allow: /faq/

# Crawl delay
Crawl-delay: 1

# Sitemap location
Sitemap: https://hipaatrainer.net/sitemap.xml

# Host
Host: https://hipaatrainer.net`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
