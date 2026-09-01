import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, AlertCircle, Loader2, Eye, Download, Printer, X, Award, CheckCircle2, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const API_BASE = 'https://sss-website.onrender.com/api';

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const printRef = useRef(null);

  // Optional redirect logic removed to allow public verification
  // Users can search any Certificate ID and view details

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.get(`/certificates/${encodeURIComponent(certId.trim())}`);
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

  const handleDownload = async (certIdToDownload) => {
    if (!result?.data?.certificateURL) {
      // Open Certificate View Modal for Print / PDF save
      setShowModal(true);
      return;
    }

    setDownloadLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/certificates/download/${certIdToDownload}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        setShowModal(true);
        return;
      }

      const disposition = response.headers.get('Content-Disposition');
      let filename = `Certificate_${certIdToDownload}`;
      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match) filename = match[1];
      } else {
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
      setShowModal(true);
    } finally {
      setDownloadLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent pt-[120px] pb-24 px-4 md:px-8 flex flex-col items-center"
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
            className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)] border border-brand-gold/40"
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
              ? `Welcome, ${user?.fullName}! Enter a certificate ID or roll number to verify.`
              : 'Login or sign up to verify and view your certificates.'}
          </motion.p>
        </div>

        {/* Authenticated Verification Form */}
        {isAuthenticated && (
          <>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm shadow-xl"
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
                    placeholder="Enter Certificate ID e.g. SSS-020 or Roll Number 25HP1A1225"
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

            {/* Results Section */}
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
                    className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8 flex flex-col items-center shadow-2xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <ShieldCheck className="w-8 h-8 text-green-400" />
                      <h3 className="text-2xl font-outfit font-bold text-green-400">Certificate Verified ✓</h3>
                    </div>

                    <div className="w-full bg-black/50 border border-white/10 rounded-xl p-6 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Certificate ID</p>
                          <p className="text-white font-mono font-bold text-lg text-brand-gold">{result.data.certificateId}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Issued To</p>
                          <p className="text-white font-semibold text-lg">{result.data.studentName}</p>
                        </div>
                        {result.data.rollNumber && (
                          <div>
                            <p className="text-gray-400 text-sm">Roll Number</p>
                            <p className="text-white font-mono font-medium text-lg">{result.data.rollNumber}</p>
                          </div>
                        )}
                        {result.data.collegeName && (
                          <div>
                            <p className="text-gray-400 text-sm">College / Institution</p>
                            <p className="text-white font-medium text-base">{result.data.collegeName}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-400 text-sm">Course / Program</p>
                          <p className="text-white font-medium text-base">{result.data.course || result.data.courseName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Issue Date</p>
                          <p className="text-white font-medium text-base">
                            {new Date(result.data.issuedDate || result.data.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Authenticity Status</p>
                          <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-full text-xs tracking-wider border border-green-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5" /> OFFICIAL & VALID
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: View Certificate & Go to Dashboard */}
                    <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                      <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-[1.02] active:scale-95"
                      >
                        <Eye className="w-5 h-5 text-brand-gold" />
                        View Certificate
                      </button>

                      <button
                        onClick={() => {
                          if (isAuthenticated) {
                            navigate('/dashboard');
                          } else {
                            navigate('/login', { state: { from: { pathname: '/dashboard' } } });
                          }
                        }}
                        className="flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl font-bold text-brand-navy shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all hover:scale-[1.02] active:scale-95"
                        style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Go to Dashboard to Download
                      </button>
                    </div>

                    <p className="text-gray-400 text-xs mt-6 text-center max-w-lg">
                      🔒 Official certificate verified by SUJJU Software Solutions Security Registry.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      {/* Official Certificate View Modal */}
      <AnimatePresence>
        {showModal && result?.data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[#09111E] border-2 border-brand-gold/40 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(212,175,55,0.25)] text-white overflow-hidden my-8"
            >
              {/* Modal Top Actions */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-brand-gold" />
                  <span className="text-lg font-outfit font-bold text-white">Official Certificate Document</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold border border-brand-gold/40 text-sm font-semibold transition-all"
                  >
                    <Printer className="w-4 h-4" /> Print / Save PDF
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Printable Official Certificate View */}
              <div ref={printRef} className="bg-[#050B14] border-4 border-brand-gold/60 p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-inner">
                {/* Certificate Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
                
                {/* Header Badge & Company Title */}
                <div className="flex flex-col md:flex-row items-center justify-between border-b-2 border-brand-gold/30 pb-6 mb-8 gap-4 text-center md:text-left">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold font-outfit text-white tracking-wide">
                      SUJJU SOFTWARE SOLUTIONS
                    </h2>
                    <p className="text-brand-gold font-medium text-xs md:text-sm tracking-widest uppercase mt-1">
                      Software · Artificial Intelligence · Training
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-center md:items-end">
                    <span className="inline-block px-3 py-1 bg-brand-gold/20 text-brand-gold border border-brand-gold/40 rounded-full font-mono text-xs font-bold">
                      Ref: SSS/2026/08/ALIET/{result.data.certificateId}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">Date: {new Date(result.data.issuedDate || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="text-center py-4 space-y-6">
                  <p className="text-brand-gold uppercase tracking-[0.25em] font-semibold text-sm">
                    Intership Offer & Completion Certificate
                  </p>

                  <h3 className="text-3xl md:text-4xl font-extrabold font-outfit text-white">
                    {result.data.studentName}
                  </h3>

                  {result.data.rollNumber && (
                    <p className="text-gray-300 text-sm font-mono">
                      Roll Number: <span className="text-brand-gold font-bold">{result.data.rollNumber}</span> | {result.data.department} {result.data.year}
                    </p>
                  )}

                  {result.data.collegeName && (
                    <p className="text-gray-400 text-sm italic">
                      {result.data.collegeName}
                    </p>
                  )}

                  <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-sm md:text-base pt-2">
                    This is to verify that <strong className="text-white">{result.data.studentName}</strong> has been offered and successfully completed the practical industry training in <strong className="text-brand-gold">{result.data.course}</strong> under the technical guidance of our engineering team at SUJJU Software Solutions.
                  </p>

                  {/* Gold Verification Stamp & Signatures */}
                  <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                        <CheckCircle2 className="w-8 h-8 text-brand-gold" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Verification Status</p>
                        <p className="text-sm font-bold text-green-400">OFFICIALLY VERIFIED & VALID</p>
                      </div>
                    </div>

                    <div className="text-center md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-white/10">
                      <p className="font-outfit font-extrabold text-white text-lg tracking-wider">U. Uppu</p>
                      <p className="text-brand-gold font-bold text-xs">CHANDRA SEKHAR UPPU</p>
                      <p className="text-gray-400 text-xs">FOUNDER & CEO, SUJJU Software Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VerifyCertificate;
