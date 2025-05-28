'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-purple-800">HIPAA Trainer</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#solutions" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Solutions</a>
                <a href="#features" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#pricing" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
                <a href="#resources" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Resources</a>
                <Link href="/onboarding" className="text-gray-600 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Login</Link>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="bg-purple-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-900 transition-colors shadow-md">
                Start Free Trial
              </button>
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
                <a href="#solutions" className="text-gray-700 hover:text-purple-800 block px-3 py-2 text-base font-medium">Solutions</a>
                <a href="#features" className="text-gray-700 hover:text-purple-800 block px-3 py-2 text-base font-medium">Features</a>
                <a href="#pricing" className="text-gray-700 hover:text-purple-800 block px-3 py-2 text-base font-medium">Pricing</a>
                <a href="#resources" className="text-gray-700 hover:text-purple-800 block px-3 py-2 text-base font-medium">Resources</a>
                <Link href="/onboarding" className="text-gray-600 hover:text-purple-800 block px-3 py-2 text-base font-medium">Login</Link>
                <button className="w-full bg-purple-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-900 transition-colors mt-4">
                  Start Free Trial
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/5 to-pink-600/5"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Automate your HIPAA compliance
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Compliance Confidence for<br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Practices and Startups Alike</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Automate HIPAA training, policy updates, risk assessments & audit bundles—so dental offices, physician practices, healthtech startups, mental health clinics, and home healthcare agencies trade late-night spreadsheets for clear dashboards and real confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 text-lg shadow-lg transform hover:scale-105">
                Start Free for Individuals
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 text-lg">
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Free for individuals • Upgrade to teams/organizations at any time
            </p>
          </div>
        </div>
      </section>

      {/* Logo Strip */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm mb-8">Trusted by healthcare organizations worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 font-medium">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for Your Organization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're running a busy dental practice, a multi-physician clinic, launching a healthtech venture, managing a mental health program, or coordinating caregivers in home healthcare, HIPAA Trainer scales to your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🦷", title: "Dental Practices", desc: "Automate staff training and patient privacy compliance" },
              { icon: "🏥", title: "Medical Clinics", desc: "Track physician and nurse certifications effortlessly" },
              { icon: "💻", title: "Healthtech Startups", desc: "Integrate compliance into your development workflow" },
              { icon: "🧠", title: "Mental Health", desc: "Navigate telehealth PHI rules with confidence" },
              { icon: "🏠", title: "Home Healthcare", desc: "Coordinate compliance across distributed caregivers" },
              { icon: "⚕️", title: "All Healthcare", desc: "Comprehensive compliance for any healthcare organization" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works—Feature by Feature</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to maintain HIPAA compliance, automated and simplified.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                icon: "📊",
                title: "Compliance Dashboard",
                description: "Your new morning ritual: one glance tells you if your operation is green, amber, or red on every HIPAA requirement—no digging, no guesswork."
              },
              {
                icon: "⚡",
                title: "Automated Task Management", 
                description: "Auto-assign annual trainings, policy reviews, and risk reassessments—then sit back as the system nudges your team and tracks completions."
              },
              {
                icon: "👥",
                title: "Employee & Provider Management",
                description: "Add or import profiles for your team—track training progress and compliance status at a glance across all roles."
              },
              {
                icon: "🎓",
                title: "Bite-Size, Role-Specific Training",
                description: "10-minute modules tailored to different roles—complete with quizzes and instant certificates."
              },
              {
                icon: "🛡️",
                title: "Guided Risk Assessment Tool",
                description: "Step-by-step SRA flags vulnerabilities in your workflows—export prioritized remediation plans in minutes."
              },
              {
                icon: "🔔",
                title: "Real-Time Notifications & Reports",
                description: "Get pinged when someone finishes—or misses—a module. Pull completion reports in one click."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Benefits That Resonate</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Benefit</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">What You Feel</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">What Others Think</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["🧘 Calm & Clarity", "Sleep-easy confidence", "They've got compliance under lock-and-key."],
                    ["⏰ Time Back", "10+ hours free per month", "How are they so productive?"],
                    ["💰 Cost Savings", "$5K+ saved vs. consultants", "They did that for $30/mo?"],
                    ["💪 Team Empowerment", "Staff own their tasks", "Compliance is part of our culture now."],
                    ["📋 Audit-Ready in Minutes", "Two-click audit bundles", "Auditors impressed by your efficiency"]
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 font-medium text-purple-800">{row[0]}</td>
                      <td className="px-6 py-4 text-gray-900">{row[1]}</td>
                      <td className="px-6 py-4 text-gray-600 italic">"{row[2]}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose the plan that's right for you</h2>
            <p className="text-xl text-gray-600">Start free and scale as you grow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                plan: "Founding Member",
                price: "$297",
                period: "lifetime",
                popular: true,
                features: ["Up to 50 users", "All core features", "1-year money-back guarantee", "Priority support"]
              },
              {
                plan: "Early Bird",
                price: "$397",
                period: "lifetime", 
                popular: false,
                features: ["Up to 50 users", "All core features", "1-year money-back guarantee", "Standard support"]
              },
              {
                plan: "Regular",
                price: "$30",
                period: "/month",
                popular: false,
                features: ["First 10 users", "$20/mo per 10 additional", "All features", "Standard support"]
              }
            ].map((tier, index) => (
              <div key={index} className={`rounded-2xl p-8 ${tier.popular ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 relative' : 'bg-white border border-gray-200'} shadow-sm`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{tier.plan}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-600 ml-1">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  tier.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 shadow-lg transform hover:scale-105' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  {tier.popular ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to simplify your HIPAA compliance?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of healthcare organizations that trust HIPAA Trainer for their compliance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors text-lg">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Product</h3>
              <ul className="space-y-2">
                <li><a href="#solutions" className="text-gray-300 hover:text-white transition-colors">Solutions</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">HIPAA Compliance</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">&copy; 2024 HIPAA Trainer. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <span className="text-2xl font-bold text-purple-400">HIPAA Trainer</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}