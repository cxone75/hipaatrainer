
import Link from 'next/link';
import LandingHeader from '../components/Layout/LandingHeader';
import LandingFooter from '../components/Layout/LandingFooter';

export const metadata = {
  title: 'HIPAA Training with Policy Review | Comprehensive Compliance',
  description: 'Combine HIPAA training with policy review for full compliance. Affordable plans with admin tracking start at $19.99. Try free today!',
  keywords: 'HIPAA Training with Policy Review, HIPAA Compliance Training, Role-Specific HIPAA Training, Policy Review, HIPAA Training Online',
  openGraph: {
    title: 'HIPAA Training with Policy Review | Comprehensive Compliance',
    description: 'Combine HIPAA training with policy review for full compliance. Affordable plans with admin tracking start at $19.99. Try free today!',
    type: 'website',
    url: 'https://hipaatrainer.com/policy-review-training'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIPAA Training with Policy Review | Comprehensive Compliance',
    description: 'Combine HIPAA training with policy review for full compliance. Affordable plans with admin tracking start at $19.99. Try free today!'
  },
  alternates: {
    canonical: 'https://hipaatrainer.com/policy-review-training'
  }
};

export default function PolicyReviewTraining() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-800 to-blue-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              HIPAA Training with Policy Review for Complete Compliance
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              The only platform that combines interactive HIPAA training with integrated policy review and acknowledgment for comprehensive compliance management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="bg-white text-purple-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Start Policy Review Training
              </Link>
              <Link
                href="/certification"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View Certification Options
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Beyond Training: Complete Policy Integration
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Our platform uniquely combines HIPAA compliance training with integrated policy review tasks. Employees don't just learn about HIPAA—they actively review, understand, and acknowledge your organization's specific policies through our employee dashboard.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  From PHI Handling procedures to Breach Notification protocols, employees engage with your actual policies as part of their training journey, ensuring both understanding and documented compliance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Interactive training with policy integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Real-time acknowledgment tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Audit-ready documentation</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-8">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Employee Dashboard</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <span className="text-sm font-medium">PHI Handling Policy</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Review Required</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <span className="text-sm font-medium">Privacy Notice</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Acknowledged</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                      <span className="text-sm font-medium">Security Training</span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">In Progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Policy Review Training Works</h2>
              <p className="text-xl text-gray-600">A seamless integration of training and policy management</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-800">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Admin Assignment</h3>
                <p className="text-gray-600">
                  Administrators assign specific policies and training modules to employees based on their roles and responsibilities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-800">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Employee Review</h3>
                <p className="text-gray-600">
                  Employees access the Policies widget on their dashboard to review assigned documents and complete related training modules.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-800">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Acknowledgment & Tracking</h3>
                <p className="text-gray-600">
                  Employees acknowledge completion, creating an audit trail while admins track progress in real-time.
                </p>
              </div>
            </div>

            {/* Mockup Screenshot */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-center mb-6">Employee Policy Review Interface</h3>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Assigned Policies</h4>
                    <div className="space-y-2">
                      <div className="bg-white p-4 rounded border-l-4 border-red-400">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">PHI Handling Policy v2.1</span>
                          <button className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded">Review Now</button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Deadline: Dec 31, 2024</p>
                      </div>
                      <div className="bg-white p-4 rounded border-l-4 border-green-400">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Privacy Notice v1.8</span>
                          <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded">Completed</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Acknowledged: Nov 15, 2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Training Progress</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">HIPAA Fundamentals</span>
                          <span className="text-sm text-gray-600">100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">PHI Security Training</span>
                          <span className="text-sm text-gray-600">75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Integrated Policy Review Training?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete Integration</h3>
                <p className="text-gray-700">
                  Unlike training-only solutions, our platform seamlessly integrates policy review with HIPAA training for comprehensive compliance coverage.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Admin Tracking</h3>
                <p className="text-gray-700">
                  Administrators can monitor policy acknowledgments and training progress in real-time, ensuring organization-wide compliance visibility.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Audit-Ready Documentation</h3>
                <p className="text-gray-700">
                  Automatically generate comprehensive audit trails showing both training completion and policy acknowledgments for regulatory compliance.
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Role-Specific Training</h3>
                <p className="text-gray-700">
                  Assign different policies and training modules based on employee roles, ensuring relevant and targeted compliance education.
                </p>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Streamlined Workflow</h3>
                <p className="text-gray-700">
                  Eliminate the complexity of managing separate training and policy systems with our unified platform approach.
                </p>
              </div>
              
              <div className="bg-red-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost-Effective Solution</h3>
                <p className="text-gray-700">
                  Starting at just $19.99, get both comprehensive HIPAA training and policy management in one affordable package.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Beyond Traditional Training-Only Solutions
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 bg-purple-50">
                  <h3 className="text-xl font-semibold text-purple-800 mb-6">HIPAA Trainer Platform</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Interactive HIPAA training</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Integrated policy review</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Real-time admin tracking</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Automated audit trails</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Role-specific assignments</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Starting at $19.99</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-6">Traditional Training Solutions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Basic HIPAA training</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>No policy integration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Limited tracking capabilities</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Manual audit preparation</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Generic training content</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Higher pricing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-800 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your HIPAA Compliance?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join organizations that have streamlined their compliance with integrated policy review training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="bg-white text-purple-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Start Policy Review Training
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Schedule Demo
              </Link>
            </div>
            <p className="text-sm text-purple-200 mt-6">
              Free trial available • No credit card required • Setup in minutes
            </p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
