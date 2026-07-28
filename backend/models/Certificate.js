const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
  },
  // Link to registered User (optional — allows public certificates too)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  studentId: {
    type: String,
    default: null, // e.g. SSS2025001 — populated when user links their account
  },
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
    lowercase: true,
  },
  rollNumber: {
    type: String,
    default: '',
  },
  collegeName: {
    type: String,
    default: '',
  },
  department: {
    type: String,
    default: '',
  },
  year: {
    type: String,
    default: '',
  },
  course: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    default: '30 Days',
  },
  grade: {
    type: String,
    default: 'A',
  },
  issuedDate: {
    type: Date,
    required: true,
  },
  certificateURL: {
    type: String,
    default: '', // Empty if PDF not uploaded yet
  },
  status: {
    type: String,
    enum: ['active', 'revoked'],
    default: 'active',
  },
  issuedBy: {
    type: String,
    default: 'SUJJU Software Solutions',
  }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
