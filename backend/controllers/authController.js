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

// ── Nodemailer transporter (Gmail SMTP) ───────────────────────────────────────
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null; // Email not configured — fall back to console log
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// ── Send OTP Email ─────────────────────────────────────────────────────────────
const sendOTPEmail = async (email, otp) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log(`[EMAIL MOCK] OTP for ${email}: ${otp}`);
    return;
  }

  const mailOptions = {
    from: `"SUJJU Software Solutions" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Your OTP for SUJJU Software Solutions',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background: #050B14; color: #fff; padding: 32px; border-radius: 12px; border: 1px solid #D4AF37;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #D4AF37; margin: 0;">SUJJU Software Solutions</h2>
          <p style="color: #aaa; margin: 4px 0;">Certificate Verification Portal</p>
        </div>
        <h3 style="color: #fff;">Your OTP Code</h3>
        <p style="color: #ccc;">Use the following OTP to verify your email address. It is valid for <strong>10 minutes</strong>.</p>
        <div style="text-align: center; margin: 32px 0;">
          <span style="background: #D4AF37; color: #050B14; font-size: 36px; font-weight: bold; padding: 16px 32px; border-radius: 8px; letter-spacing: 8px;">${otp}</span>
        </div>
        <p style="color: #888; font-size: 12px; text-align: center;">If you did not request this OTP, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`[EMAIL SENT] OTP to ${email}`);
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

      // Send email OTP (real email if configured, else console log)
      await sendOTPEmail(email, emailOtp);
      // Phone OTP — still mocked until Twilio is configured
      console.log(`[SMS MOCK] OTP for ${phone}: ${phoneOtp}`);

      res.status(201).json({
        success: true,
        message: 'Registration successful. OTP sent to your email and phone.',
        userId: user._id,
        // Only shown in development for testing
        debug_emailOtp: process.env.NODE_ENV !== 'production' ? emailOtp : undefined,
        debug_phoneOtp: process.env.NODE_ENV !== 'production' ? phoneOtp : undefined,
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error.message, error.stack);
    res.status(500).json({ success: false, message: `Server error during registration: ${error.message}` });
  }
};

// ── Verify OTP ─────────────────────────────────────────────────────────────────
const verifyOTP = async (req, res) => {
  try {
    const { email, phone, emailOtp, phoneOtp } = req.body;

    const validEmailOtp = await OTP.findOne({ email, otp: emailOtp, type: 'email' });
    if (!validEmailOtp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired Email OTP' });
    }

    const validPhoneOtp = await OTP.findOne({ phone, otp: phoneOtp, type: 'phone' });
    if (!validPhoneOtp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired Phone OTP' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.emailVerified = true;
    user.phoneVerified = true;
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

// ── Login User ─────────────────────────────────────────────────────────────────
const loginUser = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: loginId.toLowerCase() }, { phone: loginId }]
    });

    if (user && (await user.matchPassword(password))) {
      if (!user.emailVerified || !user.phoneVerified) {
        return res.status(401).json({ success: false, message: 'Please verify your account via OTP before logging in.' });
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

module.exports = { registerUser, verifyOTP, loginUser, getProfile };
