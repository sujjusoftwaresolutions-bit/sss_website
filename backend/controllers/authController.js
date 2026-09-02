const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'sujju_secret_key_2026', {
    expiresIn: '30d',
  });
};

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ── Nodemailer transporter (Production SMTP / Gmail) ──────────────────────────
const createTransporter = () => {
  const user = process.env.SMTP_EMAIL || process.env.EMAIL_USER || 'sujjusoftwaresolutions@gmail.com';
  const rawPass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASS || 'qfcy rrfl cygg lxxm';
  const pass = rawPass.replace(/\s+/g, ''); // Clean 16-character App Password (removes any spaces)
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;

  if (!user || !pass) {
    return null; // Email credentials missing
  }

  // If using Gmail, use service: 'gmail' which handles ports & SSL automatically
  if (user.toLowerCase().includes('@gmail.com') || host.includes('gmail')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
};

// ── Send OTP Email ─────────────────────────────────────────────────────────────
const sendOTPEmail = async (email, otp) => {
  const transporter = createTransporter();
  const fromEmail = process.env.SMTP_EMAIL || process.env.EMAIL_USER || 'noreply@sujjusoftwaresolutions.com';
  
  if (!transporter) {
    console.warn(`[WARNING] Email SMTP credentials not configured in environment variables.`);
    return;
  }

  const mailOptions = {
    from: `"SUJJU Software Solutions" <${fromEmail}>`,
    to: email,
    subject: '🔐 Your OTP Code - SUJJU Software Solutions',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background: #050B14; color: #fff; padding: 32px; border-radius: 12px; border: 1px solid #D4AF37;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #D4AF37; margin: 0;">SUJJU Software Solutions</h2>
          <p style="color: #aaa; margin: 4px 0;">Certificate Verification Portal</p>
        </div>
        <h3 style="color: #fff;">Your OTP Code</h3>
        <p style="color: #ccc;">Use the following OTP code to verify your account. It is valid for <strong>10 minutes</strong>.</p>
        <div style="text-align: center; margin: 32px 0;">
          <span style="background: #D4AF37; color: #050B14; font-size: 36px; font-weight: bold; padding: 16px 32px; border-radius: 8px; letter-spacing: 8px;">${otp}</span>
        </div>
        <p style="color: #888; font-size: 12px; text-align: center;">If you did not request this OTP, please ignore this message.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SENT] OTP delivered to ${email}`);
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to send OTP to ${email}:`, err.message);
  }
};

// ── Send OTP SMS ───────────────────────────────────────────────────────────────
const sendOTPSMS = async (phone, otp) => {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (sid && token && from) {
    try {
      const twilio = require('twilio')(sid, token);
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      await twilio.messages.create({
        body: `Your OTP for SUJJU Software Solutions is ${otp}. Valid for 10 minutes.`,
        from,
        to: formattedPhone,
      });
      console.log(`[SMS SENT] Real SMS delivered to ${formattedPhone}`);
    } catch (smsErr) {
      console.error('[SMS ERROR] Failed to send SMS:', smsErr.message);
      console.log(`[LOCAL DEV FALLBACK] Phone OTP for ${phone} is: ${otp}`);
    }
  } else {
    console.log(`[SMS NOTICE] Mobile SMS handled via Firebase Phone Auth on frontend. (Server OTP for ${phone}: ${otp})`);
  }
};

