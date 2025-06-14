
export async function GET() {
  try {
    // Fetch all published blog posts
    const response = await fetch('http://0.0.0.0:3001/api/blog?status=published');
    const blogPosts = response.ok ? await response.json() : [];
    
    const baseUrl = 'https://hipaatrainer.net';
    
    // Generate RSS XML
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HIPAA Trainer Blog - Healthcare Compliance Insights</title>
    <description>Expert insights, best practices, and regulatory updates for healthcare compliance and HIPAA training. Stay informed with the latest privacy protection strategies.</description>
    <link>${baseUrl}/blog</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>HIPAA Trainer</generator>
    <image>
      <url>${baseUrl}/hipaatrainer-logo.png</url>
      <title>HIPAA Trainer Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
${blogPosts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <author>noreply@hipaatrainer.net (${post.author})</author>
      <category><![CDATA[${post.category}]]></category>
      ${post.featured_image ? `<enclosure url="${post.featured_image}" type="image/jpeg"/>` : ''}
      <content:encoded><![CDATA[${post.content || post.excerpt}]]></content:encoded>
    </item>`).join('\n')}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('RSS feed generation error:', error);
    return new Response('RSS feed temporarily unavailable', { status: 500 });
  }
}
