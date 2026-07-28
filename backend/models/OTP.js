const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  otp: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['email', 'phone'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 300 seconds = 5 minutes expiry
  },
});

module.exports = mongoose.model('OTP', otpSchema);
