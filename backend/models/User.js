const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true,
    sparse: true,
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
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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

// Combined pre-save hook: hash password + generate studentId
userSchema.pre('save', async function(next) {
  try {
    // 1. Hash password if it was modified
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    // 2. Generate unique studentId for new users
    if (this.isNew && !this.studentId) {
      const count = await this.constructor.countDocuments();
      const paddedCount = String(count + 1).padStart(5, '0');
      this.studentId = `SSS${new Date().getFullYear()}${paddedCount}`;
    }

    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare entered password to hashed password in DB
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
