import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Mail, Phone, ShieldCheck, ArrowRight, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';

const OTPVerification = () => {
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { userId, email, phone, from } = location.state || {};

  // Countdown timer for Resend OTP button
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/auth/verify-otp', {
        email,
        phone,
        emailOtp,
        phoneOtp: phoneOtp || emailOtp, // Fallback to emailOtp if phoneOtp not entered separately
      });

      if (response.data.success) {
        setSuccess(true);
        login(response.data.token, response.data.user);
        
        const redirectPath = from?.pathname || '/verify-certificate';
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0 || resendLoading) return;
    
    setResendLoading(true);
    setResendMessage('');
    setError('');

    try {
      const response = await axios.post('/auth/resend-otp', { email, phone });
      if (response.data.success) {
        setResendMessage('A new OTP has been sent to your email & phone!');
        setTimer(30); // 30 second cooldown timer
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
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
          <p className="text-gray-400 mt-2 text-sm">
            Enter the OTP code sent to your email and phone
          </p>
        </div>

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl mb-6 text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Verification successful! Redirecting...</span>
          </div>
        )}

        {resendMessage && !success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{resendMessage}</span>
          </div>
        )}

        {error && !success && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email OTP */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-gold" />
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
              <Phone className="w-4 h-4 text-brand-gold" />
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

          <button
            type="button"
            onClick={() => {
              setEmailOtp('123456');
              setPhoneOtp('123456');
            }}
            disabled={loading || success}
            className="w-full py-2.5 px-4 rounded-xl font-semibold bg-white/10 hover:bg-white/15 text-brand-gold text-sm border border-brand-gold/30 transition-colors flex items-center justify-center gap-2"
          >
            ⚡ Use Test Code (123456)
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading || resendLoading || success || timer > 0}
              className="text-sm text-brand-gold hover:underline disabled:opacity-50 disabled:no-underline flex items-center justify-center gap-1.5 mx-auto"
            >
              {resendLoading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Sending new OTP...</>
              ) : timer > 0 ? (
                `Resend OTP in ${timer}s`
              ) : (
                "Didn't receive OTP? Resend OTP"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
