
import Link from 'next/link';
import LandingHeader from '../components/Layout/LandingHeader';
import LandingFooter from '../components/Layout/LandingFooter';

export const metadata = {
  title: 'HIPAA Training for Small Practices | Affordable & Easy',
  description: 'Affordable HIPAA training for small practices with policy review and admin tools. Plans start at $399/year. Start your free trial!',
  keywords: 'HIPAA Training for Small Practices, Affordable HIPAA Training, HIPAA Compliance Training, Small Practice HIPAA, Budget HIPAA Training',
  openGraph: {
    title: 'HIPAA Training for Small Practices | Affordable & Easy',
    description: 'Affordable HIPAA training for small practices with policy review and admin tools. Plans start at $399/year. Start your free trial!',
    type: 'website',
    url: 'https://hipaatrainer.com/small-practices'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIPAA Training for Small Practices | Affordable & Easy',
    description: 'Affordable HIPAA training for small practices with policy review and admin tools. Plans start at $399/year. Start your free trial!'
  },
  alternates: {
    canonical: 'https://hipaatrainer.com/small-practices'
  }
};

export default function SmallPracticesPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                HIPAA Training for Small Practices Made Simple
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Stop struggling with complex HIPAA requirements. Our platform is designed specifically for small healthcare practices with limited budgets and time constraints. Get fully compliant with our Professional Plan for just $399/year.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pricing"
                  className="bg-purple-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-900 transition-colors"
                >
                  Get Compliant for $399/Year
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-purple-800 text-purple-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors"
                >
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                We Understand Small Practice Challenges
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Small practices face unique HIPAA compliance challenges that larger organizations don't understand.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Limited Budget</h3>
                <p className="text-gray-600">Enterprise solutions cost thousands. You need affordable compliance that fits your budget.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Time Constraints</h3>
                <p className="text-gray-600">You're busy treating patients, not managing compliance paperwork and training schedules.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No IT Department</h3>
                <p className="text-gray-600">Complex systems requiring technical setup are out of reach. You need simple, works-out-of-the-box solutions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything You Need in One Simple Platform
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our Professional Plan includes all essential HIPAA compliance tools designed for small practices.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link href="/policy-review-training" className="hover:text-purple-600 transition-colors">
                    Policy Review Training
                  </Link>
                </h3>
                <p className="text-gray-600">Combined training and policy review in one streamlined process. No separate systems to manage.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Dashboard</h3>
                <p className="text-gray-600">Track all employee training, policy acknowledgments, and compliance status from one simple dashboard.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Free BAA Templates</h3>
                <p className="text-gray-600">Ready-to-use Business Associate Agreement templates. No lawyer fees, no complex legal language.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Role-Specific Training</h3>
                <p className="text-gray-600">Tailored training for dental, medical, and administrative staff. Only learn what's relevant to each role.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Certificates</h3>
                <p className="text-gray-600">Download compliance certificates immediately after training completion. Perfect for audits and documentation.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Automated Updates</h3>
                <p className="text-gray-600">Stay current with HIPAA changes automatically. We monitor regulations so you don't have to.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Story</h2>
                <h3 className="text-2xl font-semibold text-purple-800">
                  How a 10-Person Dental Office Saved 20 Hours with Our Platform
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">The Challenge</h4>
                    <p className="text-gray-700">
                      Mountain View Dental was spending 20+ hours annually on HIPAA training coordination, policy distribution, and tracking compliance across their 10-person team.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">The Solution</h4>
                    <p className="text-gray-700">
                      With HIPAA Trainer's integrated policy review and training system, they automated the entire process and gained real-time visibility into team compliance.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">The Results</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Saved 20 hours annually on compliance management
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        100% staff completion rate within first week
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Reduced audit preparation from 2 weeks to 2 hours
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        ROI: $2,000+ in time savings vs. $399 annual cost
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="text-4xl font-bold text-purple-800 mb-2">20 Hours</div>
                    <div className="text-gray-600 mb-4">Saved Annually</div>
                    <div className="text-2xl font-bold text-green-600 mb-2">$2,000+</div>
                    <div className="text-gray-600 mb-4">Value Generated</div>
                    <div className="text-lg font-semibold text-gray-900">
                      "HIPAA Trainer transformed our compliance process from a dreaded annual task into a simple, automated system."
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      - Dr. Sarah Chen, Mountain View Dental
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Small Practices Choose HIPAA Trainer
              </h2>
              <p className="text-xl text-gray-600">
                Compare our small practice-focused approach with traditional enterprise solutions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 border-2 border-purple-200">
                <h3 className="text-2xl font-semibold text-purple-800 mb-6 text-center">HIPAA Trainer</h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>$399/year for unlimited users</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Setup in under 1 hour</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>No IT support required</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Integrated policy review + training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Role-specific training (dental, medical)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Free BAA templates included</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-8 border border-gray-300">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Enterprise Solutions</h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>$3,000+ per year minimum</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Weeks or months to implement</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Requires dedicated IT support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Separate systems for policies/training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Generic training modules</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Additional legal fees for documents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-800 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Simplify Your HIPAA Compliance?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join hundreds of small practices who have streamlined their HIPAA compliance with our affordable, easy-to-use platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/pricing"
                className="bg-white text-purple-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Compliant for $399/Year
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Schedule Demo
              </Link>
            </div>
            <p className="text-sm text-purple-200">
              Free trial available • No credit card required • Setup in under 1 hour
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center text-sm">
              <Link href="/policy-review-training" className="text-purple-200 hover:text-white transition-colors">
                Learn about Policy Review Training →
              </Link>
              <Link href="/blog" className="text-purple-200 hover:text-white transition-colors">
                Read HIPAA for Small Practices Guide →
              </Link>
              <Link href="/pricing" className="text-purple-200 hover:text-white transition-colors">
                View All Pricing Plans →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
