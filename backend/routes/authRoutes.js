const express = require('express');
const router = express.Router();
const { registerUser, registerAdmin, verifyOTP, resendOTP, loginUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/admin-signup', registerAdmin);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginUser);
router.get('/me', protect, getProfile);

module.exports = router;
