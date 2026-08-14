import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, Lock, GraduationCap, Building, Calendar, ArrowRight, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Signup = () => {
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError('');
    setLoading(true);
    
    try {
      const { confirmPassword, ...submitData } = formData;
      const response = await axios.post('/auth/register', submitData);
      
      if (response.data.success) {
        setRegistrationData({
          userId: response.data.userId,
          email: formData.email,
          phone: formData.phone,
          emailOtp: response.data.debug_emailOtp,
          phoneOtp: response.data.debug_phoneOtp,
        });
        
        // Navigate to OTP verification page with data
        navigate('/verify-otp', { 
          state: { 
            userId: response.data.userId,
            email: formData.email,
            phone: formData.phone,
            emailOtp: response.data.debug_emailOtp,
            phoneOtp: response.data.debug_phoneOtp,
            from: location.state?.from,
          }
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <SEO title="Student Sign Up | SUJJU Software Solutions" description="Create your student account to verify certificates." />
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-brand-gold/20 mb-4">
            <GraduationCap className="w-8 h-8 text-brand-gold" />
          </div>
          <h2 className="text-3xl font-bold text-white font-outfit">Student Registration</h2>
          <p className="text-gray-400 mt-2">
            Create your account to verify certificates
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleInputChange} 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
            </div>

            {/* College Name */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">College Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                  type="text" 
                  name="collegeName" 
                  value={formData.collegeName} 
                  onChange={handleInputChange} 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" 
                  placeholder="Your College" 
                />
              </div>
            </div>

            {/* Roll Number */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Roll Number</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                  type="text" 
                  name="rollNumber" 
                  value={formData.rollNumber} 
                  onChange={handleInputChange} 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" 
                  placeholder="12345" 
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Department</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                  type="text" 
                  name="department" 
                  value={formData.department} 
                  onChange={handleInputChange} 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" 
                  placeholder="Computer Science" 
                />
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Year</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-[#050B14]">Select Year</option>
                  <option value="1" className="bg-[#050B14]">1st Year</option>
                  <option value="2" className="bg-[#050B14]">2nd Year</option>
                  <option value="3" className="bg-[#050B14]">3rd Year</option>
                  <option value="4" className="bg-[#050B14]">4th Year</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" 
                  placeholder="student@example.com" 
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" 
                  placeholder="9876543210" 
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleInputChange} 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" 
                  placeholder="••••••••" 
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-brand-navy shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>

          <p className="text-center text-gray-400 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-gold hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
