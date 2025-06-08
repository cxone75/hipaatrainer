
const { Resend } = require('resend');

class ResendEmailService {
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    this.fromName = process.env.EMAIL_FROM_NAME || 'HIPAA Tracker';
  }

  async sendPurchaseConfirmationEmail(customerEmail, planName, planPrice, features) {
    try {
      const subject = 'Purchase Confirmation - HIPAA Tracker';
      const html = this.generatePurchaseConfirmationTemplate(customerEmail, planName, planPrice, features);

      const emailData = await this.resend.emails.send({
        from: `${this.fromName} <${this.fromAddress}>`,
        to: [customerEmail],
        subject,
        html,
      });

      return {
        success: true,
        messageId: emailData.data?.id,
      };
    } catch (error) {
      console.error('Failed to send purchase confirmation email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  generatePurchaseConfirmationTemplate(customerEmail, planName, planPrice, features) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>🎉 Welcome to HIPAA Tracker!</h2>
        
        <p>Thank you for your purchase! Your subscription to HIPAA Tracker has been successfully activated.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Purchase Details</h3>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Plan:</strong> ${planName}</p>
          <p><strong>Price:</strong> $${planPrice}</p>
          ${features && features.length > 0 ? `
            <p><strong>Features included:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              ${features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
        
        <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>🚀 Next Steps</h3>
          <ol>
            <li>Log in to your HIPAA Tracker dashboard</li>
            <li>Complete your organization setup</li>
            <li>Start tracking your compliance progress</li>
          </ol>
        </div>
        
        <p>
          <a href="${process.env.FRONTEND_URL || 'https://hipaatracker.com'}/app" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Access Your Dashboard
          </a>
        </p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-radius: 5px;">
          <h4>Need Help?</h4>
          <p>Our support team is here to help you get started:</p>
          <ul>
            <li>📧 Email: support@hipaatracker.com</li>
            <li>📚 <a href="${process.env.FRONTEND_URL || 'https://hipaatracker.com'}/docs">Documentation</a></li>
            <li>💬 Live chat available in your dashboard</li>
          </ul>
        </div>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">
          Best regards,<br>
          The HIPAA Tracker Team<br>
          <a href="mailto:support@hipaatracker.com">support@hipaatracker.com</a>
        </p>
        
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    `;
  }

  async testConfiguration() {
    try {
      if (!process.env.RESEND_API_KEY) {
        return { success: false, message: 'RESEND_API_KEY environment variable is not set' };
      }
      return { success: true, message: 'Resend email configuration is valid' };
    } catch (error) {
      return { success: false, message: `Resend configuration error: ${error.message}` };
    }
  }
}

module.exports = new ResendEmailService();
