
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { name, email, company, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email using Resend
    // Note: Use a verified domain or the default Resend domain for testing
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    console.log('Attempting to send email from:', fromAddress);
    console.log('To:', ['info@hipaatrainer.net']);
    
    const emailData = await resend.emails.send({
      from: `HIPAA Trainer <${fromAddress}>`,
      to: ['info@hipaatrainer.net'],
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3>Message</h3>
            <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #1976d2;">
              This message was sent from the HIPAA Trainer contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}
Subject: ${subject}

Message:
${message}

Sent at: ${new Date().toLocaleString()}
      `,
    });

    console.log('Email sent successfully:', emailData);

    // Send auto-reply to the user
    const autoReplyData = await resend.emails.send({
      from: `HIPAA Trainer <${fromAddress}>`,
      to: [email],
      subject: 'Thank you for contacting HIPAA Trainer',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your message, ${name}!</h2>
          
          <p>We've received your inquiry about "${subject}" and will get back to you within 24 hours.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Message Summary</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="font-style: italic; line-height: 1.6;">"${message}"</p>
          </div>
          
          <p>In the meantime, feel free to explore our resources:</p>
          <ul>
            <li><a href="${process.env.NEXT_PUBLIC_SITE_URL}/landing">HIPAA Compliance Solutions</a></li>
            <li><a href="${process.env.NEXT_PUBLIC_SITE_URL}/landing#faq">Frequently Asked Questions</a></li>
            <li><a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog">HIPAA Blog & Resources</a></li>
          </ul>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            The HIPAA Trainer Team<br>
            <a href="mailto:info@hipaatrainer.net">info@hipaatrainer.net</a>
          </p>
        </div>
      `,
      text: `
Thank you for your message, ${name}!

We've received your inquiry about "${subject}" and will get back to you within 24 hours.

Your Message Summary:
Subject: ${subject}
Message: "${message}"

In the meantime, feel free to explore our resources at ${process.env.NEXT_PUBLIC_SITE_URL}

Best regards,
The HIPAA Trainer Team
info@hipaatrainer.net
      `,
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully',
        emailId: emailData.data?.id 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data || error.response
    });
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send message. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          type: error.constructor.name,
          apiKey: process.env.RESEND_API_KEY ? 'Set' : 'Not set'
        } : undefined
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}
