'use client';

import { useState } from 'react';
import LandingHeader from '../components/Layout/LandingHeader';
import LandingFooter from '../components/Layout/LandingFooter';
import Link from 'next/link';

export default function HIPAACompliancePage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const complianceSections = [
    {
      title: "Administrative Safeguards",
      description: "Policies and procedures to manage access to ePHI",
      requirements: [
        "Security Officer designation",
        "Workforce training and access management",
        "Information access management",
        "Security awareness and training",
        "Security incident procedures",
        "Contingency plan",
        "Regular security evaluations"
      ]
    },
    {
      title: "Physical Safeguards",
      description: "Physical measures to protect electronic systems and equipment",
      requirements: [
        "Facility access controls",
        "Workstation use restrictions",
        "Device and media controls",
        "Proper disposal of ePHI",
        "Secure workstation environments"
      ]
    },
    {
      title: "Technical Safeguards",
      description: "Technology controls to protect ePHI",
      requirements: [
        "Access control systems",
        "Audit controls and logging",
        "Integrity controls",
        "Person or entity authentication",
        "Transmission security and encryption"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            HIPAA Compliance Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understanding the Health Insurance Portability and Accountability Act and how HIPAA Trainer helps you achieve compliance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* What is HIPAA */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is HIPAA?</h2>
            <div className="prose prose-lg prose-purple max-w-none">
              <p className="text-gray-700 mb-4">
                The Health Insurance Portability and Accountability Act (HIPAA) is a federal law enacted in 1996 that establishes national standards for protecting sensitive patient health information. HIPAA applies to covered entities including healthcare providers, health plans, and healthcare clearinghouses, as well as their business associates.
              </p>
              <p className="text-gray-700 mb-6">
                HIPAA's primary goals are to protect patient privacy, ensure the security of health information, and provide patients with rights over their health information while enabling the flow of health information needed for quality healthcare.
              </p>
            </div>
          </div>

          {/* Key Requirements */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">HIPAA Safeguards Requirements</h2>
            <div className="space-y-6">
              {complianceSections.map((section, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                      <p className="text-gray-600 mt-1">{section.description}</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        expandedSection === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedSection === index && (
                    <div className="px-6 pb-4">
                      <ul className="space-y-2">
                        {section.requirements.map((requirement, reqIndex) => (
                          <li key={reqIndex} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Penalties */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">HIPAA Violation Penalties</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Civil Penalties</h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Tier 1: $137-$68,928 per violation</li>
                    <li>• Tier 2: $1,379-$68,928 per violation</li>
                    <li>• Tier 3: $13,785-$68,928 per violation</li>
                    <li>• Tier 4: $68,928+ per violation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Criminal Penalties</h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Unknowing: Up to $50,000 and/or 1 year</li>
                    <li>• False pretenses: Up to $100,000 and/or 5 years</li>
                    <li>• Intent to sell: Up to $250,000 and/or 10 years</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How HIPAA Trainer Helps */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How HIPAA Trainer Ensures Compliance</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Comprehensive Training</h3>
                  <p className="text-purple-700">
                    HIPAA training delivered through interactive, bite-sized modules that ensure maximum retention and practical understanding of all compliance requirements.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Policy Management</h3>
                  <p className="text-blue-700">
                    Ready-to-use, customizable policies and procedures that meet HIPAA requirements.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Risk Assessments</h3>
                  <p className="text-green-700">
                    Automated security risk assessments to identify vulnerabilities and compliance gaps.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">Audit Preparation</h3>
                  <p className="text-yellow-700">
                    Complete audit trail documentation and reporting tools to demonstrate compliance.
                  </p>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3">Ongoing Monitoring</h3>
                  <p className="text-indigo-700">
                    Continuous compliance monitoring with alerts for training renewals and policy updates.
                  </p>
                </div>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-pink-800 mb-3">Expert Support</h3>
                  <p className="text-pink-700">
                    Regular updates on regulatory changes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Achieve HIPAA Compliance?</h2>
            <p className="text-lg mb-6">
              Let HIPAA Trainer guide your organization through every step of HIPAA compliance with our comprehensive platform.
            </p>
            <Link href="/#pricing" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">Start Your Compliance Journey</Link>
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions About HIPAA Compliance?</h3>
            <p className="text-gray-700 mb-4">
              Our compliance experts are here to help you understand HIPAA requirements and how HIPAA Trainer can support your compliance efforts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-center"
              >
                Contact Our Experts
              </a>
              <a
                href="mailto:info@hipaatrainer.net"
                className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors text-center"
              >
                Email: info@hipaatrainer.net
              </a>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}