
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3">
                <img 
                  src="/hipaatrainer-logo.png" 
                  alt="HIPAA Trainer" 
                  className="h-8 w-auto"
                />
                <span className="text-2xl font-bold text-purple-800">HIPAA TRAINER</span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/#solutions" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Solutions</Link>
              <Link href="/#features" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Features</Link>
              <Link href="/#pricing" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Pricing</Link>
              <Link href="/blog" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Blog</Link>
              <Link href="/login" className="text-gray-600 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Login</Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/#pricing"
              className="bg-purple-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-900 transition-colors shadow-md inline-block"
            >
              Start For Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-purple-800 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link href="/#solutions" className="text-gray-700 hover:text-purple-800 block px-3 py-2 text-base font-medium">Solutions</Link>
              <Link href="/#features" className="text-gray-700 hover:text-purple-800 block px-3 py-2 text-base font-medium">Features</Link>
              <Link href="/#pricing" className="text-gray-700 hover:text-purple-800 block px-3 py-2 text-base font-medium">Pricing</Link>
              <Link href="/blog" className="text-gray-700 hover:text-purple-800 block px-3 py-2 text-base font-medium">Blog</Link>
              <Link href="/login" className="text-gray-600 hover:text-purple-800 block px-3 py-2 text-base font-medium">Login</Link>
              <Link 
                href="/#pricing"
                className="block w-full bg-purple-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-900 transition-colors mt-4 text-center"
              >
                Start For Free
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
