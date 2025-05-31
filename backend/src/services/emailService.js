const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = this.createTransporter();
    this.fromAddress = process.env.EMAIL_FROM || 'noreply@hipaatracker.com';
    this.fromName = process.env.EMAIL_FROM_NAME || 'HIPAA Tracker';
  }

  createTransporter() {
    const emailProvider = process.env.EMAIL_PROVIDER || 'smtp';

    switch (emailProvider) {
      case 'sendgrid':
        return nodemailer.createTransporter({
          service: 'SendGrid',
          auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
          },
        });

      case 'mailgun':
        return nodemailer.createTransporter({
          service: 'Mailgun',
          auth: {
            user: process.env.MAILGUN_USERNAME,
            pass: process.env.MAILGUN_PASSWORD,
          },
        });

      case 'aws-ses':
        return nodemailer.createTransporter({
          SES: {
            region: process.env.AWS_REGION || 'us-east-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        });

      default: // SMTP
        return nodemailer.createTransporter({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
    }
  }

  async sendEmail({ to, subject, html, text, attachments = [] }) {
    try {
      const mailOptions = {
        from: `${this.fromName} <${this.fromAddress}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        text: text || this.stripHtml(html),
        attachments,
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      return {
        success: true,
        messageId: result.messageId,
      };
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  // Welcome email for new users
  async sendWelcomeEmail(user, temporaryPassword = null) {
    const subject = 'Welcome to HIPAA Tracker';
    const html = this.generateWelcomeEmailTemplate(user, temporaryPassword);
    
    return this.sendEmail({
      to: user.email,
      subject,
      html,
    });
  }

  // Password reset email
  async sendPasswordResetEmail(user, resetToken) {
    const subject = 'Password Reset Request - HIPAA Tracker';
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;
    const html = this.generatePasswordResetTemplate(user, resetUrl);
    
    return this.sendEmail({
      to: user.email,
      subject,
      html,
    });
  }

  // Account verification email
  async sendVerificationEmail(user, verificationToken) {
    const subject = 'Verify Your Email - HIPAA Tracker';
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
    const html = this.generateVerificationTemplate(user, verificationUrl);
    
    return this.sendEmail({
      to: user.email,
      subject,
      html,
    });
  }

  // Security alert email
  async sendSecurityAlertEmail(user, alertType, details) {
    const subject = `Security Alert - ${alertType}`;
    const html = this.generateSecurityAlertTemplate(user, alertType, details);
    
    return this.sendEmail({
      to: user.email,
      subject,
      html,
    });
  }

  // Role change notification
  async sendRoleChangeEmail(user, oldRole, newRole, changedBy) {
    const subject = 'Your Role Has Been Updated - HIPAA Tracker';
    const html = this.generateRoleChangeTemplate(user, oldRole, newRole, changedBy);
    
    return this.sendEmail({
      to: user.email,
      subject,
      html,
    });
  }

  // Account deactivation notification
  async sendAccountDeactivationEmail(user, reason = null) {
    const subject = 'Account Deactivated - HIPAA Tracker';
    const html = this.generateAccountDeactivationTemplate(user, reason);
    
    return this.sendEmail({
      to: user.email,
      subject,
      html,
    });
  }

  // Compliance report email
  async sendComplianceReportEmail(recipients, reportType, reportUrl, generatedBy) {
    const subject = `Compliance Report Ready - ${reportType}`;
    const html = this.generateComplianceReportTemplate(reportType, reportUrl, generatedBy);
    
    return this.sendEmail({
      to: recipients,
      subject,
      html,
    });
  }

  // Email templates
  generateWelcomeEmailTemplate(user, temporaryPassword) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to HIPAA Tracker, ${user.first_name}!</h2>
        
        <p>Your account has been created successfully. Here are your account details:</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Email:</strong> ${user.email}<br>
          <strong>Role:</strong> ${user.role?.name || 'User'}<br>
          ${temporaryPassword ? `<strong>Temporary Password:</strong> ${temporaryPassword}<br>` : ''}
        </div>
        
        ${temporaryPassword ? 
          '<p><strong>Important:</strong> Please log in and change your password immediately for security purposes.</p>' : 
          '<p>You can now log in to your account using your credentials.</p>'
        }
        
        <p>
          <a href="${process.env.FRONTEND_URL}/login" 
             style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Log In to HIPAA Tracker
          </a>
        </p>
        
        <p>If you have any questions, please contact your administrator.</p>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated message from HIPAA Tracker. Please do not reply to this email.
        </p>
      </div>
    `;
  }

  generatePasswordResetTemplate(user, resetUrl) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        
        <p>Hello ${user.first_name},</p>
        
        <p>We received a request to reset your password for your HIPAA Tracker account.</p>
        
        <p>
          <a href="${resetUrl}" 
             style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Reset Your Password
          </a>
        </p>
        
        <p>This link will expire in 1 hour for security purposes.</p>
        
        <p>If you didn't request this password reset, please ignore this email or contact your administrator if you have concerns.</p>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated message from HIPAA Tracker. Please do not reply to this email.
        </p>
      </div>
    `;
  }

  generateVerificationTemplate(user, verificationUrl) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify Your Email Address</h2>
        
        <p>Hello ${user.first_name},</p>
        
        <p>Please verify your email address to complete your HIPAA Tracker account setup.</p>
        
        <p>
          <a href="${verificationUrl}" 
             style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Verify Email Address
          </a>
        </p>
        
        <p>This verification link will expire in 24 hours.</p>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated message from HIPAA Tracker. Please do not reply to this email.
        </p>
      </div>
    `;
  }

  generateSecurityAlertTemplate(user, alertType, details) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Security Alert</h2>
        
        <p>Hello ${user.first_name},</p>
        
        <p>We detected ${alertType} on your HIPAA Tracker account.</p>
        
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Alert Details:</strong><br>
          ${Object.entries(details).map(([key, value]) => `<strong>${key}:</strong> ${value}`).join('<br>')}
        </div>
        
        <p>If this was you, no action is needed. If you don't recognize this activity, please contact your administrator immediately.</p>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated security message from HIPAA Tracker. Please do not reply to this email.
        </p>
      </div>
    `;
  }

  generateRoleChangeTemplate(user, oldRole, newRole, changedBy) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Role Updated</h2>
        
        <p>Hello ${user.first_name},</p>
        
        <p>Your role in HIPAA Tracker has been updated.</p>
        
        <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Previous Role:</strong> ${oldRole}<br>
          <strong>New Role:</strong> ${newRole}<br>
          <strong>Changed By:</strong> ${changedBy}
        </div>
        
        <p>This change may affect your access permissions. Please contact your administrator if you have any questions.</p>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated message from HIPAA Tracker. Please do not reply to this email.
        </p>
      </div>
    `;
  }

  generateAccountDeactivationTemplate(user, reason) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Account Deactivated</h2>
        
        <p>Hello ${user.first_name},</p>
        
        <p>Your HIPAA Tracker account has been deactivated.</p>
        
        ${reason ? `
          <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>Reason:</strong> ${reason}
          </div>
        ` : ''}
        
        <p>If you believe this is an error or have questions, please contact your administrator.</p>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated message from HIPAA Tracker. Please do not reply to this email.
        </p>
      </div>
    `;
  }

  generateComplianceReportTemplate(reportType, reportUrl, generatedBy) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Compliance Report Ready</h2>
        
        <p>A new compliance report has been generated:</p>
        
        <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Report Type:</strong> ${reportType}<br>
          <strong>Generated By:</strong> ${generatedBy}<br>
          <strong>Generated At:</strong> ${new Date().toLocaleString()}
        </div>
        
        <p>
          <a href="${reportUrl}" 
             style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Download Report
          </a>
        </p>
        
        <p>This report will be available for download for 30 days.</p>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated message from HIPAA Tracker. Please do not reply to this email.
        </p>
      </div>
    `;
  }

  // Utility function to strip HTML tags
  stripHtml(html) {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }

  // Test email configuration
  async testConfiguration() {
    try {
      await this.transporter.verify();
      return { success: true, message: 'Email configuration is valid' };
    } catch (error) {
      return { success: false, message: `Email configuration error: ${error.message}` };
    }
  }
}

module.exports = new EmailService();