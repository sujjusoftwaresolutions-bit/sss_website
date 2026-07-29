import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const API_BASE = 'https://sss-website.onrender.com/api';

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to signup if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/verify-certificate' } }, replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/certificates/${certId.trim()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult({ status: 'success', data: response.data });
    } catch (error) {
      setResult({
        status: 'error',
        message: error.response?.data?.message || 'Certificate not found or invalid ID.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certId) => {
    setDownloadLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/certificates/download/${certId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        let errMsg = 'Download failed. Please try again.';
        try { const err = await response.json(); errMsg = err.message || errMsg; } catch(e) {}
        alert(errMsg);
        return;
      }

      // Get filename from Content-Disposition or build from certId
      const disposition = response.headers.get('Content-Disposition');
      let filename = `Certificate_${certId}`;
      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match) filename = match[1];
      } else {
        // Fallback: detect from blob type
        const contentType = response.headers.get('Content-Type') || '';
        if (contentType.includes('png')) filename += '.png';
        else if (contentType.includes('jpeg') || contentType.includes('jpg')) filename += '.jpg';
        else filename += '.pdf';
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050B14] pt-[120px] pb-24 px-4 md:px-8 flex flex-col items-center"
    >
      <SEO
        title="Verify Certificate | SUJJU Software Solutions"
        description="Verify the authenticity of your SUJJU Software Solutions certificate."
      />

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-10 w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <ShieldCheck className="w-10 h-10 text-brand-gold" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-outfit font-extrabold text-white mb-4"
          >
            Certificate Verification
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            {isAuthenticated
              ? `Welcome, ${user?.fullName}! Enter a certificate ID to verify it.`
              : 'Login or sign up to verify and view your certificates.'}
          </motion.p>
        </div>

        {/* Authenticated content only — non-authenticated users are redirected via useEffect */}
        {isAuthenticated && (
          <>
            {/* Verification Form */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm"
            >
              <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="Enter Certificate ID e.g. SSS_3245"
                    className="w-full bg-[#03070C] border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !certId.trim()}
                  className="py-4 px-8 rounded-xl font-bold text-brand-navy shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify Now'}
                </button>
              </form>
            </motion.div>

            {/* Results */}
            <div className="w-full mt-8">
              <AnimatePresence mode="wait">
                {result?.status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3"
                  >
                    <AlertCircle className="w-10 h-10 text-red-500" />
                    <h3 className="text-xl font-outfit font-bold text-red-500">Verification Failed</h3>
                    <p className="text-red-200">{result.message}</p>
                  </motion.div>
                )}

                {result?.status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8 flex flex-col items-center"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <ShieldCheck className="w-8 h-8 text-green-500" />
                      <h3 className="text-2xl font-outfit font-bold text-green-500">Certificate Verified ✓</h3>
                    </div>

                    <div className="w-full bg-black/40 rounded-xl p-6 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Certificate ID</p>
                          <p className="text-white font-mono font-medium text-lg">{result.data.certificateId}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Issued To</p>
                          <p className="text-white font-medium text-lg">{result.data.studentName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Course</p>
                          <p className="text-white font-medium text-lg">{result.data.course || result.data.courseName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Issue Date</p>
                          <p className="text-white font-medium text-lg">
                            {new Date(result.data.issuedDate || result.data.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Status</p>
                          <span className="inline-block bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-full text-sm">
                            {result.data.status?.toUpperCase() || 'VALID'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {result.data.certificateURL && (
                      <button
                        onClick={() => handleDownload(result.data.certificateId)}
                        disabled={downloadLoading}
                        className="flex items-center gap-2 py-3 px-8 rounded-xl font-bold text-brand-navy disabled:opacity-70"
                        style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
                      >
                        {downloadLoading ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Downloading...</>
                        ) : (
                          'Download Certificate'
                        )}
                      </button>
                    )}

                    <p className="text-gray-400 text-sm mt-6 text-center max-w-lg">
                      This certificate is officially verified and tamper-proof by SUJJU Software Solutions.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default VerifyCertificate;
