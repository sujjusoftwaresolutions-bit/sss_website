import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import SEO from '../components/SEO';

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // null, { status: 'success', data: ... }, { status: 'error', message: ... }

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      // In development, you would hit the actual backend.
      // For now, if the backend is not fully integrated with a DB, we'll hit the mock endpoint we'll create.
      const response = await axios.get(`http://localhost:5000/api/certificates/${certId}`);
      setResult({ status: 'success', data: response.data });
    } catch (error) {
      setResult({
        status: 'error',
        message: error.response?.data?.message || 'Certificate not found or invalid ID. Please try again.',
      });
    } finally {
      setLoading(false);
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
        description="Verify the authenticity of your SUJJU Software Solutions certificate using our secure validation system."
      />

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
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
            Enter your certificate ID below to verify its authenticity and view the official credentials.
          </motion.p>
        </div>

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
                placeholder="e.g. SSS_3245"
                className="w-full bg-[#03070C] border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !certId.trim()}
              className="py-4 px-8 rounded-xl font-bold text-brand-navy shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100 flex items-center justify-center gap-2"
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
                className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8 flex flex-col items-center"
              >
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-outfit font-bold text-green-500">Certificate Verified</h3>
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
                      <p className="text-white font-medium text-lg">{result.data.courseName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Issue Date</p>
                      <p className="text-white font-medium text-lg">{new Date(result.data.issueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Displaying actual certificate (placeholder image or real from API) */}
                <div className="w-full relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Tamper-proof watermark overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/logo.jpeg')] bg-repeat" />
                  
                  <img 
                    src={result.data.certificateImageUrl || '/api/placeholder/800/600'} 
                    alt="Verified Certificate" 
                    className="w-full h-auto object-contain"
                  />
                  
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> OFFICIAL
                  </div>
                </div>

                <p className="text-gray-400 text-sm mt-6 text-center max-w-lg">
                  This digital certificate is tamper-proof and officially verified by SUJJU Software Solutions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};

export default VerifyCertificate;
