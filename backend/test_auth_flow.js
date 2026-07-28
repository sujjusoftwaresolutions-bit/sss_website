const axios = require('axios');
const mongoose = require('mongoose');
const OTP = require('./models/OTP');
const User = require('./models/User');

const API_URL = 'http://localhost:5000/api';

async function runTest() {
  console.log('🚀 Starting Backend Auth Flow Test...\n');

  // 1. Connect to MongoDB to retrieve OTPs (since we are mocking email/sms)
  await mongoose.connect('mongodb://127.0.0.1:27017/sujju_software');
  console.log('✅ Connected to MongoDB for testing.');

  // Clean up previous test users
  await User.deleteMany({ email: 'test@example.com' });
  await OTP.deleteMany({ email: 'test@example.com' });

  try {
    // 2. Register User
    console.log('\n--- Step 1: Register User ---');
    const registerRes = await axios.post(`${API_URL}/auth/register`, {
      fullName: 'Test User',
      collegeName: 'Test College',
      rollNumber: '12345',
      department: 'CSE',
      year: '3rd Year',
      email: 'test@example.com',
      phone: '9999999999',
      password: 'password123'
    });
    console.log('Registration Response:', registerRes.data);

    // 3. Fetch OTPs from Database (simulating checking email/phone)
    console.log('\n--- Step 2: Fetching OTPs (Simulating Email/SMS) ---');
    const emailOtpDoc = await OTP.findOne({ email: 'test@example.com', type: 'email' });
    const phoneOtpDoc = await OTP.findOne({ phone: '9999999999', type: 'phone' });
    console.log(`Email OTP: ${emailOtpDoc.otp}`);
    console.log(`Phone OTP: ${phoneOtpDoc.otp}`);

    // 4. Verify OTPs
    console.log('\n--- Step 3: Verify OTPs ---');
    const verifyRes = await axios.post(`${API_URL}/auth/verify-otp`, {
      email: 'test@example.com',
      phone: '9999999999',
      emailOtp: emailOtpDoc.otp,
      phoneOtp: phoneOtpDoc.otp
    });
    console.log('Verify Response:', verifyRes.data);

    // 5. Login User
    console.log('\n--- Step 4: Login ---');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      loginId: 'test@example.com',
      password: 'password123'
    });
    console.log('Login Response:', loginRes.data);
    const token = loginRes.data.token;

    // 6. Access Protected Route (My Profile)
    console.log('\n--- Step 5: Access Protected Route (My Profile) ---');
    const profileRes = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Profile Data:', profileRes.data.user);

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!');

  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runTest();
