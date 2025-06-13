'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import LandingHeader from '../../components/Layout/LandingHeader';
import LandingFooter from '../../components/Layout/LandingFooter';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/blog" className="group">
              <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Related Article</span>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium mb-3">
                    HIPAA Compliance
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-800 transition-colors">
                    HIPAA Training Requirements for 2025
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Stay ahead of compliance with the latest HIPAA training requirements...
                  </p>
                </div>
              </article>
            </Link>

            <Link href="/blog" className="group">
              <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Related Article</span>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium mb-3">
                    Best Practices
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-800 transition-colors">
                    Building a Culture of Privacy
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Learn how to transform HIPAA compliance from a burden into a competitive advantage...
                  </p>
                </div>
              </article>
            </Link>
          </div>
        </section>
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
      `}</style>
    </div>
  );
}