const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true,
    sparse: true,
  },
  fullName:    { type: String, required: true },
  collegeName: { type: String, required: true },
  rollNumber:  { type: String, required: true },
  department:  { type: String, required: true },
  year:        { type: String, required: true },
  email:       { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone:       { type: String, required: true, unique: true, trim: true },
  password:    { type: String, required: true },
  emailVerified:  { type: Boolean, default: false },
  phoneVerified:  { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['student', 'admin', 'trainer'],
    default: 'student',
  }
}, { timestamps: true });

// ── Pre-save: hash password + generate studentId ───────────────────────────
// NOTE: In Mongoose 9, async pre hooks must NOT call next().
//       Just return/throw — Mongoose handles the promise automatically.
userSchema.pre('save', async function () {
  // 1. Hash password only if it was modified
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // 2. Auto-generate unique studentId for brand new users
  if (this.isNew && !this.studentId) {
    const count = await this.constructor.countDocuments();
    const paddedCount = String(count + 1).padStart(5, '0');
    this.studentId = `SSS${new Date().getFullYear()}${paddedCount}`;
  }
});

// ── Instance method: compare plain-text password to stored hash ────────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
