'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import LandingHeader from '../../components/Layout/LandingHeader';
import LandingFooter from '../../components/Layout/LandingFooter';

function RelatedArticles({ currentArticle }) {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentArticle) {
      fetchRelatedArticles();
    }
  }, [currentArticle]);

  const fetchRelatedArticles = async () => {
    try {
      const response = await fetch(`/api/blog?status=published&category=${encodeURIComponent(currentArticle.category)}`);

      if (response.ok) {
        const data = await response.json();
        // Filter out the current article and limit to 2 related articles
        const filtered = data
          .filter(post => post.id !== currentArticle.id)
          .slice(0, 2)
          .map(post => ({
            ...post,
            date: new Date(post.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          }));
        setRelatedArticles(filtered);
      }
    } catch (error) {
      console.error('Error fetching related articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-32 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (relatedArticles.length === 0) {
    return (
      <section className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
        <div className="text-center py-8">
          <p className="text-gray-600">No related articles found.</p>
          <Link href="/blog" className="text-purple-600 hover:text-purple-800 font-medium">
            Browse all articles →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedArticles.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {post.featured_image ? (
                <div className="h-32 overflow-hidden">
                  <img 
                    src={post.featured_image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Related Article</span>
                </div>
              )}
              <div className="p-6">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium mb-3">
                  {post.category}
                </span>
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-800 transition-colors">
                  {post.title}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center mt-3 text-xs text-gray-500">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function BlogArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [params.slug]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/blog/${params.slug}`);

      if (response.ok) {
        const data = await response.json();
        const formattedArticle = {
          ...data,
          date: new Date(data.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          authorRole: "@hipaatrainer"
        };
        setArticle(formattedArticle);
      } else {
        setArticle(null);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  // SEO metadata generation
  const generateMetadata = (article) => {
    if (!article) return null;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hipaatrainer.com';
    const articleUrl = `${siteUrl}/blog/${article.slug}`;
    const imageUrl = article.image_url || `${siteUrl}/hipaatrainer-logo.png`;

    return {
      title: `${article.title} | HIPAA Trainer Blog`,
      description: article.excerpt || article.subtitle,
      canonical: articleUrl,
      openGraph: {
        title: article.title,
        description: article.excerpt || article.subtitle,
        url: articleUrl,
        type: 'article',
        image: imageUrl,
        site_name: 'HIPAA Trainer',
        article: {
          published_time: article.created_at,
          modified_time: article.updated_at,
          author: article.author,
          section: article.category,
          tag: [article.category, 'HIPAA', 'Healthcare Compliance']
        }
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt || article.subtitle,
        image: imageUrl
      },
      structuredData: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.excerpt || article.subtitle,
        "image": imageUrl,
        "author": {
          "@type": "Person",
          "name": article.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "HIPAA Trainer",
          "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/hipaatrainer-logo.png`
          }
        },
        "datePublished": article.created_at,
        "dateModified": article.updated_at,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": articleUrl
        }
      }
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LandingHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <LandingFooter />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
       <Head>
        {generateMetadata(article) && (
          <>
            <title>{generateMetadata(article).title}</title>
            <meta name="description" content={generateMetadata(article).description} />
            <link rel="canonical" href={generateMetadata(article).canonical} />
            {/* Open Graph meta tags */}
            <meta property="og:title" content={generateMetadata(article).openGraph.title} />
            <meta property="og:description" content={generateMetadata(article).openGraph.description} />
            <meta property="og:url" content={generateMetadata(article).openGraph.url} />
            <meta property="og:type" content={generateMetadata(article).openGraph.type} />
            <meta property="og:image" content={generateMetadata(article).openGraph.image} />
            <meta property="og:site_name" content={generateMetadata(article).openGraph.site_name} />
            {/* Twitter meta tags */}
            <meta name="twitter:card" content={generateMetadata(article).twitter.card} />
            <meta name="twitter:title" content={generateMetadata(article).twitter.title} />
            <meta name="twitter:description" content={generateMetadata(article).twitter.description} />
            <meta name="twitter:image" content={generateMetadata(article).twitter.image} />
            {/* Structured data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(generateMetadata(article).structuredData) }}
            />
          </>
        )}
      </Head>
      <LandingHeader />

      {/* Article Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/blog" className="hover:text-purple-600">Blog</Link>
            <span>›</span>
            <span className="text-gray-900">{article.title}</span>
          </div>
        </nav>

        {/* Featured Image - Only show if image exists */}
        {article.featured_image && (
          <div className="mb-12">
            <div className="h-64 md:h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src={article.featured_image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-lg prose-purple max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="article-content"
          />
        </article>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your HIPAA Compliance?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join healthcare organizations waiting to use HIPAATRAINER.NET to streamline their compliance processes.
          </p>
          <Link 
            href="/#pricing"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start for Free
          </Link>
        </div>

        {/* Related Articles */}
        <RelatedArticles currentArticle={article} />
      </main>

      <LandingFooter />

      <style jsx>{`
        .article-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .article-content p {
          margin-bottom: 1rem;
          line-height: 1.7;
          color: #374151;
        }

        .article-content ul, .article-content ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .article-content blockquote {
          border-left: 4px solid #7c3aed;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
          background: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
        }

        .article-content strong {
          font-weight: 600;
          color: #1f2937;
        }

        .comparison-table {
          margin: 2rem 0;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          background: #f9fafb;
          font-weight: 600;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          border-top: 1px solid #e5e7eb;
        }

        .feature-col, .hipaa-trainer-col, .traditional-col {
          padding: 0.75rem 1rem;
        }

        .hipaa-trainer-col, .traditional-col {
          text-align: center;
        }

        .article-content a {
          color: #7c3aed;
          text-decoration: none;
        }

        .article-content a:hover {
          color: #5b21b6;
          text-decoration: underline;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}