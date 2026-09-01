import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, LogOut, Award, Search, CheckCircle2, Download, Eye, X, Printer, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(null); // certId being downloaded
  const [selectedCert, setSelectedCert] = useState(null); // cert object for preview modal
  const printRef = useRef(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('/certificates/my-certificates');
        if (response.data.success) {
          setCertificates(response.data.certificates);
        }
      } catch (error) {
        console.error('Failed to fetch certificates', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const handleDownload = async (certId) => {
    setDownloadLoading(certId);
    try {
      const response = await axios.get(`/certificates/download/${certId}`, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] || 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(blob);
      
      const contentDisposition = response.headers['content-disposition'];
      let fileName = `Certificate_${certId}.pdf`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) fileName = match[1];
      }

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download certificate. Please try again.');
    } finally {
      setDownloadLoading(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050B14] py-24 px-4 text-white">
      <SEO title="Student Dashboard | SUJJU Software Solutions" description="View and download your earned certificates." />
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center border-2 border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <User className="w-8 h-8 text-brand-gold" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-outfit">Welcome, {user?.fullName}</h1>
              <p className="text-gray-400 text-sm">
                Student ID: <span className="text-brand-gold font-mono font-semibold">{user?.studentId || 'STUDENT'}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md h-fit space-y-6">
            <h2 className="text-xl font-bold font-outfit border-b border-white/10 pb-4">My Profile</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Email Address</p>
                <p className="font-medium flex items-center gap-2 text-white mt-1">
                  {user?.email} <CheckCircle2 className="w-4 h-4 text-green-400" />
                </p>
              </div>
              {user?.phone && (
                <div>
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Phone Number</p>
                  <p className="font-medium text-white mt-1">{user?.phone}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">College Name</p>
                <p className="font-medium text-white mt-1">{user?.collegeName || 'SUJJU Software Solutions'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Department & Year</p>
                <p className="font-medium text-white mt-1">{user?.department} - {user?.year}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link 
                to="/verify-certificate"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-brand-navy shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
              >
                <Search className="w-5 h-5" />
                Verify a Certificate
              </Link>
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="md:col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold font-outfit flex items-center gap-2">
                <Award className="w-6 h-6 text-brand-gold" />
                My Certificates
              </h2>
              <span className="text-xs bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-full font-bold border border-brand-gold/30 font-mono">
                {certificates.length} Found
              </span>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
              </div>
            ) : certificates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.certificateId} className="bg-[#0A1120] border border-white/10 rounded-2xl p-5 hover:border-brand-gold/50 transition-colors group flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                          VERIFIED
                        </span>
                        <span className="text-brand-gold font-mono font-bold text-xs">{cert.certificateId}</span>
                      </div>
                      <h3 className="font-bold text-lg text-white mb-1 line-clamp-2 font-outfit">{cert.course}</h3>
                      <p className="text-gray-400 text-xs mb-4">
                        Issued: {new Date(cert.issuedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-white/10">
                      <button 
                        onClick={() => setSelectedCert(cert)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-white/20 hover:bg-white/10 text-xs font-bold text-white transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-brand-gold" /> View
                      </button>
                      
                      <button
                        onClick={() => handleDownload(cert.certificateId)}
                        disabled={downloadLoading === cert.certificateId}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-brand-navy shadow-md text-xs transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
                      >
                        {downloadLoading === cert.certificateId ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <><Download className="w-3.5 h-3.5" /> Download</>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#0A1120] rounded-2xl border border-white/5">
                <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-300">No Certificates Found</h3>
                <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                  Certificates associated with <span className="text-brand-gold font-mono">{user?.email}</span> will automatically appear here once issued by SUJJU Software Solutions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
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
              {/* Modal Top Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-brand-gold" />
                  <span className="text-lg font-outfit font-bold text-white">Certificate Preview</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold border border-brand-gold/40 text-xs font-bold transition-all"
                  >
                    <Printer className="w-4 h-4" /> Print / Save PDF
                  </button>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Certificate Document Content */}
              <div ref={printRef} className="bg-[#050B14] border-4 border-brand-gold/60 p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-inner text-center space-y-6">
                <div className="border-b-2 border-brand-gold/30 pb-6 mb-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold font-outfit text-white tracking-wide">
                    SUJJU SOFTWARE SOLUTIONS
                  </h2>
                  <p className="text-brand-gold font-medium text-xs md:text-sm tracking-widest uppercase mt-1">
                    Software · Artificial Intelligence · Training
                  </p>
                </div>

                <p className="text-brand-gold uppercase tracking-[0.25em] font-semibold text-xs md:text-sm">
                  Certificate of Internship & Completion
                </p>

                <h3 className="text-3xl md:text-4xl font-extrabold font-outfit text-white">
                  {selectedCert.studentName || user?.fullName}
                </h3>

                <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed pt-2">
                  This certifies that <strong className="text-white">{selectedCert.studentName || user?.fullName}</strong> has successfully completed training in <strong className="text-brand-gold">{selectedCert.course}</strong> at SUJJU Software Solutions.
                </p>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>Certificate ID: <strong className="text-brand-gold font-mono">{selectedCert.certificateId}</strong></span>
                  <span>Issued Date: {new Date(selectedCert.issuedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
