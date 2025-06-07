'use client';

import LandingHeader from '../components/Layout/LandingHeader';
import LandingFooter from '../components/Layout/LandingFooter';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Please read these terms carefully before using HIPAA Trainer
            </p>
            <div className="bg-white rounded-lg shadow-lg p-6 inline-block">
              <p className="text-gray-600">
                <strong>Last updated:</strong> January 15, 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">

            {/* Content */}
            <div className="prose prose-lg prose-purple max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using HIPAA Trainer ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p className="text-gray-700">
                  These Terms of Service constitute a legal agreement between you and HIPAA Trainer, Inc. ("Company," "we," "us," or "our") regarding your use of our healthcare compliance training platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  HIPAA Trainer provides healthcare compliance training, policy management, risk assessment tools, and related services designed to help healthcare organizations maintain compliance with applicable regulations including HIPAA, OSHA, and other healthcare standards.
                </p>
                <p className="text-gray-700">
                  Our services include but are not limited to: online training modules, compliance tracking, policy templates, risk assessments, audit preparation tools, and regulatory updates.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Account Creation</h3>
                <p className="text-gray-700 mb-4">
                  To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Account Security</h3>
                <p className="text-gray-700 mb-4">
                  You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Account Termination</h3>
                <p className="text-gray-700">
                  We reserve the right to terminate or suspend your account at any time for violations of these Terms or for any other reason we deem appropriate.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
                <p className="text-gray-700 mb-4">
                  You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>Upload or transmit malicious software or harmful content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the Service for any commercial purpose without our written consent</li>
                  <li>Reverse engineer or attempt to extract source code from our software</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Subscription and Payment Terms</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Subscription Plans</h3>
                <p className="text-gray-700 mb-4">
                  HIPAA Trainer offers various subscription plans with different features and pricing. Current pricing and plan details are available on our website.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Payment</h3>
                <p className="text-gray-700 mb-4">
                  Subscription fees are charged in advance on a recurring basis. You authorize us to charge your payment method for all fees associated with your subscription.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Refund Policy</h3>
                <p className="text-gray-700">
                  We offer a 30-day money-back guarantee for new subscriptions. Refund requests must be submitted within 30 days of initial purchase.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
                <p className="text-gray-700 mb-4">
                  The Service and its original content, features, and functionality are owned by HIPAA Trainer, Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-gray-700">
                  You are granted a limited, non-exclusive, non-transferable license to access and use the Service for your organization's compliance training purposes only.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your data and maintain compliance with applicable data protection regulations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers and Limitations of Liability</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Service Disclaimer</h3>
                <p className="text-gray-700 mb-4">
                  The Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, secure, or error-free.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 Compliance Disclaimer</h3>
                <p className="text-gray-700 mb-4">
                  While our Service is designed to assist with compliance efforts, we do not guarantee that use of our Service will ensure compliance with all applicable laws and regulations. You are responsible for ensuring your organization's compliance.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.3 Limitation of Liability</h3>
                <p className="text-gray-700">
                  To the maximum extent permitted by law, HIPAA Trainer shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
                <p className="text-gray-700">
                  You agree to indemnify and hold harmless HIPAA Trainer, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
                <p className="text-gray-700 mb-4">
                  You may terminate your account at any time by contacting us or through your account settings. We may terminate or suspend your access to the Service immediately, without prior notice, for any breach of these Terms.
                </p>
                <p className="text-gray-700">
                  Upon termination, your right to use the Service will cease immediately, but certain provisions of these Terms will survive termination.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law and Dispute Resolution</h2>
                <p className="text-gray-700 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
                </p>
                <p className="text-gray-700">
                  Any disputes arising under these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> info@hipaatrainer.net</p>
                  <p className="text-gray-700 mb-2"><strong>Address:</strong> HIPAA Trainer, Inc.</p>
                  <p className="text-gray-700 mb-2">123 Healthcare Compliance Way</p>
                  <p className="text-gray-700 mb-2">Legal Department, Suite 200</p>
                  <p className="text-gray-700">Compliance City, CC 12345</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}