'use client';

import { useState } from 'react';
import UpdateCard from './components/UpdateCard';
import ReminderModal from './components/ReminderModal';
import SuccessModal from './components/SuccessModal';
import ErrorModal from './components/ErrorModal';

export default function RegulatoryUpdates() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [isSettingReminder, setIsSettingReminder] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Regulatory Updates', href: '/regulatory' }
  ];

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
        overview: "The Department of Health and Human Services has revised the breach notification requirements under the HIPAA Privacy Rule.",
        requirements: [
          "Notify OCR within 60 days for breaches affecting 250+ individuals",
          "Update breach response procedures",
          "Enhance breach risk assessment protocols",
          "Review and update business associate agreements"
        ],
        timeline: "New threshold takes effect September 1, 2025",
        penalties: "Failure to report qualifying breaches may result in penalties up to $1.5 million"
      },
      source: "45 CFR § 164.408",
      lastUpdated: "2025-01-10"
    },
    {
      id: 3,
      title: "Updated Minimum Necessary Standard",
      description: "New guidance clarifies the minimum necessary standard for uses and disclosures of PHI.",
      impact: "Medium",
      effectiveDate: "2025-04-15",
      category: "Privacy Rule",
      guidance: {
        overview: "OCR has issued updated guidance on implementing the minimum necessary standard for protected health information.",
        requirements: [
          "Implement role-based access controls",
          "Regular review of access permissions",
          "Document minimum necessary determinations",
          "Train workforce on updated standards"
        ],
        timeline: "Compliance required by April 15, 2025",
        penalties: "Violations may result in fines from $100 to $50,000 per incident"
      },
      source: "45 CFR § 164.502(b)",
      lastUpdated: "2025-01-08"
    }
  ]);

  const handleViewDetails = (updateId) => {
    setExpandedCard(expandedCard === updateId ? null : updateId);
  };

  const handleSetReminder = async (update) => {
    setSelectedUpdate(update);
    setShowReminderModal(true);
  };

  const confirmSetReminder = async () => {
    setIsSettingReminder(true);
    try {
      // Simulate API call to set reminder
      const response = await fetch('/api/compliance/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Regulatory Compliance: ${selectedUpdate.title}`,
          description: selectedUpdate.description,
          dueDate: selectedUpdate.effectiveDate,
          type: 'regulatory_update',
          updateId: selectedUpdate.id
        }),
      });

      if (response.ok) {
        setShowReminderModal(false);
        setModalMessage('Reminder added to your calendar successfully!');
        setShowSuccessModal(true);
      } else {
        throw new Error('Failed to set reminder');
      }
    } catch (error) {
      console.error('Error setting reminder:', error);
      setShowReminderModal(false);
      setModalMessage('Failed to set reminder. Please try again.');
      setShowErrorModal(true);
    } finally {
      setIsSettingReminder(false);
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

        {/* Modals */}
        <ReminderModal
          isOpen={showReminderModal}
          onClose={() => setShowReminderModal(false)}
          onConfirm={confirmSetReminder}
          update={selectedUpdate}
          isLoading={isSettingReminder}
        />

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          message={modalMessage}
        />

        <ErrorModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          message={modalMessage}
        />
      </div>
  );
}