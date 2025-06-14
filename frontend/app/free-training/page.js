
'use client';

import LandingHeader from '../components/Layout/LandingHeader';
import LandingFooter from '../components/Layout/LandingFooter';
import Link from 'next/link';
import { useState } from 'react';

export default function FreeTrainingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFreeTrainingSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual signup logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitted(true);
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Free HIPAA Training to Get Started
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
                Start your HIPAA compliance journey with our free introductory course. Get the fundamentals 
                you need to understand HIPAA requirements and protect patient information in just 15 minutes.
              </p>
              
              {/* Free Training Signup Form */}
              {!submitted ? (
                <form onSubmit={handleFreeTrainingSignup} className="max-w-md mx-auto mb-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Starting...' : 'Start Free Training'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    No credit card required • Instant access • Takes only 15 minutes
                  </p>
                </form>
              ) : (
                <div className="max-w-md mx-auto mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Welcome to HIPAA 101!</h3>
                      <p className="text-green-700">Check your email to start your free training.</p>
                    </div>
                  </div>
                </div>
              )}

              <Link
                href="/pricing"
                className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
              >
                Or upgrade to full access →
              </Link>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Included in Your Free Training</h2>
              <p className="text-xl text-gray-600">
                Get started with HIPAA fundamentals at no cost
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Course Features */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Free HIPAA 101</h3>
                  <p className="text-gray-600">Perfect for getting started</p>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>15-minute video training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Interactive knowledge quiz</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>HIPAA basics overview</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Instant access</span>
                  </li>
                  <li className="flex items-center space-x-3 opacity-50">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="line-through">No certificate</span>
                  </li>
                </ul>

                <div className="mt-8 text-center">
                  <p className="text-3xl font-bold text-gray-900">Free</p>
                  <p className="text-gray-600">Forever</p>
                </div>
              </div>

              {/* Paid Plan Upsell */}
              <div className="bg-purple-600 text-white rounded-xl p-8 relative">
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Basic Plan</h3>
                  <p className="text-purple-100">Complete certification package</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Everything in free training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Official HIPAA certificate</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Policy review guidance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Compliance tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Email support</span>
                  </li>
                </ul>

                <div className="text-center mb-6">
                  <p className="text-3xl font-bold">$19.99</p>
                  <p className="text-purple-100">One-time payment</p>
                </div>

                <Link
                  href="/pricing"
                  className="block w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-100 transition-colors"
                >
                  Upgrade to Full Access
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Start with Free HIPAA Training?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Build your compliance foundation with our proven approach used by thousands of healthcare professionals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Start</h3>
                <p className="text-gray-600">
                  Get up to speed with HIPAA basics in just 15 minutes. Perfect for busy healthcare professionals.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Risk</h3>
                <p className="text-gray-600">
                  Try our training approach completely free. No credit card required, no commitment.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Method</h3>
                <p className="text-gray-600">
                  Our training methodology has helped thousands achieve HIPAA compliance effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Continue Your HIPAA Learning Journey
              </h2>
              <p className="text-xl text-gray-600">
                Explore more resources to build comprehensive HIPAA compliance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/certification" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">HIPAA Certification</h3>
                <p className="text-gray-600 mb-4">
                  Get officially certified with our comprehensive HIPAA training programs.
                </p>
                <span className="text-purple-600 font-medium hover:text-purple-800">
                  Learn more →
                </span>
              </Link>

              <Link href="/blog/free-vs-paid-hipaa-training" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Free vs Paid Training</h3>
                <p className="text-gray-600 mb-4">
                  Understand the differences between free and paid HIPAA training options.
                </p>
                <span className="text-purple-600 font-medium hover:text-purple-800">
                  Read article →
                </span>
              </Link>

              <Link href="/pricing" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">View All Plans</h3>
                <p className="text-gray-600 mb-4">
                  Compare all our training plans and find the right fit for your organization.
                </p>
                <span className="text-purple-600 font-medium hover:text-purple-800">
                  View pricing →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-800 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Free HIPAA Training?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of healthcare professionals who started their compliance journey with our free course.
            </p>
            {!submitted ? (
              <form onSubmit={handleFreeTrainingSignup} className="max-w-md mx-auto mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-purple-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Starting...' : 'Start Free Training'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mb-6">
                <p className="text-lg text-green-200">✓ Check your email to access your free training!</p>
              </div>
            )}
            <p className="text-sm text-purple-200">
              No credit card required • Instant access • Upgrade anytime
            </p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
