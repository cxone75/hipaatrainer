
import LandingHeader from '../components/Layout/LandingHeader';
import LandingFooter from '../components/Layout/LandingFooter';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata = {
  title: 'HIPAA Certification Online | 1-Year Certificates with CEUs',
  description: 'Earn a 1-year HIPAA certification online with CEUs. Role-specific courses, instant certificates, and affordable plans starting at $19.99.',
  keywords: 'HIPAA Certification Online, Annual HIPAA Certificate, HIPAA Training with CEUs, HIPAA compliance certification, online HIPAA courses',
  openGraph: {
    title: 'HIPAA Certification Online | 1-Year Certificates with CEUs',
    description: 'Earn a 1-year HIPAA certification online with CEUs. Role-specific courses, instant certificates, and affordable plans starting at $19.99.',
    type: 'website',
    url: 'https://hipaatrainer.com/certification',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIPAA Certification Online | 1-Year Certificates with CEUs',
    description: 'Earn a 1-year HIPAA certification online with CEUs. Role-specific courses, instant certificates, and affordable plans starting at $19.99.',
  },
  alternates: {
    canonical: 'https://hipaatrainer.com/certification',
  }
};

export default function CertificationPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Earn Your <span className="text-purple-800">HIPAA Certification Online</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Get audit-ready with our comprehensive HIPAA certification program. Earn 1.5–2.6 CEUs with 
                certificates valid for 1-2 years. Download your certificate instantly upon completion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/pricing"
                  className="bg-purple-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-900 transition-colors text-lg"
                >
                  Get Certified Today
                </Link>
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>Starting at $19.99</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certification Value Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Choose Our HIPAA Certification?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Audit-Ready Certificates</h3>
                      <p className="text-gray-600">Meet compliance requirements with certificates accepted by auditors nationwide.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Long-Term Validity</h3>
                      <p className="text-gray-600">1-2 year certificate validity means less frequent renewals and lower costs.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Continuing Education Units</h3>
                      <p className="text-gray-600">Earn 1.5–2.6 CEUs to maintain professional certifications and licenses.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Certificate Features</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Certificate Validity</span>
                    <span className="font-semibold text-gray-900">1-2 Years</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">CEU Credits</span>
                    <span className="font-semibold text-gray-900">1.5-2.6 CEUs</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Download</span>
                    <span className="font-semibold text-green-600">Instant</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Format</span>
                    <span className="font-semibold text-gray-900">PDF</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Verification</span>
                    <span className="font-semibold text-gray-900">Unique Code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certification Process */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple 4-Step Certification Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get certified quickly and easily with our streamlined process designed for busy healthcare professionals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Login & Enroll</h3>
                <p className="text-gray-600">Create your account and select your role-specific HIPAA course.</p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Course</h3>
                <p className="text-gray-600">Watch interactive video lessons and complete hands-on exercises.</p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pass Quiz</h3>
                <p className="text-gray-600">Take the final assessment and achieve the 75% passing score.</p>
              </div>
              
              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Certificate</h3>
                <p className="text-gray-600">Instantly download your official HIPAA certification with CEUs.</p>
              </div>
            </div>
            
            {/* Certificate Preview */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Your Professional Certificate</h3>
              <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 rounded-lg p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-purple-900 mb-2">Certificate of Completion</h4>
                  <div className="w-24 h-1 bg-purple-800 mx-auto mb-6"></div>
                  <p className="text-lg mb-2">This certifies that</p>
                  <p className="text-2xl font-bold text-purple-900 mb-2">[Your Name]</p>
                  <p className="text-lg mb-2">has successfully completed</p>
                  <p className="text-xl font-semibold text-purple-800 mb-4">HIPAA Fundamentals Training</p>
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-8 pt-6 border-t border-purple-200">
                    <div>
                      <p className="font-medium">Certificate ID</p>
                      <p className="font-mono">CERT-HIPAA-2024001</p>
                    </div>
                    <div>
                      <p className="font-medium">CEU Credits</p>
                      <p>2.0 CEUs</p>
                    </div>
                    <div>
                      <p className="font-medium">Valid Until</p>
                      <p>December 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Role-Specific Courses */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Role-Specific HIPAA Training</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get targeted training for your specific role with industry-leading CEU credits.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Dental Professionals */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dental Professionals</h3>
                <p className="text-gray-600 mb-4">Specialized training for dental practices with patient data handling specific to dental offices.</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-semibold">2.6 CEUs</span>
                  <span className="text-sm text-gray-500">60 minutes</span>
                </div>
              </div>
              
              {/* IT Professionals */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">IT Professionals</h3>
                <p className="text-gray-600 mb-4">Technical focus on security safeguards, encryption, and system administration for healthcare IT.</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-semibold">2.0 CEUs</span>
                  <span className="text-sm text-gray-500">45 minutes</span>
                </div>
              </div>
              
              {/* Healthcare Workers */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Healthcare Workers</h3>
                <p className="text-gray-600 mb-4">Comprehensive training covering patient privacy, data handling, and compliance for all healthcare staff.</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-semibold">1.5 CEUs</span>
                  <span className="text-sm text-gray-500">35 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose HIPAA Trainer Over ComplianceJunction?</h2>
              <p className="text-xl text-gray-600">Compare our certification benefits and see the difference.</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="p-6 border-r border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                    <div className="space-y-4">
                      <div className="py-3 border-b border-gray-100">CEU Credits</div>
                      <div className="py-3 border-b border-gray-100">Certificate Validity</div>
                      <div className="py-3 border-b border-gray-100">Role-Specific Courses</div>
                      <div className="py-3 border-b border-gray-100">Instant Download</div>
                      <div className="py-3 border-b border-gray-100">Starting Price</div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-purple-50 border-r border-gray-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-4">HIPAA Trainer</h3>
                    <div className="space-y-4">
                      <div className="py-3 border-b border-purple-100 font-semibold text-purple-800">1.5-2.6 CEUs</div>
                      <div className="py-3 border-b border-purple-100 font-semibold text-purple-800">1-2 Years</div>
                      <div className="py-3 border-b border-purple-100 font-semibold text-purple-800">✓ Yes</div>
                      <div className="py-3 border-b border-purple-100 font-semibold text-purple-800">✓ Yes</div>
                      <div className="py-3 border-b border-purple-100 font-semibold text-purple-800">$19.99</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-600 mb-4">ComplianceJunction</h3>
                    <div className="space-y-4">
                      <div className="py-3 border-b border-gray-100 text-gray-600">2.0-2.6 CEUs</div>
                      <div className="py-3 border-b border-gray-100 text-gray-600">1 Year</div>
                      <div className="py-3 border-b border-gray-100 text-gray-600">Limited</div>
                      <div className="py-3 border-b border-gray-100 text-gray-600">✓ Yes</div>
                      <div className="py-3 border-b border-gray-100 text-gray-600">$29.99</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Certified?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Join thousands of healthcare professionals who trust HIPAA Trainer for their compliance certification needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/pricing"
                className="bg-white text-purple-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Get Certified Today
              </Link>
              <Link 
                href="/training"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-800 transition-colors text-lg"
              >
                View Courses
              </Link>
            </div>
            <p className="text-purple-200 mt-4">No setup fees • Instant access • 30-day money-back guarantee</p>
          </div>
        </section>
      </main>
      
      <LandingFooter />
    </div>
  );
}
