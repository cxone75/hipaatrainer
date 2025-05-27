
'use client';

import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import SRAGuide from './components/SRAGuide';
import VulnerabilityList from './components/VulnerabilityList';
import RemediationPlan from './components/RemediationPlan';
import BAAManagement from './components/BAAManagement';

export default function RiskAssessmentPage() {
  const [activeTab, setActiveTab] = useState('questionnaire');
  const [assessmentData, setAssessmentData] = useState({
    questionnaire: {},
    vulnerabilities: [],
    remediationPlan: [],
    baas: []
  });

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Security Risk Assessment' }
  ];

  const tabs = [
    { id: 'questionnaire', label: 'SRA Questionnaire', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z' },
    { id: 'remediation', label: 'Remediation Plan', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'baas', label: 'BAA Management', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];

  const handleGenerateReport = async () => {
    try {
      const response = await fetch('/api/risk-assessment/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `risk-assessment-report-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to generate report');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report');
    }
  };

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security Risk Assessment</h1>
            <p className="text-gray-600 mt-2">Comprehensive security evaluation and compliance management</p>
          </div>
          <button
            onClick={handleGenerateReport}
            className="bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-900 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Generate Report</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Risk Assessment Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <svg 
                  className={`w-5 h-5 mr-2 ${
                    activeTab === tab.id ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow border">
          {activeTab === 'questionnaire' && (
            <SRAGuide 
              assessmentData={assessmentData}
              onUpdateData={setAssessmentData}
            />
          )}
          {activeTab === 'vulnerabilities' && (
            <VulnerabilityList 
              vulnerabilities={assessmentData.vulnerabilities}
              onUpdateData={setAssessmentData}
            />
          )}
          {activeTab === 'remediation' && (
            <RemediationPlan 
              plan={assessmentData.remediationPlan}
              onUpdateData={setAssessmentData}
            />
          )}
          {activeTab === 'baas' && (
            <BAAManagement 
              baas={assessmentData.baas}
              onUpdateData={setAssessmentData}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
