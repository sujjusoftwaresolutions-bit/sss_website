require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const OTP = require('./models/OTP');

const cleanUsers = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in environment variables.');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB Atlas');

    // Delete all registered non-admin users & OTPs
    const userRes = await User.deleteMany({ role: { $ne: 'admin' } });
    const otpRes = await OTP.deleteMany({});

    console.log(`🗑️ Deleted ${userRes.deletedCount} registered test user accounts.`);
    console.log(`🗑️ Cleared ${otpRes.deletedCount} OTP records.`);
    console.log('\n🎉 Database reset complete! All emails and phone numbers are now free to re-register.');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error cleaning database:', err.message);
    process.exit(1);
  }
};

cleanUsers();
