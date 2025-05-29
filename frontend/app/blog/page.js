'use client';

import { useState } from 'react';
import Link from 'next/link';
import LandingHeader from '../components/Layout/LandingHeader';
import LandingFooter from '../components/Layout/LandingFooter';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Product Updates', 'HIPAA Compliance', 'Training', 'Risk Management', 'Policy Updates', 'Best Practices'];

  const blogPosts = [
    {
      id: 0,
      title: "Introducing HIPAA Trainer",
      excerpt: "An innovative AI-powered platform designed to transform your business operations and skyrocket productivity.",
      category: "Product Updates",
      author: "HIPAA Trainer Team",
      date: "August 24, 2024",
      readTime: "8 min read",
      featured: true,
      image: "/api/placeholder/600/300",
      slug: "introducing-hipaa-trainer"
    },
    {
      id: 1,
      title: "HIPAA Training Requirements for 2025: What Healthcare Organizations Need to Know",
      excerpt: "Stay ahead of compliance with the latest HIPAA training requirements and best practices for your healthcare team.",
      category: "HIPAA Compliance",
      author: "Dr. Sarah Johnson",
      date: "December 15, 2024",
      readTime: "8 min read",
      featured: true,
      image: "/api/placeholder/600/300"
    },
    {
      id: 2,
      title: "Building a Culture of Privacy: Beyond Compliance Checkboxes",
      excerpt: "Learn how to transform HIPAA compliance from a burden into a competitive advantage for your healthcare organization.",
      category: "Best Practices",
      author: "Michael Chen",
      date: "December 10, 2024",
      readTime: "6 min read",
      featured: true,
      image: "/api/placeholder/600/300"
    },
    {
      id: 3,
      title: "Risk Assessment Automation: Streamlining HIPAA Security Evaluations",
      excerpt: "Discover how automated risk assessments can save time while improving the accuracy of your HIPAA security evaluations.",
      category: "Risk Management",
      author: "Jennifer Martinez",
      date: "December 5, 2024",
      readTime: "10 min read",
      featured: false,
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Common HIPAA Violations and How to Prevent Them",
      excerpt: "Understand the most frequent HIPAA violations in healthcare and implement strategies to protect your organization.",
      category: "HIPAA Compliance",
      author: "Dr. Robert Kim",
      date: "November 28, 2024",
      readTime: "7 min read",
      featured: false,
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Employee Training ROI: Measuring the Impact of HIPAA Education",
      excerpt: "Learn how to measure and maximize the return on investment from your HIPAA training programs.",
      category: "Training",
      author: "Lisa Thompson",
      date: "November 20, 2024",
      readTime: "5 min read",
      featured: false,
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "2025 HIPAA Policy Updates: What You Need to Review",
      excerpt: "Stay current with the latest HIPAA policy changes and ensure your organization remains compliant.",
      category: "Policy Updates",
      author: "David Wilson",
      date: "November 15, 2024",
      readTime: "9 min read",
      featured: false,
      image: "/api/placeholder/400/250"
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            HIPAA Compliance Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert insights, best practices, and the latest updates in healthcare compliance and privacy protection.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        {selectedCategory === 'All' && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                    <span className="text-purple-600 text-sm font-medium">Featured Article</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm ml-3">{post.readTime}</span>
                    </div>
                    <Link href={post.slug ? `/blog/${post.slug}` : '/blog'}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-800 transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-purple-600 text-xs font-bold">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.date}</div>
                        </div>
                      </div>
                      <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* All Posts Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Article Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm ml-3">{post.readTime}</span>
                  </div>
                  <Link href={post.slug ? `/blog/${post.slug}` : '/blog'}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-purple-800 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-purple-600 text-xs font-bold">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-900">{post.author}</div>
                        <div className="text-xs text-gray-500">{post.date}</div>
                      </div>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                      Read →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated on HIPAA Compliance</h3>
          <p className="text-lg mb-6 opacity-90">
            Get the latest insights, best practices, and regulatory updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>

      <LandingFooter />
    </div>
  );
}