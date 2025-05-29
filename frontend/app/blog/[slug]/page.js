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

  // Sample article data - in a real app, this would come from an API
  const sampleArticles = {
    'introducing-hipaa-trainer': {
      id: 1,
      title: "Introducing HIPAA Trainer",
      subtitle: "An innovative AI-powered platform designed to transform your business operations and skyrocket productivity.",
      content: `
        <p>We're excited to unveil <strong>HIPAA Trainer</strong>, an innovative AI-powered platform designed to transform your business operations and skyrocket productivity.</p>

        <h2>The Challenge We're Addressing</h2>
        <p>In today's AI-driven world, healthcare organizations face several hurdles:</p>
        <ul>
          <li>Overwhelming HIPAA compliance requirements</li>
          <li>Inefficient staff training processes</li>
          <li>Difficulty in maintaining ongoing compliance</li>
        </ul>
        <p>HIPAA Trainer tackles these challenges head-on, offering a sophisticated AI solution that simplifies complex compliance processes.</p>

        <h2>Our Mission</h2>
        <ol>
          <li><strong>Accelerate Compliance Training:</strong> By leveraging AI to analyze your staff needs, we help you make informed training decisions faster.</li>
          <li><strong>Enhance Risk Management:</strong> Our advanced risk assessment tools provide accurate insights into future compliance trends.</li>
          <li><strong>Optimize Operations:</strong> With AI-driven recommendations, streamline your compliance processes effortlessly.</li>
        </ol>

        <h2>Core Capabilities</h2>
        <ul>
          <li><strong>AI-Powered Dashboard:</strong> Get real-time HIPAA compliance insights at a glance</li>
          <li><strong>Predictive Analytics:</strong> Forecast trends and make data-driven compliance decisions</li>
          <li><strong>Automated Risk Processing:</strong> Interact with your compliance data using simple language queries</li>
          <li><strong>Intelligent Reporting:</strong> Generate comprehensive reports with a single click</li>
          <li><strong>Customizable Training Modules:</strong> Tailor the AI to your specific healthcare industry needs</li>
        </ul>

        <h2>Why HIPAA Trainer Stands Out</h2>
        <blockquote>
          <p>"HIPAA Trainer has revolutionized our compliance approach. It's like having a crystal ball for our healthcare operations." - <em>Dr. Jane Smith, CTO of HealthTech</em></p>
        </blockquote>

        <p>Our AI solution isn't just a tool; it's your competitive edge. Here's how we compare:</p>

        <div class="comparison-table">
          <div class="table-header">
            <div class="feature-col">Feature</div>
            <div class="hipaa-trainer-col">HIPAA Trainer</div>
            <div class="traditional-col">Traditional Tools</div>
          </div>
          <div class="table-row">
            <div class="feature-col">AI-Powered Insights</div>
            <div class="hipaa-trainer-col">✅</div>
            <div class="traditional-col">❌</div>
          </div>
          <div class="table-row">
            <div class="feature-col">Predictive Capabilities</div>
            <div class="hipaa-trainer-col">✅</div>
            <div class="traditional-col">❌</div>
          </div>
          <div class="table-row">
            <div class="feature-col">Natural Language Queries</div>
            <div class="hipaa-trainer-col">✅</div>
            <div class="traditional-col">❌</div>
          </div>
        </div>

        <h2>Embarking on Your AI Journey</h2>
        <p>Getting started with HIPAA Trainer is seamless:</p>
        <ol>
          <li>Sign up for a demo</li>
          <li>Integrate your compliance data sources</li>
          <li>Start unlocking AI-driven insights</li>
        </ol>

        <p>Ready to transform your healthcare compliance? <a href="/landing#pricing" class="text-purple-600 hover:text-purple-800 font-medium">Start your free trial today</a> and experience the future of HIPAA compliance management.</p>
      `,
      author: "HIPAA Trainer Team",
      authorRole: "@hipaatrainer",
      date: "August 24, 2024",
      readTime: "8 min read",
      category: "Product Updates",
      image: "/api/placeholder/800/400"
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const foundArticle = sampleArticles[params.slug];
      setArticle(foundArticle);
      setLoading(false);
    }, 500);
  }, [params.slug]);

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/blog" className="hover:text-purple-600">Blog</Link>
            <span>›</span>
            <span className="text-gray-900">{article.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="mb-6">
            <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {article.subtitle}
            </p>
          )}

          {/* Author and Meta */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="text-left">
                <div className="text-gray-900 font-medium">{article.author}</div>
                <div className="text-gray-500">{article.authorRole}</div>
              </div>
            </div>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="h-64 md:h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-purple-600 font-medium">Featured Article Image</p>
            </div>
          </div>
        </div>

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
            Join thousands of healthcare organizations already using HIPAA Trainer to streamline their compliance processes.
          </p>
          <Link 
            href="/landing#pricing"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Free Trial
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