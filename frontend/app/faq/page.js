'use client';

import Link from 'next/link';
import LandingHeader from '../components/Layout/LandingHeader';
import LandingFooter from '../components/Layout/LandingFooter';
import { useState } from 'react';

export default function FAQPage() {
  const [expandedFAQ, setExpandedFAQ] = useState(-1);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is HIPAA Trainer and how does it work?",
          answer: "HIPAA Trainer is a comprehensive compliance platform that provides automated training, policy management, and audit preparation tools. Our system guides your team through HIPAA requirements with interactive training modules, generates compliant policies, and maintains audit-ready documentation."
        },
        {
          question: "How quickly can we get started with HIPAA Trainer?",
          answer: "Most organizations are up and running within hours. Our onboarding process takes about 30-60 minutes, and your team can begin training immediately. We provide setup assistance and can have you audit-ready within 2-4 weeks."
        },
        {
          question: "Do we need any special IT setup or software?",
          answer: "No special IT setup required. HIPAA Trainer is a cloud-based platform that works through your web browser. We handle all the technical infrastructure, security, and updates for you."
        }
      ]
    },
    {
      category: "HIPAA Compliance",
      questions: [
        {
          question: "Will HIPAA Trainer make our organization fully HIPAA compliant?",
          answer: "HIPAA Trainer provides the tools, training, and documentation needed for compliance, but compliance is ultimately your organization's responsibility. We guide you through all requirements and provide evidence of your compliance efforts for audits."
        },
        {
          question: "How do you stay current with HIPAA regulations?",
          answer: "Our compliance team continuously monitors regulatory changes and updates. When regulations change, we automatically update your policies and training materials, and notify you of any required actions."
        },
        {
          question: "What if we're audited? How does HIPAA Trainer help?",
          answer: "HIPAA Trainer maintains comprehensive audit trails and can generate complete audit packages in minutes. This includes all training records, policy acknowledgments, risk assessments, and compliance documentation that auditors typically request."
        },
        {
          question: "Can HIPAA Trainer help with Business Associate Agreements (BAAs)?",
          answer: "Yes, we provide BAA templates and management tools to track all your business associate relationships. We also maintain our own BAA with you as part of our service."
        }
      ]
    },
    {
      category: "Training & Users",
      questions: [
        {
          question: "How long does HIPAA training take for each employee?",
          answer: "Our core HIPAA training typically takes 45-60 minutes per employee. We offer role-specific modules that can add 15-30 minutes depending on the employee's responsibilities. All training is self-paced."
        },
        {
          question: "Can we track who has completed training?",
          answer: "Absolutely. HIPAA Trainer provides detailed reporting on training completion, scores, certificates, and compliance status for all users. Managers can see real-time progress and send automated reminders."
        },
        {
          question: "What happens when we hire new employees?",
          answer: "New employees can be enrolled immediately and must complete training within your specified timeframe (typically 30 days). The system automatically tracks their progress and sends reminders to ensure timely completion."
        },
        {
          question: "Do employees need to retake training annually?",
          answer: "Yes, HIPAA requires annual training updates. HIPAA Trainer automatically schedules refresher training and tracks annual compliance for all employees."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          question: "What's included in the lifetime deal?",
          answer: "The lifetime deal includes unlimited users, all training modules, policy templates, audit tools, risk assessments, and ongoing regulatory updates. You pay once and have access forever with no recurring fees."
        },
        {
          question: "Are there any hidden fees or limitations?",
          answer: "No hidden fees. The lifetime deal includes everything: unlimited users, unlimited training, all features, and ongoing updates. The only limitation is our fair use policy for API usage."
        },
        {
          question: "What if we need to cancel or get a refund?",
          answer: "We offer a 30-day money-back guarantee. If you're not satisfied within the first 30 days, we'll provide a full refund, no questions asked."
        },
        {
          question: "Can we upgrade or add features later?",
          answer: "The lifetime deal includes all current and future features. We regularly add new capabilities based on customer feedback and regulatory changes, all included at no additional cost."
        }
      ]
    },
    {
      category: "Security & Data",
      questions: [
        {
          question: "Is HIPAA Trainer itself HIPAA compliant?",
          answer: "Yes, we're fully HIPAA compliant and SOC 2 certified. We undergo regular security audits, use enterprise-grade encryption, and maintain strict access controls. We practice what we preach."
        },
        {
          question: "Where is our data stored and how is it protected?",
          answer: "Your data is stored in secure, HIPAA-compliant data centers with encryption at rest and in transit. We use multi-factor authentication, regular backups, and have comprehensive disaster recovery procedures."
        },
        {
          question: "Can we export our data if needed?",
          answer: "Yes, you can export all your training records, policies, and compliance documentation at any time. We provide standard formats (PDF, CSV) and will assist with data migration if needed."
        }
      ]
    },
    {
      category: "Support",
      questions: [
        {
          question: "What kind of customer support do you provide?",
          answer: "We provide email support with typical response times under 24 hours. Lifetime deal customers also get access to our knowledge base, video tutorials, and setup assistance."
        },
        {
          question: "Do you provide implementation assistance?",
          answer: "Yes, we provide onboarding support to help you get started quickly. This includes account setup, initial policy configuration, and guidance on best practices for your organization."
        },
        {
          question: "What if we have specific compliance questions?",
          answer: "Our support team includes HIPAA compliance experts who can answer specific questions about regulations and help you understand how to apply requirements to your organization."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get answers to the most common questions about HIPAA Trainer and HIPAA compliance
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  return (
                    <div key={globalIndex} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                      <button 
                        onClick={() => setExpandedFAQ(expandedFAQ === globalIndex ? -1 : globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors rounded-lg"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <svg 
                          className={`w-5 h-5 text-gray-500 transform transition-transform ${
                            expandedFAQ === globalIndex ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedFAQ === globalIndex && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center mt-16">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="mb-6 opacity-90">
              Our compliance experts are here to help. Reach out to us for personalized assistance.
            </p>
            <Link 
              href="/contact"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}