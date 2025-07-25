'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LandingHeader from '../components/Layout/LandingHeader';
import LandingFooter from '../components/Layout/LandingFooter';
import { BorderBeam } from '../components/ui/border-beam';
import { FeaturesSectionWithHoverEffects } from '../components/ui/feature-section-with-hover-effects';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Fixed target date: 90 days from June 1st, 2025
    const startDate = new Date('2025-06-01');
    const targetDate = new Date(startDate);
    targetDate.setDate(targetDate.getDate() + 90);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setCountdown({
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        });
      } else {
        setCountdown("Offer expired!");
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Set up interval to update every second
    const intervalId = setInterval(calculateTimeLeft, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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


  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/5 to-pink-600/5"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              From Compliance Chaos<br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">to Complete Control</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Automate HIPAA training, policy updates, risk assessments & audit bundles—so you trade late-night spreadsheets for clear dashboards and real confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={scrollToPricing}
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 text-lg shadow-lg transform hover:scale-105"
              >
                Start For Free
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 text-lg">
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Free for small teams • Upgrade at any time
            </p>
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See Your Compliance at a Glance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intuitive dashboard gives you real-time visibility into your organization's HIPAA compliance status
            </p>
          </div>
          <div className="relative max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 shadow-2xl">
              <img 
                src="/attached_assets/Screenshot 2025-05-28 171920.png" 
                alt="HIPAA Trainer Dashboard Preview" 
                className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
              />
              <BorderBeam size={300} duration={10} delay={2} />
            </div>
          </div>
        </div>
      </section>

      {/* Logo Strip */}
      {/*<section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
*/}
      {/* Who We Serve */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for Your Organization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're running a busy dental practice, a multi-physician clinic, or launching a healthtech venture, HIPAA Trainer scales to your team.
            </p>
          </div>

          <FeaturesSectionWithHoverEffects />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works—Feature by Feature</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform simplifies compliance with powerful, easy-to-use features designed specifically for healthcare teams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Compliance Dashboard */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Compliance Dashboard</h3>
              </div>
              <p className="text-gray-600">
                Your new morning ritual: one glance at your dashboard tells you if you're green, amber, or red on every HIPAA requirement—no digging, no guesswork.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="bg-gray-800 text-white text-sm font-medium p-2 rounded-t mb-4">
                  📊 Compliance Status
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-gray-600 text-sm">Training</div>
                    <div className="text-green-600 font-bold text-lg">100%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600 text-sm">Policies</div>
                    <div className="text-yellow-600 font-bold text-lg">92%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600 text-sm">Audits</div>
                    <div className="text-green-600 font-bold text-lg">100%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{width: '95%'}}></div>
                </div>
                <div className="text-center text-green-600 font-medium mt-2">95% Overall Compliance</div>
              </div>
            </div>

            {/* Automated Task Management */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Automated Task Management</h3>
              </div>
              <p className="text-gray-600">
                Auto-assign annual trainings, policy reviews, and risk re-assessments—then sit back as the system nudges your team and tracks completions.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="bg-gray-800 text-white text-sm font-medium p-2 rounded-t mb-4">
                  📋 Task Manager
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-500">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" checked className="text-green-600" readOnly />
                      <span className="text-sm">Annual Privacy Training - Dr. Thompson</span>
                    </div>
                    <span className="text-green-600 text-xs font-medium">Complete</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-yellow-500">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="text-yellow-600" readOnly />
                      <span className="text-sm">Security Risk Assessment Review</span>
                    </div>
                    <span className="text-yellow-600 text-xs font-medium">Due in 3 days</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-red-500">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="text-red-600" readOnly />
                      <span className="text-sm">Update BAA - Cloud Storage Vendor</span>
                    </div>
                    <span className="text-red-600 text-xs font-medium">Overdue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Employee Management */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Employee Management</h3>
              </div>
              <p className="text-gray-600">
                Add individual employee profiles—track training progress, view each employee's compliance status at a glance and delegate reminders.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="bg-gray-800 text-white text-sm font-medium p-2 rounded-t mb-4">
                  👥 Employee Status
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xs font-bold">JD</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Jane Doe, MD</div>
                        <div className="text-gray-500 text-xs">Physician</div>
                      </div>
                    </div>
                    <span className="text-green-600 text-xs font-medium">Compliant</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-xs font-bold">MS</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Mike Smith</div>
                        <div className="text-gray-500 text-xs">IT Admin</div>
                      </div>
                    </div>
                    <span className="text-yellow-600 text-xs font-medium">Training Due</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bite-Size Training */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Bite-Size, Role-Specific Training</h3>
              </div>
              <p className="text-gray-600">
                Short videos created for CTOs, practice directors, and clinical staff—complete with built-in quizzes and instant certificates.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="bg-gray-800 text-white text-sm font-medium p-2 rounded-t mb-4">
                  🎓 Training Portal
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-xs">💻</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">HIPAA for Developers</div>
                        <div className="text-gray-500 text-xs">10 min | For technical teams</div>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white text-xs px-3 py-1 rounded">Start</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-xs">🏥</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Patient Privacy Basics</div>
                        <div className="text-gray-500 text-xs">8 min | For clinical staff</div>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white text-xs px-3 py-1 rounded">Start</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    [
                      {
                        icon: (
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        ),
                        text: "Calm & Clarity"
                      },
                      "Sleep-easy confidence", 
                      "They've got compliance under lock-and-key."
                    ],
                    [
                      {
                        icon: (
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        ),
                        text: "Time Back"
                      },
                      "10+ hours free per month", 
                      "How are they so productive?"
                    ],
                    [
                      {
                        icon: (
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                        ),
                        text: "Cost Savings"
                      },
                      "$5K+ saved vs. consultants", 
                      "They did that for $30/mo?"
                    ],
                    [
                      {
                        icon: (
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                        ),
                        text: "Team Empowerment"
                      },
                      "Staff own their tasks", 
                      "Compliance is part of our culture now."
                    ],
                    [
                      {
                        icon: (
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                          </div>
                        ),
                        text: "Audit-Ready in Minutes"
                      },
                      "Two-click audit bundles", 
                      "Auditors impressed by your efficiency"
                    ]
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {row[0].icon}
                          <span className="font-medium text-purple-800">{row[0].text}</span>
                        </div>
                      </td>
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
      <section id="pricing" className="py-20 bg-white pt-32">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Countdown Timer */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-pink-600 mb-4">
                Limited Time Offer - Founders Program Ends In:
              </h3>
              {countdown && typeof countdown === 'object' && countdown.days !== undefined ? (
                <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-3xl font-bold text-pink-600">{countdown.days || 0}</div>
                    <div className="text-sm text-gray-600 font-medium">Days</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-3xl font-bold text-pink-600">{countdown.hours || 0}</div>
                    <div className="text-sm text-gray-600 font-medium">Hours</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-3xl font-bold text-pink-600">{countdown.minutes || 0}</div>
                    <div className="text-sm text-gray-600 font-medium">Minutes</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-3xl font-bold text-pink-600">{countdown.seconds || 0}</div>
                    <div className="text-sm text-gray-600 font-medium">Seconds</div>
                  </div>
                </div>
              ) : (
                <div className="text-2xl text-red-600 font-semibold">
                  {typeof countdown === 'string' ? countdown : 'Loading...'}
                </div>
              )}
            </div>
          </div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">HIPAA Trainer Pre-Sale Program
            </h2>
            <p className="text-xl text-gray-600">Join our exclusive early community—shape the product with zero risk and lock in lifetime access.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 mt-12 pt-6">
            {[
              {
                plan: "Free",
                price: "$0",
                period: "/mo",
                popular: false,
                features: ["Up to 2 users", "Compliance Dashboard", "Risk Assessment", "Training Tool", "Community support"],
                buttonText: "Join waiting list",
                promoText: "Always free"
              },
              {
                plan: "Founding Member",
                price: "$297",
                period: "lifetime",
                popular: true,
                features: ["Up to 50 users", "All core features", "1-year money-back guarantee", "Priority support"],
                buttonText: "Claim Your Founding Member Seat",
                promoText: "First 50 members only, going quickly"
              },
              {
                plan: "Early Bird",
                price: "$397",
                period: "lifetime", 
                popular: false,
                features: ["Up to 50 users", "All core features", "1-year money-back guarantee", "Standard support"],
                buttonText: "Become an Early Bird",
                promoText: "Next 100 customers only"
              },
              {
                plan: "Regular",
                price: "$30",
                period: "/month",
                popular: false,
                features: ["First 10 users", "$20/mo per 10 additional", "All features", "Standard support"],
                buttonText: "Coming Soon",
                promoText: "Your compliance nightmare will soon be over",
                disabled: true
              }
            ].map((tier, index) => (
              <div key={index} className={`rounded-2xl ${tier.popular ? 'border-2 border-purple-200 relative' : 'border border-gray-200'} shadow-sm flex flex-col h-full`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                {/* Dark Header Section */}
                <div className="bg-gray-900 text-white p-8 rounded-t-2xl">
                  <h3 className="text-xl font-bold mb-4">{tier.plan}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-gray-300 ml-1">{tier.period}</span>
                  </div>

                  {/* Tier-specific descriptive text */}
                  {tier.plan === "Free" && (
                    <p className="text-sm text-gray-300">
                      Free for small teams
                    </p>
                  )}
                  {tier.plan === "Founding Member" && (
                    <div className="text-sm text-gray-300">
                      <p className="mb-1">1-Year Money-Back Guarantee</p>
                    </div>
                  )}
                  {tier.plan === "Early Bird" && (
                    <p className="text-sm text-gray-300">
                      1-Year Money-Back Guarantee
                    </p>
                  )}
                  {tier.plan === "Regular" && (
                    <p className="text-sm text-gray-300">
                      for first 10 users
                    </p>
                  )}
                </div>
                {/* Light Content Section */}
                <div className={`p-8 flex-1 flex flex-col rounded-b-2xl ${tier.popular ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-white'}`}>
                <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    {tier.promoText && (
                      <p className="text-sm text-gray-600 text-center mb-3 font-medium">
                        {tier.promoText}
                      </p>
                    )}
                    <button 
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        tier.disabled 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : tier.popular 
                            ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 shadow-lg transform hover:scale-105'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                      disabled={tier.disabled}
                    >
                      {tier.buttonText || (tier.popular ? 'Get Started' : 'Choose Plan')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Now Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Now?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Risk</h3>
                <p className="text-gray-600">1-Year, 100% Money-Back Guarantee—try every feature with zero risk</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Exclusivity</h3>
                <p className="text-gray-600">Limited seats—once these tiers are gone, pricing shifts to subscription only</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Influence</h3>
                <p className="text-gray-600">Your feedback drives our next feature releases</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Savings</h3>
                <p className="text-gray-600">Lifetime cost vs. monthly fees saves thousands over time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to the most common questions about HIPAA Trainer.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "I'm a small team—can HIPAA Trainer really scale down for us?",
                answer: "Yes—no IT needed, no hidden fees, onboarding in under one hour. We've designed HIPAA Trainer specifically for small healthcare teams who don't have dedicated compliance departments."
              },
              {
                question: "How do you handle regulatory updates?",
                answer: "We monitor regulatory changes continuously and automatically update your policies and training materials. You'll receive notifications about any changes that affect your organization, with clear guidance on what actions to take."
              },
              {
                question: "How fast can we be audit-ready?",
                answer: "Most teams are audit-ready within 2-4 weeks. Our system generates comprehensive audit bundles in minutes, including all required documentation, training records, and compliance evidence."
              },
              {
                question: "Is HIPAA Trainer itself HIPAA-compliant?",
                answer: "Absolutely. We're SOC 2 certified, use enterprise-grade encryption, and follow all HIPAA requirements. We practice what we preach when it comes to data security and privacy."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg border border-gray-200">
                <button 
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? -1 : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
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
            Experience how HIPAA Trainer can transform your compliance process risk-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToPricing}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg"
            >
              Start For Free
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated on HIPAA Compliance</h3>
            <p className="text-lg mb-6 opacity-90">
              Get the latest insights, best practices, and regulatory updates delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubscription} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscriptionMessage && (
              <p className={`mt-4 text-sm ${subscriptionMessage.includes('Successfully') ? 'text-green-200' : 'text-red-200'}`}>
                {subscriptionMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}