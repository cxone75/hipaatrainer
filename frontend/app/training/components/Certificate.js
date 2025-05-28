'use client';

import { useState, useEffect } from 'react';

export default function Certificate({ courseTitle, courseId, template }) {
  const [certificateData, setCertificateData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    // Generate certificate data
    const generateCertificate = async () => {
      setIsGenerating(true);
      try {
        // Simulate certificate generation - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        const certData = {
          certificateId: `CERT-${courseId.toUpperCase()}-${Date.now()}`,
          courseName: courseTitle,
          studentName: 'John Doe', // This would come from user context
          completionDate: new Date().toLocaleDateString(),
          issueDate: new Date().toLocaleDateString(),
          expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 1 year
          certificateUrl: `/api/certificates/download/${courseId}`,
          verificationCode: Math.random().toString(36).substring(2, 15).toUpperCase(),
        };

        setCertificateData(certData);
        setDownloadUrl(certData.certificateUrl);
      } catch (error) {
        console.error('Error generating certificate:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateCertificate();
  }, [courseTitle, courseId]);

  const handleDownload = async () => {
    try {
      // This would typically make an API call to generate and download the PDF
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Failed to download certificate');
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate. Please try again.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${courseTitle} Completion Certificate`,
        text: `I have successfully completed the ${courseTitle} training course.`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `I have successfully completed the ${courseTitle} training course. Certificate ID: ${certificateData?.certificateId}`
      );
      alert('Certificate information copied to clipboard!');
    }
  };

  const handleVerify = () => {
    const verifyUrl = `/verify-certificate?code=${certificateData?.verificationCode}`;
    window.open(verifyUrl, '_blank');
  };

  if (isGenerating) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Generating Certificate</h3>
        <p className="text-gray-600">Please wait while we prepare your completion certificate...</p>
      </div>
    );
  }

  if (!certificateData) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate Error</h3>
        <p className="text-gray-600">Unable to generate your certificate. Please contact support.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
        <p className="text-gray-600">You have successfully completed the training course.</p>
      </div>

      {/* Certificate Preview */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 rounded-lg p-8 mb-8 text-center">
        <div className="max-w-md mx-auto">
          {/* Certificate Header */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-purple-900 mb-2">Certificate of Completion</h4>
            <div className="w-24 h-1 bg-purple-800 mx-auto"></div>
          </div>

          {/* Certificate Body */}
          <div className="space-y-4 text-gray-800">
            <p className="text-lg">This certifies that</p>
            <p className="text-2xl font-bold text-purple-900">{certificateData.studentName}</p>
            <p className="text-lg">has successfully completed</p>
            <p className="text-xl font-semibold text-purple-800">{certificateData.courseName}</p>
            <p className="text-sm text-gray-600">on {certificateData.completionDate}</p>
          </div>

          {/* Certificate Footer */}
          <div className="mt-8 pt-6 border-t border-purple-200">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                <p className="font-medium">Certificate ID</p>
                <p className="font-mono">{certificateData.certificateId}</p>
              </div>
              <div>
                <p className="font-medium">Valid Until</p>
                <p>{certificateData.expirationDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Certificate Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Course:</span>
              <span className="text-gray-900 font-medium">{certificateData.courseName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completion Date:</span>
              <span className="text-gray-900">{certificateData.completionDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Issue Date:</span>
              <span className="text-gray-900">{certificateData.issueDate}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Certificate ID:</span>
              <span className="text-gray-900 font-mono">{certificateData.certificateId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Verification Code:</span>
              <span className="text-gray-900 font-mono">{certificateData.verificationCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Valid Until:</span>
              <span className="text-gray-900">{certificateData.expirationDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={handleDownload}
          className="flex-1 bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-900 transition-colors flex items-center justify-center space-x-2"
          aria-label="Download Certificate as PDF"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          <span>Download Certificate</span>
        </button>

        <button
          onClick={handleShare}
          className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
          </svg>
          <span>Share Achievement</span>
        </button>

        <button
          onClick={handleVerify}
          className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5l-4-4 1.41-1.41L13 14.17l6.59-6.59L21 9l-8 8z"/>
          </svg>
          <span>Verify Certificate</span>
        </button>
      </div>

      {/* Additional Information */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">Important Information</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Your certificate is valid for one year from the completion date</li>
          <li>• Keep your verification code safe for future reference</li>
          <li>• Employers can verify your certificate using the verification code</li>
          <li>• You can re-download your certificate anytime from your profile</li>
        </ul>
      </div>
    </div>
  );
}