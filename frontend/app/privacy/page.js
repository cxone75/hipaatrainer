'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/landing">
                  <img 
                    src="/hipaatrainer-logo.png" 
                    alt="HIPAA Trainer" 
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/landing#solutions" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Solutions</Link>
                <Link href="/landing#features" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Features</Link>
                <Link href="/landing#pricing" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Pricing</Link>
                <Link href="/blog" className="text-gray-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Blog</Link>
                <Link href="/onboarding" className="text-gray-600 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors">Login</Link>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link 
                href="/landing#pricing"
                className="bg-purple-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-900 transition-colors shadow-md"
              >
                Start For Free
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-purple-800 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/landing" className="hover:text-purple-600">Home</Link>
            <span>›</span>
            <span className="text-gray-900">Privacy Policy</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-purple max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              HIPAA Trainer ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. We understand the critical importance of data privacy, especially in the healthcare industry.
            </p>
            <p className="text-gray-700">
              By using our service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, your choice is not to use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
            <p className="text-gray-700 mb-4">We may collect personally identifiable information, such as:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Organization and job title</li>
              <li>Account credentials and authentication information</li>
              <li>Training progress and completion records</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Usage Data</h3>
            <p className="text-gray-700 mb-4">We automatically collect certain information when you visit our service:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on our service</li>
              <li>Device information and operating system</li>
              <li>Referral sources and exit pages</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Cookies and Tracking Technologies</h3>
            <p className="text-gray-700">
              We use cookies and similar tracking technologies to enhance your experience and analyze usage patterns. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect for various purposes:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>To provide, operate, and maintain our service</li>
              <li>To improve, personalize, and expand our service</li>
              <li>To understand and analyze how you use our service</li>
              <li>To develop new products, services, features, and functionality</li>
              <li>To communicate with you, including customer service and support</li>
              <li>To send you updates, marketing communications, and other information</li>
              <li>To process your transactions and manage your account</li>
              <li>To comply with legal obligations and protect our rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy:
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Service Providers</h3>
            <p className="text-gray-700 mb-4">
              We may share your information with third-party service providers who assist us in operating our service, conducting our business, or serving our users.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Legal Requirements</h3>
            <p className="text-gray-700 mb-4">
              We may disclose your information if required to do so by law or in response to valid requests by public authorities.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Business Transfers</h3>
            <p className="text-gray-700">
              In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security measures include:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection practices</li>
              <li>Compliance with industry standards and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. HIPAA Compliance</h2>
            <p className="text-gray-700 mb-4">
              As a healthcare compliance platform, we understand the importance of HIPAA compliance. While HIPAA Trainer itself is a compliance training tool and not a covered entity under HIPAA, we maintain high standards for data protection:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>We do not collect or store Protected Health Information (PHI)</li>
              <li>Our platform is designed to help organizations achieve HIPAA compliance</li>
              <li>We maintain appropriate safeguards for all data we process</li>
              <li>Business Associate Agreements are available for enterprise customers when applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">You have certain rights regarding your personal information:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Access:</strong> You can request access to your personal information</li>
              <li><strong>Correction:</strong> You can request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> You can request deletion of your personal information</li>
              <li><strong>Portability:</strong> You can request a copy of your data in a portable format</li>
              <li><strong>Opt-out:</strong> You can opt-out of marketing communications at any time</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, please contact us using the information provided in the Contact section below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Training records may be retained for compliance and certification purposes as required by applicable regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700">
              Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700">
              Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> info@hipaatrainer.net</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> HIPAA Trainer, Inc.</p>
              <p className="text-gray-700 mb-2">123 Healthcare Compliance Way</p>
              <p className="text-gray-700">Privacy Department, Suite 100</p>
              <p className="text-gray-700">Compliance City, CC 12345</p>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Questions About Our Privacy Practices?</h3>
          <p className="text-lg mb-6 opacity-90">
            We're committed to transparency and protecting your privacy. Contact us if you have any questions.
          </p>
          <Link 
            href="/contact"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/landing#solutions" className="text-gray-300 hover:text-white transition-colors">Solutions</Link></li>
                <li><Link href="/landing#features" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/landing#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/landing" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
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