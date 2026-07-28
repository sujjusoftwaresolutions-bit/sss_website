const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'sujju_secret_key_2026', {
    expiresIn: '30d',
  });
};

// Generate 6 digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register User
const registerUser = async (req, res) => {
  try {
    const { fullName, collegeName, rollNumber, department, year, email, phone, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email or phone already exists' });
    }

    const user = await User.create({
      fullName, collegeName, rollNumber, department, year, email, phone, password
    });

    if (user) {
      // Generate OTPs
      const emailOtp = generateOTP();
      const phoneOtp = generateOTP();

      await OTP.create({ email, otp: emailOtp, type: 'email' });
      await OTP.create({ phone, otp: phoneOtp, type: 'phone' });

      // TODO: Send Email using Nodemailer (mocking for now)
      console.log(`[EMAIL] OTP for ${email}: ${emailOtp}`);
      // TODO: Send SMS using Twilio/MSG91 (mocking for now)
      console.log(`[SMS] OTP for ${phone}: ${phoneOtp}`);

      res.status(201).json({
        success: true,
        message: 'Registration successful. Please verify OTPs.',
        userId: user._id,
        // REMOVE IN PRODUCTION — only for testing since email/sms is mocked
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

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, phone, emailOtp, phoneOtp } = req.body;

    // Verify Email OTP
    const validEmailOtp = await OTP.findOne({ email, otp: emailOtp, type: 'email' });
    if (!validEmailOtp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired Email OTP' });
    }

    // Verify Phone OTP
    const validPhoneOtp = await OTP.findOne({ phone, otp: phoneOtp, type: 'phone' });
    if (!validPhoneOtp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired Phone OTP' });
    }

    // Update User
    const user = await User.findOne({ email, phone });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.emailVerified = true;
    user.phoneVerified = true;
    await user.save();

    // Delete OTPs after successful verification
    await OTP.deleteMany({ $or: [{ email }, { phone }] });

    res.json({
      success: true,
      message: 'Account verified successfully',
      token: generateToken(user._id),
      user: {
        _id: user._id,
        studentId: user.studentId,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during OTP verification' });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { loginId, password } = req.body; // loginId can be email or phone

    const user = await User.findOne({ 
      $or: [{ email: loginId }, { phone: loginId }] 
    });

    if (user && (await user.matchPassword(password))) {
      if (!user.emailVerified || !user.phoneVerified) {
        return res.status(401).json({ success: false, message: 'Please verify your account before logging in.' });
      }

      res.json({
        success: true,
        token: generateToken(user._id),
        user: {
          _id: user._id,
          studentId: user.studentId,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// Get User Profile
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
