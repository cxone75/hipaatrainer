'use client';

import { useState, useEffect, Fragment } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import Head from 'next/head';
import LandingHeader from './components/Layout/LandingHeader';
import LandingFooter from './components/Layout/LandingFooter';
import { BorderBeam } from './components/ui/border-beam';
import { FeaturesSectionWithHoverEffects } from './components/ui/feature-section-with-hover-effects';
import { X } from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(0);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stripe price IDs - replace with your actual Stripe price IDs
  const stripePrices = {
    'Founding Member': 'price_1RXSiTPaLd3fbhKYN7ah2M7x', // Replace with actual price ID
    'Early Bird': 'price_1RXT3SPaLd3fbhKYbqfnlKEo', // Replace with actual price ID
  };

  const handlePlanSelection = (planName) => {
    if (planName === 'Free' || planName === 'Regular') {
      setShowWaitlistModal(true);
      return;
    }

    if (stripePrices[planName]) {
      setSelectedPlan(planName);
      setShowCheckoutModal(true);
    }
  };

  const handleStripeCheckout = async (e) => {
    e.preventDefault();

    if (!checkoutEmail || !selectedPlan) {
      alert('Please enter your email address');
      return;
    }

    setProcessingPayment(true);

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: stripePrices[selectedPlan],
          planName: selectedPlan,
          email: checkoutEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { clientSecret } = await response.json();

      // Initialize Stripe
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Create embedded checkout
      const checkout = await stripe.initEmbeddedCheckout({
        clientSecret,
      });

      // Mount the checkout
      checkout.mount('#checkout');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  useEffect(() => {
    // Fixed target date: 90 days from June 1st, 2025
    const startDate = new Date('2025-05-15');
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

  // Debug logging
  console.log('Modal state:', showWaitlistModal);

  const handleNewsletterSubscription = async (e: React.FormEvent) => {
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

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use the correct API endpoint for the environment
      // In Replit, use the relative path to proxy through Next.js
      const apiUrl = '/api/waitlist/join';

      console.log('Attempting to submit to:', apiUrl);
      console.log('Email:', email);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setShowWaitlistModal(false);
          setIsSubmitted(false);
          setEmail('');
        }, 2000);
      } else if (response.status === 409) {
        // Email already on waitlist - treat as success
        setIsSubmitted(true);
        setTimeout(() => {
          setShowWaitlistModal(false);
          setIsSubmitted(false);
          setEmail('');
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', response.status, errorData);
        alert(errorData.error || `Failed to join waitlist (${response.status})`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to join waitlist. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetStarted = async (planType: string) => {
    console.log('handleGetStarted called with planType:', planType);

    if (planType === 'Regular') {
      // Handle regular plan - redirect to signup or payment
      alert('Regular plan selected - redirect to payment');
      return;
    }

    console.log('Setting selectedPlan to:', planType);
    setSelectedPlan(planType);
    setIsEmailModalOpen(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail) {
      alert('Please enter your email address');
      return;
    }

    try {
      // Save subscription interest to database
      const planDetails = {
        'Founding Member': { 
          price: 199, 
          features: ['Up to 50 users', 'All core features', '1-year money-back guarantee', 'Priority support'] 
        },
        'Early Bird': { 
          price: 299, 
          features: ['Up to 50 users', 'All core features', '1-year money-back guarantee', 'Standard support'] 
        },
        'Free': { 
          price: 0, 
          features: ['Up to 2 users', 'Compliance Dashboard', 'Risk Assessment', 'Training Tool', 'Community support'] 
        },
        'Regular': { 
          price: 19, 
          features: ['First 10 users', '$15/mo per 10 additional', 'All features', 'Standard support'] 
        }
      };

      const plan = planDetails[selectedPlan as keyof typeof planDetails];

      // Save subscription data
      const subscriptionData = {
        email: userEmail,
        plan_name: selectedPlan,
        plan_price: plan?.price || 0,
        features: plan?.features || []
      };

      console.log('Sending subscription data:', subscriptionData);

      const subscriptionResponse = await fetch('/api/subscriptions/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      console.log('Subscription response status:', subscriptionResponse.status);

      if (subscriptionResponse.ok || subscriptionResponse.status === 409) {
        console.log('Subscription interest saved to database (or already exists)');
        
        // Close email modal
        setIsEmailModalOpen(false);
        
        // Continue with Stripe checkout regardless of whether it was a new record or existing one
      } else {
        const errorData = await subscriptionResponse.json();
        console.error('Failed to save subscription:', errorData);
        throw new Error('Failed to save subscription data');
      }

      // Proceed with Stripe checkout
      const priceId = stripePrices[selectedPlan];

      if (!priceId) {
        throw new Error(`Price ID not found for selected plan: ${selectedPlan}`);
      }

      console.log('Creating Stripe checkout session with:', {
        priceId,
        planName: selectedPlan,
        email: userEmail
      });

      const requestBody = {
        priceId,
        planName: selectedPlan,
        email: userEmail,
      };

      console.log('Sending request body to Stripe API:', JSON.stringify(requestBody, null, 2));

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Stripe checkout response status:', response.status);
      console.log('Stripe checkout response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Stripe checkout error response text:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          console.error('Stripe checkout error data:', errorData);
          throw new Error(`Failed to create checkout session: ${errorData.error}`);
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          throw new Error(`Failed to create checkout session: ${response.status} ${response.statusText}`);
        }
      }

      const responseData = await response.json();
      console.log('Stripe checkout response data:', responseData);
      
      const { clientSecret } = responseData;
      console.log('Received client secret:', clientSecret ? 'Yes' : 'No');
      
      if (!clientSecret) {
        throw new Error('No client secret received from Stripe');
      }

      // Initialize Stripe
      console.log('Initializing Stripe with publishable key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Key exists' : 'Key missing');
      
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      if (!stripe) {
        console.error('Stripe failed to initialize');
        throw new Error('Stripe failed to initialize');
      }

      console.log('Stripe initialized successfully');

      // Create embedded checkout
      console.log('Creating embedded checkout with client secret');
      const checkout = await stripe.initEmbeddedCheckout({
        clientSecret,
      });

      console.log('Embedded checkout created successfully');

      // Mount the checkout
      console.log('Mounting checkout to #checkout element');
      
      // Clear any existing content in the checkout div
      const checkoutElement = document.getElementById('checkout');
      
      if (!checkoutElement) {
        console.error('Checkout element not found - creating it dynamically');
        // Create the checkout element if it doesn't exist
        const newCheckoutElement = document.createElement('div');
        newCheckoutElement.id = 'checkout';
        newCheckoutElement.className = 'min-h-[400px] w-full';
        document.body.appendChild(newCheckoutElement);
      } else {
        // Clear existing content
        checkoutElement.innerHTML = '';
      }
      
      try {
        // Close email modal and show checkout modal
        setIsEmailModalOpen(false);
        setIsCheckoutModalOpen(true);
        
        // Wait for modal to render, then mount checkout
        setTimeout(() => {
          const finalCheckoutElement = document.getElementById('stripe-checkout-container');
          if (finalCheckoutElement) {
            checkout.mount('#stripe-checkout-container');
            console.log('Checkout mounted successfully to stripe-checkout-container');
          } else {
            checkout.mount('#checkout');
            console.log('Checkout mounted successfully to fallback #checkout');
          }
        }, 100);
        
      } catch (mountError) {
        console.error('Error mounting checkout:', mountError);
        throw new Error(`Failed to mount checkout: ${mountError.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  // Enhanced structured data for homepage SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HIPAA Trainer - Online HIPAA Training",
    "applicationCategory": "EducationalApplication",
    "applicationSubCategory": "Healthcare Training Software",
    "operatingSystem": "Web Browser",
    "description": "Affordable HIPAA training online for small healthcare practices. Comprehensive compliance training platform with automated modules, risk assessments, and certification programs.",
    "url": "https://hipaatrainer.net",
    "downloadUrl": "https://hipaatrainer.net",
    "softwareVersion": "1.0",
    "releaseNotes": "Initial release with comprehensive HIPAA compliance features",
    "screenshot": "https://hipaatrainer.net/HIPAATRAINER-DEMO-DASHBOARD.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Plan",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "Up to 2 users with basic compliance features"
      },
      {
        "@type": "Offer",
        "name": "Founding Member",
        "price": "199",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "Lifetime access for up to 50 users with all features"
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "HIPAA Trainer",
      "url": "https://hipaatrainer.net",
      "logo": "https://hipaatrainer.net/hipaatrainer-logo.png",
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@hipaatrainer.net",
        "availableLanguage": "English"
      }
    },
    "featureList": [
      "HIPAA Compliance Dashboard",
      "Automated Training Management",
      "Risk Assessment Tools",
      "Policy Management",
      "Audit Preparation",
      "Regulatory Updates",
      "Employee Management",
      "Compliance Reporting"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Healthcare Organizations"
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "I'm a small team—can HIPAA Trainer really scale down for us?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes—no IT needed, no hidden fees, onboarding in under one hour. We've designed HIPAA Trainer specifically for small healthcare teams who don't have dedicated compliance departments."
        }
      },
      {
        "@type": "Question",
        "name": "How do you handle regulatory updates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We monitor regulatory changes continuously and automatically update your policies and training materials. You'll receive notifications about any changes that affect your organization, with clear guidance on what actions to take."
        }
      },
      {
        "@type": "Question",
        "name": "How fast can we be audit-ready?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most teams are audit-ready within 2-4 weeks. Our system generates comprehensive audit bundles in minutes, including all required documentation, training records, and compliance evidence."
        }
      },
      {
        "@type": "Question",
        "name": "Is HIPAA Trainer itself HIPAA-compliant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We're SOC 2 certified, use enterprise-grade encryption, and follow all HIPAA requirements. We practice what we preach when it comes to data security and privacy."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>HIPAA Training Online | Affordable Compliance for Small Practices - HIPAA Trainer</title>
        <meta name="description" content="Discover affordable HIPAA training online designed specifically for small healthcare practices. Complete HIPAA compliance training with automated modules, risk assessments, and audit preparation. Start free today." />
        <meta name="keywords" content="HIPAA training online, affordable HIPAA training, HIPAA compliance training, HIPAA training online for small practices, online HIPAA certification, healthcare compliance training, small practice HIPAA training, affordable healthcare compliance, HIPAA training courses, medical privacy training online" />
        <meta name="author" content="HIPAA Trainer Team" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="HIPAA Training Online | Affordable Compliance for Small Practices" />
        <meta property="og:description" content="Discover affordable HIPAA training online designed for small healthcare practices. Complete compliance training with automated modules and audit preparation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hipaatrainer.net" />
        <meta property="og:site_name" content="HIPAA Trainer" />
        <meta property="og:image" content="https://hipaatrainer.net/HIPAATRAINER-DEMO-DASHBOARD.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="HIPAA Trainer Compliance Dashboard - Healthcare Privacy Management Platform" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hipaatrainer" />
        <meta name="twitter:creator" content="@hipaatrainer" />
        <meta name="twitter:title" content="HIPAA Training Online | Affordable Compliance for Small Practices" />
        <meta name="twitter:description" content="Affordable HIPAA training online for small healthcare practices. Complete compliance training with automated modules and free starter plan." />
        <meta name="twitter:image" content="https://hipaatrainer.net/HIPAATRAINER-DEMO-DASHBOARD.png" />
        <meta name="twitter:image:alt" content="HIPAA Trainer Dashboard Preview" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="application-name" content="HIPAA Trainer" />
        <meta name="apple-mobile-web-app-title" content="HIPAA Trainer" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="Content-Language" content="en-US" />
        
        {/* Canonical and Alternate URLs */}
        <link rel="canonical" href="https://hipaatrainer.net" />
        <link rel="alternate" type="application/rss+xml" title="HIPAA Trainer Blog RSS Feed" href="https://hipaatrainer.net/blog/rss.xml" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </Head>

      <LandingHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20 overflow-hidden" itemScope itemType="https://schema.org/WebPageElement">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/5 to-pink-600/5"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" itemProp="headline">
              HIPAA Training Online<br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Affordable Compliance for Small Practices</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" itemProp="description">
              Discover affordable HIPAA training online designed specifically for small healthcare practices. Our comprehensive compliance training platform offers automated modules, risk assessments, and certification programs that fit your budget and schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={scrollToPricing}
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 text-lg shadow-lg transform hover:scale-105"
              >
                Start For Free
              </button>
              <button 
                onClick={() => setShowDemoModal(true)}
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 text-lg"
              >
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
      <section className="py-20 bg-white" itemScope itemType="https://schema.org/Product">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" itemProp="name">Track Your HIPAA Training Progress</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" itemProp="description">
              Our online HIPAA training dashboard gives small practices real-time visibility into staff training progress, compliance status, and certification tracking with affordable, automated solutions.
            </p>
          </header>
          <div className="relative max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 shadow-2xl">
              <img 
                src="/HIPAATRAINER-DEMO-DASHBOARD.png" 
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Affordable HIPAA Training for Small Practices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're running a solo practice, small clinic, or dental office, our online HIPAA training platform provides affordable compliance solutions that scale with your team without breaking the budget.
            </p>
          </div>

          <FeaturesSectionWithHoverEffects />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white" itemScope itemType="https://schema.org/ItemList">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" itemProp="name">Complete Online HIPAA Training Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" itemProp="description">
              Our affordable HIPAA training online platform simplifies compliance for small practices with easy-to-use features. Comprehensive training modules, automated tracking, and certification management designed specifically for budget-conscious healthcare teams.
            </p>
          </header>

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
      <section id="pricing" className="py-20 bg-white pt-32" itemScope itemType="https://schema.org/PriceSpecification">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Affordable HIPAA Training Online - Pre-Launch Pricing
            </h2>
            <p className="text-xl text-gray-600">Get lifetime access to our complete online HIPAA training platform at pre-launch prices. Perfect for small practices seeking affordable compliance solutions.</p>
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
                price: "$199",
                period: "lifetime",
                popular: true,
                features: ["Up to 50 users", "All core features", "1-year money-back guarantee", "Priority support"],
                buttonText: "Claim Your Founding Member Seat",
                promoText: "First 50 members only, going quickly"
              },
              {
                plan: "Early Bird",
                price: "$299",
                period: "lifetime", 
                popular: false,
                features: ["Up to 50 users", "All core features", "1-year money-back guarantee", "Standard support"],
                buttonText: "Become an Early Bird",
                promoText: "Next 100 customers only"
              },
              {
                plan: "Regular",
                price: "$19",
                period: "/month",
                popular: false,
                features: ["First 10 users", "$15/mo per 10 additional", "All features", "Standard support"],
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
                {/* Header Section */}
                <div className={`${tier.plan === 'Regular' ? 'bg-gray-500 text-white' : 'bg-gray-900 text-white'} p-8 rounded-t-2xl`}>
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
                      onClick={() => handleGetStarted(tier.plan)}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
      <section className="py-20 bg-white" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to the most common questions about HIPAA Trainer and healthcare compliance automation.</p>
          </header>

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

      {/* Combined CTA and Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white" itemScope itemType="https://schema.org/WebPageElement">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter Signup - Left Side */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Stay Updated on HIPAA Compliance</h3>
              <p className="text-lg mb-6 opacity-90">
                Get the latest insights, best practices, and regulatory updates delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubscription} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Main CTA - Right Side */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Affordable HIPAA Training Online?</h2>
              <p className="text-xl mb-8 opacity-90">
                Start your HIPAA compliance training today with our affordable online platform designed for small healthcare practices. Risk-free trial included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={scrollToPricing}
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg"
                >
                  Start For Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{zIndex: 9999}}>
          <div className="bg-white rounded-lg w-full max-w-md relative">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Join Our Waitlist
              </h3>
              <button
                onClick={() => setShowWaitlistModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!isSubmitted ? (
                <>
                  <p className="text-gray-600 mb-6">
                    Be the first to know when HIPAA Trainer launches! Get notified about early access, exclusive discounts, and launch updates.
                  </p>

                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    We respect your privacy. No spam, unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">You're on the list!</h4>
                  <p className="text-gray-600">
                    Thanks for joining! We'll notify you when HIPAA Trainer is ready.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stripe Checkout Modal */}
      {showCheckoutModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Complete Your Purchase</h3>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {!processingPayment ? (
                <form onSubmit={handleStripeCheckout}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">{selectedPlan}</h4>
                      <p className="text-2xl font-bold text-purple-600">
                        ${selectedPlan === 'Founding Member' ? '99' : '39'}
                        <span className="text-sm text-gray-500 font-normal"> one-time</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Proceed to Payment
                  </button>
                </form>
              ) : (
                <div>
                  <div className="mb-4 text-center">
                    <p className="text-gray-600">Processing your payment...</p>
                  </div>
                  <div id="checkout" className="min-h-[400px]">
                    {/* Stripe Embedded Checkout will be mounted here */}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Email Collection Modal */}
        {isEmailModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Get Started with {selectedPlan}</h3>
              <p className="text-gray-600 mb-6">
                Enter your email to proceed with your {selectedPlan} subscription.
              </p>
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                  required
                />
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEmailModalOpen(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stripe Checkout Modal */}
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-bold">Complete Your Payment</h3>
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="text-center mb-4">
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {selectedPlan} Plan
                  </p>
                  <p className="text-sm text-gray-600">
                    Complete your secure payment below
                  </p>
                </div>
                <div 
                  id="stripe-checkout-container" 
                  className="min-h-[500px] w-full"
                >
                  {/* Stripe checkout will be mounted here */}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Modal */}
        {showDemoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] relative">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold text-gray-900">HIPAA Trainer Demo</h3>
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
                  <iframe 
                    src="https://player.vimeo.com/video/1092653338?h=134b409ab3&badge=0&autopause=0&player_id=0&app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                    style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} 
                    title="HIPAA TRAINER DEMO"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        )}
      <LandingFooter />
    </div>
  );
}