const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'trainer'],
    default: 'student',
  }
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to match entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate studentId before saving if it's a new user
userSchema.pre('save', async function(next) {
  if (this.isNew && !this.studentId) {
    const count = await this.constructor.countDocuments();
    const paddedCount = String(count + 1).padStart(5, '0');
    this.studentId = `SSS${new Date().getFullYear()}${paddedCount}`;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
