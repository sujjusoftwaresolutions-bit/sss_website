const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');

// Basic input sanitizer — strips HTML tags to prevent XSS in email body
const sanitize = (str) => (str || '').toString().replace(/<[^>]*>/g, '').trim().slice(0, 2000);

// Always deliver contact form emails to this address
const ADMIN_EMAIL = 'sujjusoftwaresolutions@gmail.com';

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

    // ─── Send Email via Gmail SMTP ────────────────────────────────────────────
    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_EMAIL,      // sujjusoftwaresolutions@gmail.com
          pass: process.env.SMTP_PASSWORD,   // Gmail App Password (16-char)
        },
      });

      // Notify admin (SUJJU inbox)
      await transporter.sendMail({
        from: `"SUJJU Software Solutions" <${process.env.SMTP_EMAIL}>`,
        replyTo: cleanEmail,
        to: ADMIN_EMAIL,
        subject: `📩 [Contact Form] ${cleanSubject} – from ${cleanName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0A2F6B 0%, #0d3a85 100%); color: white; padding: 28px 24px;">
              <h2 style="margin: 0; font-size: 22px;">📬 New Contact Form Submission</h2>
              <p style="margin: 6px 0 0; opacity: 0.8; font-size: 14px;">SUJJU Software Solutions — Website</p>
            </div>
            <div style="padding: 28px 24px; background: #fff;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 110px;">👤 Name</td>
                  <td style="padding: 10px 0; font-weight: 700; color: #1e293b;">${cleanName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px;">📧 Email</td>
                  <td style="padding: 10px 0;"><a href="mailto:${cleanEmail}" style="color: #0A2F6B; font-weight: 600;">${cleanEmail}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px;">📞 Phone</td>
                  <td style="padding: 10px 0; color: #374151;">${cleanPhone || '<em style="color:#94a3b8;">Not provided</em>'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px;">📌 Subject</td>
                  <td style="padding: 10px 0; font-weight: 700; color: #1e293b;">${cleanSubject}</td>
                </tr>
              </table>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
              <h4 style="margin: 0 0 10px; color: #0A2F6B; font-size: 15px;">💬 Message</h4>
              <p style="margin: 0; line-height: 1.8; color: #374151; background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #D4AF37;">${cleanMessage}</p>
            </div>
            <div style="background: #F8FAFC; padding: 16px 24px; font-size: 12px; color: #94a3b8; text-align: center;">
              Submitted via the contact form on <strong>${(process.env.FRONTEND_URL || 'https://sujjusoftware.com').replace(/^https?:\/\//, '')}</strong> · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </div>
          </div>
        `,
      });

      // Auto-reply to the user who submitted
      await transporter.sendMail({
        from: `"SUJJU Software Solutions" <${process.env.SMTP_EMAIL}>`,
        to: cleanEmail,
        subject: `We received your message – SUJJU Software Solutions`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0A2F6B 0%, #0d3a85 100%); color: white; padding: 28px 24px; text-align: center;">
              <h2 style="margin: 0; font-size: 22px;">Thank You, ${cleanName}! 🙏</h2>
              <p style="margin: 8px 0 0; opacity: 0.85; font-size: 15px;">We've received your message and will respond within 24 hours.</p>
            </div>
            <div style="padding: 28px 24px; background: #fff;">
              <p style="margin: 0 0 16px; color: #374151; line-height: 1.7;">Hi <strong>${cleanName}</strong>,</p>
              <p style="margin: 0 0 16px; color: #374151; line-height: 1.7;">
                Thank you for reaching out to <strong>SUJJU Software Solutions</strong>. Our team has received your enquiry regarding <em>"${cleanSubject}"</em> and we will get back to you as soon as possible.
              </p>
              <p style="margin: 0; color: #374151; line-height: 1.7;">
                In the meantime, feel free to explore our services at <a href="${process.env.FRONTEND_URL || 'https://sujjusoftware.com'}" style="color: #D4AF37;">${(process.env.FRONTEND_URL || 'https://sujjusoftware.com').replace(/^https?:\/\//, '')}</a>.
              </p>
            </div>
            <div style="background: #F8FAFC; padding: 16px 24px; font-size: 12px; color: #94a3b8; text-align: center;">
              © SUJJU Software Solutions · <a href="mailto:sujjusoftwaresolutions@gmail.com" style="color: #94a3b8;">sujjusoftwaresolutions@gmail.com</a>
            </div>
          </div>
        `,
      });

      console.log(`✅ Contact email sent: "${cleanSubject}" from ${cleanEmail}`);
    } else {
      console.warn('⚠️  SMTP_EMAIL or SMTP_PASSWORD not set. Message saved to DB but email was NOT sent.');
    }

    res.status(201).json({ success: true, message: 'Your message has been received. We will get back to you soon!' });

  } catch (error) {
    console.error('Contact Form Error:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
  }
};

module.exports = { submitContactForm };
