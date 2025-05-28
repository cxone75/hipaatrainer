
'use client';

import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import UpdateCard from './components/UpdateCard';

export default function RegulatoryUpdates() {
  const [expandedCard, setExpandedCard] = useState(null);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Regulatory Updates', href: '/regulatory' }
  ];

  const handleViewDetails = (updateId) => {
    setExpandedCard(expandedCard === updateId ? null : updateId);
  };

  const [regulatoryUpdates] = useState([
    {
      id: 1,
      title: "2025 Security Rule Update: MFA Required",
      description: "New HIPAA Security Rule requirements mandate multi-factor authentication for all covered entities accessing ePHI.",
      impact: "High",
      effectiveDate: "2025-07-01",
      category: "Security Rule",
      guidance: {
        overview: "The Office for Civil Rights (OCR) has updated the HIPAA Security Rule to require multi-factor authentication (MFA) for all systems that access, store, or transmit electronic protected health information (ePHI).",
        requirements: [
          "Implement MFA for all user accounts accessing ePHI",
          "Use NIST-approved authentication methods",
          "Maintain audit logs of authentication attempts",
          "Provide security awareness training on MFA"
        ],
        timeline: "Organizations have until July 1, 2025 to implement compliant MFA systems",
        penalties: "Non-compliance may result in fines ranging from $100 to $50,000 per violation"
      },
      source: "45 CFR § 164.312(a)(2)(i)",
      lastUpdated: "2025-01-15"
    },
    {
      id: 2,
      title: "Breach Notification Threshold Changes",
      description: "OCR has lowered the breach notification threshold from 500 to 250 affected individuals.",
      impact: "Medium",
      effectiveDate: "2025-09-01",
      category: "Breach Notification",
      guidance: {
        overview: "The breach notification rule has been updated to require notification for breaches affecting 250 or more individuals, down from the previous threshold of 500.",
        requirements: [
          "Update breach response procedures",
          "Revise risk assessment criteria",
          "Train staff on new thresholds",
          "Update business associate agreements"
        ],
        timeline: "New requirements take effect September 1, 2025",
        penalties: "Failure to notify may result in fines up to $1.5 million per incident"
      },
      source: "45 CFR § 164.408",
      lastUpdated: "2025-01-10"
    },
    {
      id: 3,
      title: "Business Associate Agreement Updates",
      description: "New provisions required for cloud service providers and AI/ML systems handling PHI.",
      impact: "High",
      effectiveDate: "2025-06-01",
      category: "Business Associates",
      guidance: {
        overview: "Business Associate Agreements must now include specific provisions for cloud computing and artificial intelligence systems that process PHI.",
        requirements: [
          "Include cloud-specific security requirements",
          "Address AI/ML algorithm transparency",
          "Specify data residency requirements",
          "Include incident response procedures"
        ],
        timeline: "All new BAAs must comply by June 1, 2025. Existing agreements must be updated by December 31, 2025",
        penalties: "Non-compliant BAAs may result in fines up to $1.9 million"
      },
      source: "45 CFR § 164.502(e)",
      lastUpdated: "2025-01-08"
    },
    {
      id: 4,
      title: "Telehealth Privacy Enhancements",
      description: "Enhanced privacy protections for telehealth platforms and remote patient monitoring.",
      impact: "Medium",
      effectiveDate: "2025-08-15",
      category: "Privacy Rule",
      guidance: {
        overview: "New privacy protections specifically address telehealth platforms, video conferencing, and remote patient monitoring systems.",
        requirements: [
          "Implement end-to-end encryption for video calls",
          "Provide patient consent for recording",
          "Secure storage of telehealth recordings",
          "Patient access to telehealth records"
        ],
        timeline: "Compliance required by August 15, 2025",
        penalties: "Violations may result in fines ranging from $100 to $25,000 per incident"
      },
      source: "45 CFR § 164.502",
      lastUpdated: "2025-01-05"
    }
  ]);

  const handleExpandCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleSetReminder = async (update) => {
    try {
      // Simulate API call to set reminder
      const response = await fetch('/api/compliance/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Regulatory Compliance: ${update.title}`,
          description: update.description,
          dueDate: update.effectiveDate,
          type: 'regulatory_update',
          updateId: update.id
        }),
      });

      if (response.ok) {
        alert('Reminder added to your calendar successfully!');
      } else {
        throw new Error('Failed to set reminder');
      }
    } catch (error) {
      console.error('Error setting reminder:', error);
      alert('Failed to set reminder. Please try again.');
    }
  };

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Regulatory Updates
          </h1>
          <p className="text-gray-600">
            Stay informed about the latest HIPAA and healthcare privacy regulations affecting your organization.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
              Category:
            </label>
            <select
              id="category-filter"
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Categories</option>
              <option value="security-rule">Security Rule</option>
              <option value="privacy-rule">Privacy Rule</option>
              <option value="breach-notification">Breach Notification</option>
              <option value="business-associates">Business Associates</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="impact-filter" className="text-sm font-medium text-gray-700">
              Impact:
            </label>
            <select
              id="impact-filter"
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Impacts</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Update Cards */}
        <div className="space-y-6">
          {regulatoryUpdates.map((update) => (
            <UpdateCard
              key={update.id}
              update={update}
              isExpanded={expandedCard === update.id}
              onSetReminder={() => handleSetReminder(update)}
              onViewDetails={handleViewDetails}
              getImpactColor={getImpactColor}
            />
          ))}
        </div>

        {/* No updates message */}
        {regulatoryUpdates.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No regulatory updates</h3>
            <p className="text-gray-600">Check back later for the latest regulatory information.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
