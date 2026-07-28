const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  issuedDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
  },
  certificateURL: {
    type: String,
    required: true,
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
