
const express = require('express');
const resendEmailService = require('../services/resendEmailService');

const router = express.Router();

// Test endpoint to verify Resend email configuration
router.post('/test-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email address is required' 
      });
    }

    // Test configuration first
    const configTest = await resendEmailService.testConfiguration();
    if (!configTest.success) {
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error',
        details: configTest.message
      });
    }

    // Send test email
    const result = await resendEmailService.sendPurchaseConfirmationEmail(
      email,
      'Test Plan',
      99.99,
      ['Test Feature 1', 'Test Feature 2', 'Priority Support']
    );

    res.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

// Test endpoint to check Resend configuration without sending email
router.get('/test-email-config', async (req, res) => {
  try {
    const configTest = await resendEmailService.testConfiguration();
    
    res.json({
      success: configTest.success,
      message: configTest.message,
      environment: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        fromEmail: process.env.RESEND_FROM_EMAIL || 'info@updates.hipaatrainer.net',
        fromName: process.env.EMAIL_FROM_NAME || 'HIPAA Tracker'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Configuration test failed',
      error: error.message
    });
  }
});

module.exports = router;
