
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-light">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">HIPAA Trainer</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#solutions" className="text-dark-text hover:text-primary px-3 py-2 text-sm font-medium">Solutions</a>
                <a href="#features" className="text-dark-text hover:text-primary px-3 py-2 text-sm font-medium">Features</a>
                <a href="#pricing" className="text-dark-text hover:text-primary px-3 py-2 text-sm font-medium">Pricing</a>
                <a href="#resources" className="text-dark-text hover:text-primary px-3 py-2 text-sm font-medium">Resources</a>
                <Link href="/onboarding" className="text-muted-text hover:text-primary px-3 py-2 text-sm font-medium">Login</Link>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                Free for individuals
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-dark-text hover:text-primary p-2"
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
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-light">
                <a href="#solutions" className="text-dark-text hover:text-primary block px-3 py-2 text-base font-medium">Solutions</a>
                <a href="#features" className="text-dark-text hover:text-primary block px-3 py-2 text-base font-medium">Features</a>
                <a href="#pricing" className="text-dark-text hover:text-primary block px-3 py-2 text-base font-medium">Pricing</a>
                <a href="#resources" className="text-dark-text hover:text-primary block px-3 py-2 text-base font-medium">Resources</a>
                <Link href="/onboarding" className="text-muted-text hover:text-primary block px-3 py-2 text-base font-medium">Login</Link>
                <button className="w-full bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors mt-4">
                  Free for individuals
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-light-blue to-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-dark-text mb-6">
              Compliance Confidence for<br />
              <span className="text-primary">Practices and Startups Alike</span>
            </h1>
            <p className="text-xl text-muted-text mb-8 max-w-4xl mx-auto">
              Automate HIPAA training, policy updates, risk assessments & audit bundles—so dental offices, physician practices, healthtech startups, mental health clinics, and home healthcare agencies trade late-night spreadsheets for clear dashboards and real confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors text-lg">
                Free for individuals, upgrade to teams/organizations at any time
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">Built for Your Organization</h2>
            <p className="text-xl text-muted-text max-w-3xl mx-auto">
              Whether you're running a busy dental practice, a multi-physician clinic, launching a healthtech venture, managing a mental health program, or coordinating caregivers in home healthcare, HIPAA Trainer scales to your team—no big-budget compliance department required.
            </p>
          </div>
        </div>
      </section>

      {/* The Pain Nobody Talks About */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">The Pain Nobody Talks About</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                persona: "Dental Office Manager (Linda Lee)",
                struggle: "Staff can't find the latest Notice of Privacy Practices in shared drives",
                cost: "Patient complaints and potential state board warnings"
              },
              {
                persona: "Physician Practice Manager (Dr. Chen)",
                struggle: "Tracking which physicians and nurses completed yearly training is a manual nightmare",
                cost: "Fines for lapsed certifications and interrupted patient scheduling"
              },
              {
                persona: "Healthtech Startup CTO (Alex Kim)",
                struggle: "CI/CD releases stall while you manually embed security and compliance scripts",
                cost: "Missed funding milestones, uphill investor conversations"
              },
              {
                persona: "Mental Health Clinic Director (Jasmine Patel)",
                struggle: "Uncertainty around telehealth PHI rules leads to ad hoc policy updates",
                cost: "Legal exposure, client mistrust, and potential lawsuits"
              },
              {
                persona: "Home Health Agency Supervisor (Maria Gonzalez)",
                struggle: "Coordinating compliance across dozens of in-home caregivers",
                cost: "Lost reimbursements, audit penalties, and high turnover"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <h3 className="font-semibold text-primary mb-3">{item.persona}</h3>
                <p className="text-dark-text mb-4 font-medium">Daily Struggle:</p>
                <p className="text-muted-text mb-4 text-sm">{item.struggle}</p>
                <p className="text-dark-text mb-2 font-medium">Hidden Cost:</p>
                <p className="text-alert text-sm">{item.cost}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-dark-text font-medium">
              All these teams share one solution: a single, simple tool that automates tasks, centralizes documents, and delivers peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-8">Our Promise</h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              <p className="text-xl text-muted-text">❌ No more one-size-fits-none GRC platforms</p>
              <p className="text-xl text-muted-text">❌ No more consultant invoices that rival your software budget</p>
              <p className="text-xl text-success">✅ Only clear, actionable automation built for small teams</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">How It Works—Feature by Feature</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "Compliance Dashboard",
                description: "Your new morning ritual: one glance tells you if your dental, medical, or home-care operation is green, amber, or red on every HIPAA requirement—no digging, no guesswork."
              },
              {
                title: "Automated Task Management",
                description: "Auto-assign annual trainings, policy reviews, and risk reassessments to dentists, physicians, developers, counselors, or caregivers—then sit back as the system nudges your team and tracks completions."
              },
              {
                title: "Employee & Provider Management",
                description: "Add or import profiles for your front-desk staff, physicians, nurses, developers, therapists, or home aides—track training progress and compliance status at a glance."
              },
              {
                title: "Bite-Size, Role-Specific Training",
                description: "10-minute modules tailored to dental assistants, physicians, engineers, mental health counselors, and home care providers—complete with quizzes and instant certificates."
              },
              {
                title: "Guided Risk Assessment Tool",
                description: "Step-by-step SRA flags vulnerabilities in your clinical workflows, telehealth platform, or in-home processes—export prioritized remediation plans in minutes."
              },
              {
                title: "Real-Time Notifications & Reports",
                description: "Get pinged when a hygienist, nurse, coder, therapist, or caregiver finishes—or misses—a module. Pull completion, usage, or past-due reports in one click."
              },
              {
                title: "Centralized Document Library",
                description: "One source of truth for policies, BAAs, breach-plans, and updates—version control included so your practice manager, CTO, or clinical director never worries about outdated docs."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-border">
                <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-muted-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">Benefits That Resonate</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg">
              <thead className="bg-light-blue">
                <tr>
                  <th className="border border-border px-6 py-4 text-left font-semibold text-dark-text">Benefit</th>
                  <th className="border border-border px-6 py-4 text-left font-semibold text-dark-text">What You Feel</th>
                  <th className="border border-border px-6 py-4 text-left font-semibold text-dark-text">What Others Think</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Calm & Clarity", "Sleep-easy confidence", "They've got compliance under lock-and-key."],
                  ["Time Back", "10+ hours free per month", "How are they so productive?"],
                  ["Cost Savings", "$5K+ saved vs. consultants", "They did that for $30 mo?"],
                  ["Team Empowerment", "Staff own their tasks", "Compliance is part of our culture now."],
                  ["Audit-Ready in Minutes", "Two-click audit bundles", "Auditors impressed by your efficiency"]
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-background"}>
                    <td className="border border-border px-6 py-4 font-medium text-primary">{row[0]}</td>
                    <td className="border border-border px-6 py-4 text-dark-text">{row[1]}</td>
                    <td className="border border-border px-6 py-4 text-muted-text italic">"{row[2]}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">Customer Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "I launched HIPAA Trainer on Monday, and by Wednesday our front-desk team felt fully confident in their privacy workflows.",
                author: "Linda Lee, Office Manager @ BrightSmile Dental"
              },
              {
                quote: "Within days, I had real-time visibility into which doctors had completed training—no more chasing signatures.",
                author: "Dr. Sarah Chen, Practice Manager @ Oakwood Medical Group"
              },
              {
                quote: "Integrating HIPAA Trainer into our CI pipeline made compliance invisible—now we ship features twice as fast.",
                author: "Alex Kim, Co-Founder & CTO @ TeleClarity Health"
              },
              {
                quote: "I used to stress over every policy update; now I hit 'Generate Audit Bundle' and go coach my team.",
                author: "Jasmine Patel, Clinical Director @ MindfulCare Therapy"
              },
              {
                quote: "Coordinating dozens of caregivers was chaos; HIPAA Trainer brought order and saved us thousands in audit fines.",
                author: "Maria Gonzalez, Director @ SafeHands Home Care"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                <p className="text-dark-text mb-4 italic">"{story.quote}"</p>
                <p className="text-muted-text text-sm font-medium">— {story.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">Pre-Sale Founders Program</h2>
            <p className="text-xl text-muted-text">Join our exclusive early community—shape the product with zero risk and lock in lifetime access.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                plan: "Founding Member",
                price: "$297 lifetime",
                guarantee: "+ 1-Year Money-Back Guarantee",
                users: "Up to 50 users",
                availability: "First 50 customers only",
                featured: true
              },
              {
                plan: "Early Bird",
                price: "$397 lifetime",
                guarantee: "+ 1-Year Money-Back Guarantee",
                users: "Up to 50 users",
                availability: "Next 100 customers only",
                featured: false
              },
              {
                plan: "Regular (Launch)",
                price: "$30 /mo for first 10 users",
                guarantee: "$20 /mo per 10 additional users",
                users: "Unlimited up to capacity",
                availability: "Opens after Early Bird seats fill",
                featured: false
              }
            ].map((tier, index) => (
              <div key={index} className={`rounded-lg p-8 border-2 ${tier.featured ? 'border-primary bg-light-blue' : 'border-border bg-white'}`}>
                <h3 className="text-xl font-bold text-dark-text mb-4">{tier.plan}</h3>
                <div className="mb-6">
                  <p className="text-2xl font-bold text-primary">{tier.price}</p>
                  <p className="text-sm text-success">{tier.guarantee}</p>
                </div>
                <div className="space-y-3 mb-6">
                  <p className="text-muted-text"><strong>Users:</strong> {tier.users}</p>
                  <p className="text-muted-text"><strong>Availability:</strong> {tier.availability}</p>
                </div>
                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  tier.featured 
                    ? 'bg-primary text-white hover:bg-blue-800' 
                    : 'bg-secondary text-white hover:bg-blue-700'
                }`}>
                  {tier.featured ? 'Claim Your Founding Member Seat' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>

          <div className="callout-info p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Why Join Now?</h3>
            <ul className="space-y-2">
              <li className="text-dark-text">✅ <strong>No Risk:</strong> 1-Year, 100% Money-Back Guarantee</li>
              <li className="text-dark-text">✅ <strong>Exclusivity:</strong> Limited seats—once they're gone, pricing shifts to subscription only</li>
              <li className="text-dark-text">✅ <strong>Influence:</strong> Your feedback drives our next feature releases</li>
              <li className="text-dark-text">✅ <strong>Savings:</strong> Lifetime cost vs. monthly fees saves thousands over time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-8">
            {[
              {
                question: "We're a small dental/medical team—can HIPAA Trainer scale down for us?",
                answer: "Yes—no IT needed, no hidden fees, onboarding in under one hour."
              },
              {
                question: "How do you handle regulatory updates for dentists, physicians, telehealth, and home care?",
                answer: "We push annual refreshers and critical bulletins (e.g., new telehealth PHI rules) automatically into your training modules and templates."
              },
              {
                question: "How fast can we be audit-ready?",
                answer: "Most customers achieve 100% compliance within days—and generate audit bundles in seconds."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <h3 className="text-lg font-bold text-dark-text mb-3">Q: {faq.question}</h3>
                <p className="text-muted-text">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-text text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#solutions" className="text-gray-300 hover:text-white">Solutions</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">&copy; 2024 HIPAA Trainer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
