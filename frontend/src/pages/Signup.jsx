import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Book, GraduationCap, Building2, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

const Signup = () => {
  const [step, setStep] = useState(1); // 1: Details, 2: OTP Verification
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: '',
    rollNumber: '',
    department: '',
    year: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [otpData, setOtpData] = useState({ emailOtp: '', phoneOtp: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError('');
    setLoading(true);
    try {
      const response = await axios.post('/auth/register', formData);
      if (response.data.success) {
        setStep(2); // Move to OTP verification step
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('/auth/verify-otp', {
        email: formData.email,
        phone: formData.phone,
        emailOtp: otpData.emailOtp,
        phoneOtp: otpData.phoneOtp
      });
      
      if (response.data.success) {
        login(response.data.token, response.data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <SEO title="Sign Up | SUJJU Software Solutions" description="Create your student account." />
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-brand-gold/20 mb-4">
            <User className="w-8 h-8 text-brand-gold" />
          </div>
          <h2 className="text-3xl font-bold text-white font-outfit">Create Account</h2>
          <p className="text-gray-400 mt-2">
            {step === 1 ? 'Join the Student Portal to manage your certificates' : 'Verify your Email and Phone Number'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" placeholder="John Doe" />
                </div>
              </div>

              {/* College Name */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">College Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange} required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" placeholder="ABC Engineering College" />
                </div>
              </div>

              {/* Roll Number */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Roll Number</label>
                <div className="relative">
                  <CheckCircle2 className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" placeholder="20XX1AXXXX" />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Department</label>
                <div className="relative">
                  <Book className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input type="text" name="department" value={formData.department} onChange={handleInputChange} required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" placeholder="CSE / ECE / IT" />
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Year</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <select name="year" value={formData.year} onChange={handleInputChange} required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none appearance-none">
                    <option value="" className="bg-[#050B14]">Select Year</option>
                    <option value="1st Year" className="bg-[#050B14]">1st Year</option>
                    <option value="2nd Year" className="bg-[#050B14]">2nd Year</option>
                    <option value="3rd Year" className="bg-[#050B14]">3rd Year</option>
                    <option value="4th Year" className="bg-[#050B14]">4th Year</option>
                    <option value="Graduated" className="bg-[#050B14]">Graduated</option>
                  </select>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" placeholder="student@example.com" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" placeholder="9876543210" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" placeholder="••••••••" />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-brand-navy shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
            >
              {loading ? 'Processing...' : 'Continue to Verification'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="bg-brand-gold/10 border border-brand-gold/30 p-4 rounded-xl text-brand-gold text-sm text-center mb-6">
              6-digit OTPs have been sent to <strong>{formData.email}</strong> and <strong>{formData.phone}</strong>.
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email OTP</label>
              <input type="text" name="emailOtp" value={otpData.emailOtp} onChange={handleOtpChange} required
                maxLength={6}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-center tracking-[0.5em] font-mono text-xl" placeholder="••••••" />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Phone OTP</label>
              <input type="text" name="phoneOtp" value={otpData.phoneOtp} onChange={handleOtpChange} required
                maxLength={6}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-center tracking-[0.5em] font-mono text-xl" placeholder="••••••" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-brand-navy shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
            >
              {loading ? 'Verifying...' : 'Verify & Create Account'}
              {!loading && <CheckCircle2 className="w-5 h-5" />}
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-gold hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
