const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');

// Basic input sanitizer — strips HTML tags to prevent XSS in email body
const sanitize = (str) => (str || '').toString().replace(/<[^>]*>/g, '').trim().slice(0, 2000);

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // ─── Server-side Validation ───────────────────────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'A valid name (min 2 characters) is required.' });
    }
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }
    if (phone && !phoneRegex.test(phone)) {
      return res.status(400).json({ success: false, message: 'Phone number format is invalid.' });
    }
    if (!subject || subject.trim().length < 3) {
      return res.status(400).json({ success: false, message: 'A subject (min 3 characters) is required.' });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
    }

    // ─── Sanitize Inputs ──────────────────────────────────────────────────────
    const cleanName    = sanitize(name);
    const cleanEmail   = sanitize(email);
    const cleanPhone   = sanitize(phone);
    const cleanSubject = sanitize(subject);
    const cleanMessage = sanitize(message);

    // ─── Save to MongoDB ──────────────────────────────────────────────────────
    const newMessage = new ContactMessage({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
    });
    await newMessage.save();

    // ─── Send Email via Nodemailer ─────────────────────────────────────────────
    if (process.env.SMTP_HOST && process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"SUJJU Software Solutions" <${process.env.SMTP_EMAIL}>`,
        replyTo: cleanEmail,
        to: process.env.SMTP_EMAIL,
        subject: `[Contact Form] ${cleanSubject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background: #0A2F6B; color: white; padding: 24px;">
              <h2 style="margin: 0; font-size: 20px;">New Contact Form Submission</h2>
              <p style="margin: 4px 0 0; opacity: 0.8; font-size: 14px;">SUJJU Software Solutions Website</p>
            </div>
            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${cleanName}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${cleanEmail}">${cleanEmail}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td><td style="padding: 8px 0;">${cleanPhone || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Subject</td><td style="padding: 8px 0; font-weight: 600;">${cleanSubject}</td></tr>
              </table>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;">
              <h4 style="margin: 0 0 8px; color: #0A2F6B;">Message</h4>
              <p style="margin: 0; line-height: 1.6; color: #374151;">${cleanMessage}</p>
            </div>
            <div style="background: #F8FAFC; padding: 16px 24px; font-size: 12px; color: #94a3b8;">
              This message was submitted via the contact form on sujjusoftware.com
            </div>
          </div>
        `,
      });
    } else {
      console.warn('⚠️  SMTP not configured. Message saved to DB but email was not sent.');
    }

    res.status(201).json({ success: true, message: 'Your message has been received. We will get back to you soon!' });

  } catch (error) {
    console.error('Contact Form Error:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
  }
};

module.exports = { submitContactForm };
