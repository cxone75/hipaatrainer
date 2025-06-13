
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hipaatrainer.com';
  
  const robotsTxt = `User-agent: *
Allow: /

# Blog
Allow: /blog/
Allow: /blog/*

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Disallow admin areas
Disallow: /app/admin/
Disallow: /api/
Disallow: /login
Disallow: /signup
Disallow: /onboarding

# Allow important pages
Allow: /hipaa-compliance
Allow: /contact
Allow: /privacy
Allow: /terms
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
