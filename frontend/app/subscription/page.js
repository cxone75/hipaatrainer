
'use client';

import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';

export default function SubscriptionPage() {
  const [currentPlan] = useState({
    name: 'Free',
    billingCycle: 'Yearly',
    nextRenewal: 'N/A',
    maxUsers: 1,
    usersUsed: 0
  });

  const [accountStatus] = useState({
    status: 'Active',
    memberSince: 'May 2025'
  });

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Subscription' }
  ];

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      period: 'month',
      features: [
        '2 Properties',
        'Standard Templates',
        'PDF Downloads',
        'Email Support'
      ],
      recommended: false
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 19.99,
      period: 'month',
      features: [
        '5 Properties',
        'All Templates',
        'PDF & QR Code Downloads',
        'Priority Email Support'
      ],
      recommended: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 39.99,
      period: 'month',
      features: [
        'Unlimited Properties',
        'Premium Templates',
        'PDF, QR & Custom Domain',
        '24/7 Priority Support'
      ],
      recommended: true
    }
  ];

  const handleUpgrade = (planId) => {
    console.log('Upgrading to plan:', planId);
    // Handle upgrade logic here
    alert(`Upgrading to ${planId} plan...`);
  };

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscription</h1>
          <p className="text-gray-600">Manage your subscription plan and billing information</p>
        </div>

        {/* Current Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Subscription Card */}
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Subscription</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Plan</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {currentPlan.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Billing Cycle</span>
                <span className="font-medium">{currentPlan.billingCycle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Renewal</span>
                <span className="font-medium">{currentPlan.nextRenewal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Users</span>
                <span className="font-medium">{currentPlan.maxUsers}</span>
              </div>
            </div>
          </div>

          {/* Usage Card */}
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Usage</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Users</span>
                <span className="font-medium">{currentPlan.usersUsed}/{currentPlan.maxUsers}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(currentPlan.usersUsed / currentPlan.maxUsers) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                You've used {currentPlan.usersUsed} out of {currentPlan.maxUsers} users in your plan.
              </p>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {accountStatus.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">{accountStatus.memberSince}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View billing history →
              </button>
            </div>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Subscription Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="relative border rounded-lg p-6 hover:shadow-lg transition-shadow">
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Recommended
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                    <span className="text-base font-normal text-gray-600">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    plan.recommended
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Upgrade
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
