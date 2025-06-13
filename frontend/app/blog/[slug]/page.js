
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useParams } from 'next/navigation';
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
            <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow" itemScope itemType="https://schema.org/BlogPosting">
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
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium mb-3" itemProp="articleSection">
                  {post.category}
                </span>
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-800 transition-colors" itemProp="headline">
                  {post.title}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2" itemProp="description">
                  {post.excerpt}
                </p>
                <div className="flex items-center mt-3 text-xs text-gray-500" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{post.author}</span>
                  <span className="mx-2">•</span>
                  <time itemProp="datePublished" dateTime={post.created_at}>{post.date}</time>
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

  // Generate structured data for the article
  const structuredData = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.featured_image || "https://hipaatrainer.net/hipaatrainer-logo.png",
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "HIPAA Trainer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hipaatrainer.net/hipaatrainer-logo.png"
      }
    },
    "datePublished": article.created_at,
    "dateModified": article.updated_at || article.created_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://hipaatrainer.net/blog/${article.slug}`
    },
    "articleSection": article.category,
    "keywords": `HIPAA, compliance, healthcare, ${article.category.toLowerCase()}, privacy, security`,
    "wordCount": article.content ? article.content.split(' ').length : 0,
    "articleBody": article.content
  } : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Head>
          <title>Loading Article... - HIPAA Trainer</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Head>
          <title>Article Not Found - HIPAA Trainer</title>
          <meta name="description" content="The requested article could not be found. Browse our HIPAA compliance blog for expert insights and best practices." />
          <meta name="robots" content="noindex" />
        </Head>
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
        <title>{article.title} - HIPAA Trainer Blog</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={`HIPAA compliance, healthcare privacy, ${article.category.toLowerCase()}, ${article.title.toLowerCase()}`} />
        <meta name="author" content={article.author} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hipaatrainer.net/blog/${article.slug}`} />
        <meta property="og:site_name" content="HIPAA Trainer" />
        <meta property="og:image" content={article.featured_image || "https://hipaatrainer.net/hipaatrainer-logo.png"} />
        <meta property="article:author" content={article.author} />
        <meta property="article:published_time" content={article.created_at} />
        <meta property="article:modified_time" content={article.updated_at || article.created_at} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.featured_image || "https://hipaatrainer.net/hipaatrainer-logo.png"} />
        <link rel="canonical" href={`https://hipaatrainer.net/blog/${article.slug}`} />
        {structuredData && (
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
      </Head>

      <LandingHeader />

      {/* Article Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/blog" className="hover:text-purple-600">Blog</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-gray-900" aria-current="page">{article.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
          )}
          <div className="flex items-center text-gray-500 text-sm">
            <span>By {article.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={article.created_at}>{article.date}</time>
            <span className="mx-2">•</span>
            <span>{article.read_time}</span>
          </div>
        </header>

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
        <article className="prose prose-lg prose-purple max-w-none" itemScope itemType="https://schema.org/BlogPosting">
          <meta itemProp="headline" content={article.title} />
          <meta itemProp="description" content={article.excerpt} />
          <meta itemProp="datePublished" content={article.created_at} />
          <meta itemProp="dateModified" content={article.updated_at || article.created_at} />
          <div itemProp="author" itemScope itemType="https://schema.org/Person">
            <meta itemProp="name" content={article.author} />
          </div>
          <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
            <meta itemProp="name" content="HIPAA Trainer" />
          </div>
          <div 
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="article-content"
            itemProp="articleBody"
          />
        </article>

        {/* Call to Action */}
        <aside className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
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
        </aside>

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