// ── Register User ──────────────────────────────────────────────────────────────
const registerUser = async (req, res) => {
  try {
    const { fullName, collegeName, rollNumber, department, year, email, phone, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email or phone already exists' });
    }

    const user = await User.create({ fullName, collegeName, rollNumber, department, year, email, phone, password });

    if (user) {
      const emailOtp = generateOTP();
      const phoneOtp = generateOTP();

      await OTP.create({ email, otp: emailOtp, type: 'email' });
      await OTP.create({ phone, otp: phoneOtp, type: 'phone' });

      // Send real Email & SMS OTPs
      await sendOTPEmail(email, emailOtp);
      await sendOTPSMS(phone, phoneOtp);

      res.status(201).json({
        success: true,
        message: 'Registration successful. OTP sent to your registered email and phone number.',
        userId: user._id,
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error.message, error.stack);
    res.status(500).json({ success: false, message: `Server error during registration: ${error.message}` });
  }
};

// ── Register Admin ─────────────────────────────────────────────────────────────
const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Admin with this email or phone already exists' });
    }

    const admin = await User.create({
      fullName,
      email,
      phone,
      password,
      role: 'admin',
      emailVerified: true, // Admins auto-verified
      phoneVerified: true,
      collegeName: 'SUJJU Software Solutions',
      rollNumber: 'ADMIN',
      department: 'Management',
      year: 'Admin',
    });

    if (admin) {
      res.status(201).json({
        success: true,
        message: 'Admin registration successful. You can now login.',
        userId: admin._id,
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid admin data' });
    }
  } catch (error) {
    console.error('Admin registration error:', error.message, error.stack);
    res.status(500).json({ success: false, message: `Server error during admin registration: ${error.message}` });
  }
};

// ── Verify OTP (Mandatory Email OTP, Optional Phone OTP) ───────────────────────
const verifyOTP = async (req, res) => {
  try {
    const { email, phone, emailOtp, phoneOtp, firebaseVerified } = req.body;

    // 1. Validate Email OTP (Mandatory)
    const validEmailOtp = await OTP.findOne({ email, otp: emailOtp, type: 'email' });
    if (!validEmailOtp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired Email OTP. Please check your email inbox.' });
    }

    // 2. Validate Phone OTP (Optional — if provided or verified via Firebase)
    let phoneIsVerified = Boolean(firebaseVerified);
    if (!phoneIsVerified && phone && phoneOtp) {
      const validPhoneOtp = await OTP.findOne({ phone, otp: phoneOtp, type: 'phone' });
      if (validPhoneOtp) {
        phoneIsVerified = true;
      }
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.emailVerified = true;
    user.phoneVerified = phoneIsVerified || true; // Set verified upon successful Email OTP
    await user.save();

    await OTP.deleteMany({ $or: [{ email }, { phone }] });

    res.json({
      success: true,
      message: 'Account verified successfully!',
      token: generateToken(user._id),
      user: {
        _id: user._id,
        studentId: user.studentId,
        fullName: user.fullName,
        email: user.email,
        collegeName: user.collegeName,
        department: user.department,
        year: user.year,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error.message);
    res.status(500).json({ success: false, message: `Server error during OTP verification: ${error.message}` });
  }
};

// ── Login User (Direct Email/Phone & Password Login) ───────────────────────────
const loginUser = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email/phone and password.' });
    }

    const cleanLoginId = loginId.trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: cleanLoginId }, { phone: loginId.trim() }]
    });

    if (user && (await user.matchPassword(password))) {
      // Auto-mark verified upon successful password authentication
      if (!user.emailVerified || !user.phoneVerified) {
        user.emailVerified = true;
        user.phoneVerified = true;
        await user.save();
      }

      res.json({
        success: true,
        token: generateToken(user._id),
        user: {
          _id: user._id,
          studentId: user.studentId,
          fullName: user.fullName,
          email: user.email,
          collegeName: user.collegeName,
          department: user.department,
          year: user.year,
          role: user.role,
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email/phone or password' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, message: `Server error during login: ${error.message}` });
  }
};

// ── Get User Profile ───────────────────────────────────────────────────────────
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ── Resend OTP ─────────────────────────────────────────────────────────────────
const resendOTP = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ success: false, message: 'Email or phone number is required to resend OTP.' });
    }

    const emailOtp = generateOTP();
    const phoneOtp = generateOTP();

    if (email) {
      await OTP.deleteMany({ email, type: 'email' });
      await OTP.create({ email, otp: emailOtp, type: 'email' });
      await sendOTPEmail(email, emailOtp);
    }

    if (phone) {
      await OTP.deleteMany({ phone, type: 'phone' });
      await OTP.create({ phone, otp: phoneOtp, type: 'phone' });
      await sendOTPSMS(phone, phoneOtp);
    }

    res.json({
      success: true,
      message: 'A new OTP has been sent to your registered email and phone number.',
    });
  } catch (error) {
    console.error('Resend OTP error:', error.message);
    res.status(500).json({ success: false, message: `Server error during resend OTP: ${error.message}` });
  }
};

// ── Reset Test Users & OTPs (Admin Only or Database Reset) ────────────────────
const resetTestUsers = async (req, res) => {
  try {
    const userRes = await User.deleteMany({ role: { $ne: 'admin' } });
    const otpRes = await OTP.deleteMany({});
    res.json({
      success: true,
      message: `Database cleaned! Deleted ${userRes.deletedCount} user accounts and cleared all OTP records. All emails & phone numbers can now re-register.`,
    });
  } catch (error) {
    console.error('Reset test users error:', error.message);
    res.status(500).json({ success: false, message: `Error resetting database: ${error.message}` });
  }
};

module.exports = { registerUser, registerAdmin, verifyOTP, resendOTP, resetTestUsers, loginUser, getProfile };
