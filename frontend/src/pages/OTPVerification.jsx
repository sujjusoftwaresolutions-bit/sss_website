import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Mail, Phone, ShieldCheck, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const OTPVerification = () => {
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, email, phone, emailOtp: debugEmailOtp, phoneOtp: debugPhoneOtp } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/auth/verify-otp', {
        email,
        phone,
        emailOtp,
        phoneOtp,
      });

      if (response.data.success) {
        setSuccess(true);
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect to verify certificate after a short delay
        setTimeout(() => {
          navigate('/verify-certificate', { replace: true });
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    // In a real implementation, you would call a resend OTP endpoint
    alert('OTP resend functionality would be implemented here.');
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Registration Data Missing</h2>
          <p className="text-gray-400 mb-4">Please start the registration process again.</p>
          <button
            onClick={() => navigate('/signup')}
            className="py-2 px-6 rounded-xl font-bold text-brand-navy"
            style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
          >
            Go to Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B14] flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <SEO title="OTP Verification | SUJJU Software Solutions" description="Verify your email and phone to complete registration." />
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-brand-gold/20 mb-4">
            <ShieldCheck className="w-8 h-8 text-brand-gold" />
          </div>
          <h2 className="text-3xl font-bold text-white font-outfit">Verify Your Account</h2>
          <p className="text-gray-400 mt-2">
            Enter the OTPs sent to your email and phone
          </p>
        </div>

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl mb-6 text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Verification successful! Redirecting...</span>
          </div>
        )}

        {error && !success && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Development OTP Display */}
        {(debugEmailOtp || debugPhoneOtp) && !success && (
          <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 p-4 rounded-xl mb-6 text-sm">
            <p className="font-bold mb-2">Development Mode - OTP Codes:</p>
            {debugEmailOtp && <p className="mb-1"><span className="text-gray-400">Email OTP:</span> <span className="font-mono font-bold">{debugEmailOtp}</span></p>}
            {debugPhoneOtp && <p><span className="text-gray-400">Phone OTP:</span> <span className="font-mono font-bold">{debugPhoneOtp}</span></p>}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email OTP */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email OTP
            </label>
            <div className="relative">
              <input
                type="text"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                maxLength={6}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white text-center text-2xl tracking-widest focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors font-mono"
                placeholder="000000"
                required
                disabled={success}
              />
            </div>
            <p className="text-xs text-gray-500">Sent to {email}</p>
          </div>

          {/* Phone OTP */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone OTP
            </label>
            <div className="relative">
              <input
                type="text"
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                maxLength={6}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white text-center text-2xl tracking-widest focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors font-mono"
                placeholder="000000"
                required
                disabled={success}
              />
            </div>
            <p className="text-xs text-gray-500">Sent to {phone}</p>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-brand-navy shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
          >
            {loading ? 'Verifying...' : success ? 'Verified!' : 'Verify Account'}
            {!loading && !success && <ArrowRight className="w-5 h-5" />}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-sm text-brand-gold hover:underline"
              disabled={loading || success}
            >
              Didn't receive OTP? Resend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
