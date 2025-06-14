
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import LandingHeader from '../components/Layout/LandingHeader';
import LandingFooter from '../components/Layout/LandingFooter';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Product Updates', 'HIPAA Compliance', 'Training', 'Risk Management', 'Policy Updates', 'Best Practices'];

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog?status=published');

      if (response.ok) {
        const data = await response.json();
        const formattedPosts = data.map(post => ({
          ...post,
          date: new Date(post.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        }));
        setBlogPosts(formattedPosts);
      } else {
        console.error('Failed to fetch blog posts');
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleNewsletterSubscription = async (e) => {
    e.preventDefault();

    if (!newsletterEmail) {
      setSubscriptionMessage('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setSubscriptionMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (response.ok) {
        setSubscriptionMessage('Successfully subscribed to our newsletter!');
        setNewsletterEmail('');
      } else if (response.status === 409) {
        setSubscriptionMessage('You are already subscribed to our newsletter.');
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        setSubscriptionMessage(errorData.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscriptionMessage('Failed to subscribe. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "HIPAA Compliance Blog - Expert Healthcare Privacy Insights",
    "description": "Comprehensive HIPAA compliance blog featuring expert insights, regulatory updates, best practices, and training resources for healthcare organizations ensuring patient privacy protection.",
    "url": "https://hipaatrainer.net/blog",
    "inLanguage": "en-US",
    "about": {
      "@type": "Thing",
      "name": "HIPAA Compliance"
    },
    "keywords": "HIPAA compliance, healthcare privacy, medical data security, patient privacy, healthcare regulations, HIPAA training, compliance best practices, healthcare security, PHI protection",
    "publisher": {
      "@type": "Organization",
      "name": "HIPAA Trainer",
      "url": "https://hipaatrainer.net",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hipaatrainer.net/hipaatrainer-logo.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": "https://hipaatrainer.net/contact"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": blogPosts.length,
      "itemListElement": blogPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "url": `https://hipaatrainer.net/blog/${post.slug}`,
          "datePublished": post.created_at,
          "dateModified": post.updated_at || post.created_at,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "HIPAA Trainer",
            "logo": {
              "@type": "ImageObject",
              "url": "https://hipaatrainer.net/hipaatrainer-logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://hipaatrainer.net/blog/${post.slug}`
          },
          "articleSection": post.category,
          "keywords": `HIPAA compliance, ${post.category.toLowerCase()}, healthcare privacy, medical security, patient data protection`,
          "image": post.featured_image || "https://hipaatrainer.net/hipaatrainer-logo.png",
          "wordCount": post.content ? post.content.split(' ').length : 0
        }
      }))
    }
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://hipaatrainer.net"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "HIPAA Compliance Blog",
        "item": "https://hipaatrainer.net/blog"
      }
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>HIPAA Compliance Blog - Loading...</title>
          <meta name="robots" content="noindex" />
        </Head>
        <LandingHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="h-32 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <LandingFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>HIPAA Compliance Blog | Expert Healthcare Privacy Insights & Training Resources - HIPAA Trainer</title>
        <meta name="description" content="Comprehensive HIPAA compliance blog with expert insights, regulatory updates, best practices, and training resources for healthcare organizations. Stay compliant with the latest privacy protection strategies and security guidelines." />
        <meta name="keywords" content="HIPAA compliance blog, healthcare privacy insights, medical data security, patient privacy protection, HIPAA training resources, healthcare regulations, compliance best practices, PHI security, healthcare audits, HIPAA certification, medical compliance updates" />
        <meta name="author" content="HIPAA Trainer Team" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="HIPAA Compliance Blog | Expert Healthcare Privacy Insights - HIPAA Trainer" />
        <meta property="og:description" content="Expert insights, regulatory updates, and best practices for healthcare compliance. Comprehensive resources for HIPAA training and privacy protection." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hipaatrainer.net/blog" />
        <meta property="og:site_name" content="HIPAA Trainer" />
        <meta property="og:image" content="https://hipaatrainer.net/hipaatrainer-logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="HIPAA Trainer Blog - Healthcare Compliance Insights" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hipaatrainer" />
        <meta name="twitter:creator" content="@hipaatrainer" />
        <meta name="twitter:title" content="HIPAA Compliance Blog | Expert Healthcare Privacy Insights" />
        <meta name="twitter:description" content="Expert insights, regulatory updates, and best practices for healthcare compliance and privacy protection." />
        <meta name="twitter:image" content="https://hipaatrainer.net/hipaatrainer-logo.png" />
        <meta name="twitter:image:alt" content="HIPAA Trainer Blog" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="application-name" content="HIPAA Trainer Blog" />
        <meta name="apple-mobile-web-app-title" content="HIPAA Trainer Blog" />
        <meta httpEquiv="Content-Language" content="en-US" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Canonical and Alternate URLs */}
        <link rel="canonical" href="https://hipaatrainer.net/blog" />
        <link rel="alternate" type="application/rss+xml" title="HIPAA Trainer Blog RSS Feed" href="https://hipaatrainer.net/blog/rss.xml" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
      </Head>

      <LandingHeader />

      {/* SEO-Optimized Hero Section */}
      <header className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            HIPAA Compliance Blog: Expert Healthcare Privacy Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Comprehensive healthcare compliance insights, regulatory updates, and HIPAA training resources. 
            Expert guidance for healthcare organizations ensuring patient privacy protection and data security.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span className="bg-white px-3 py-1 rounded-full">Healthcare Compliance</span>
            <span className="bg-white px-3 py-1 rounded-full">HIPAA Training</span>
            <span className="bg-white px-3 py-1 rounded-full">Privacy Protection</span>
            <span className="bg-white px-3 py-1 rounded-full">Security Best Practices</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        {selectedCategory === 'All' && featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow" itemScope itemType="https://schema.org/BlogPosting">
                  {post.image && (
                    <div className="h-48 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-medium">Featured Article</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium" itemProp="articleSection">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm ml-3">{post.read_time}</span>
                    </div>
                    <Link href={post.slug ? `/blog/${post.slug}` : '/blog'}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-800 transition-colors cursor-pointer" itemProp="headline">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4" itemProp="description">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-purple-600 text-xs font-bold">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900" itemProp="name">{post.author}</div>
                          <time className="text-xs text-gray-500" itemProp="datePublished" dateTime={post.created_at}>{post.date}</time>
                        </div>
                      </div>
                      <Link href={post.slug ? `/blog/${post.slug}` : '/blog'} className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Blog Statistics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{blogPosts.length}</div>
              <div className="text-sm text-gray-600">Expert Articles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Topic Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{featuredPosts.length}</div>
              <div className="text-sm text-gray-600">Featured Insights</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">Updated Weekly</div>
              <div className="text-sm text-gray-600">Fresh Content</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <nav className="mb-8" aria-label="Blog categories">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Topic</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                }`}
                aria-pressed={selectedCategory === category}
                title={`View ${category === 'All' ? 'all' : category} articles`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-2 text-xs opacity-75">
                    ({blogPosts.filter(post => post.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* All Posts Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow" itemScope itemType="https://schema.org/BlogPosting">
                {post.image && (
                  <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Article Image</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium" itemProp="articleSection">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm ml-3">{post.read_time}</span>
                  </div>
                  <Link href={post.slug ? `/blog/${post.slug}` : '/blog'}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-purple-800 transition-colors cursor-pointer" itemProp="headline">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4" itemProp="description">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-purple-600 text-xs font-bold">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-900" itemProp="name">{post.author}</div>
                        <time className="text-xs text-gray-500" itemProp="datePublished" dateTime={post.created_at}>{post.date}</time>
                      </div>
                    </div>
                    <Link href={post.slug ? `/blog/${post.slug}` : '/blog'} className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <aside className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Ahead in HIPAA Compliance</h3>
          <p className="text-lg mb-2 opacity-90">
            Join 10,000+ healthcare professionals receiving expert insights
          </p>
          <p className="text-base mb-6 opacity-80">
            Weekly regulatory updates, compliance tips, and exclusive training resources delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubscription} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-4">
            <label htmlFor="newsletter-email" className="sr-only">Email address for HIPAA compliance updates</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              disabled={isSubmitting}
              required
              aria-describedby="newsletter-description"
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Subscribe to HIPAA compliance newsletter"
            >
              {isSubmitting ? 'Subscribing...' : 'Get Updates'}
            </button>
          </form>
          <p id="newsletter-description" className="text-xs opacity-75">
            Free newsletter • No spam • Unsubscribe anytime • Privacy-first approach
          </p>
          {subscriptionMessage && (
            <p className={`mt-4 text-sm ${subscriptionMessage.includes('Successfully') ? 'text-green-200' : 'text-red-200'}`} role="status" aria-live="polite">
              {subscriptionMessage}
            </p>
          )}
        </aside>
      </main>

      <LandingFooter />
    </div>
  );
}
