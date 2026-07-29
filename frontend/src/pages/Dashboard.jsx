import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, LogOut, Award, Search, CheckCircle2, Download, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

const API_BASE = 'https://sss-website.onrender.com/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

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
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/certificates/download/${certId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || 'Download failed. Please try again.');
        return;
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Certificate_${certId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050B14] py-24 px-4 text-white">
      <SEO title="Dashboard | SUJJU Software Solutions" description="Student Dashboard" />
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center border-2 border-brand-gold">
              <User className="w-8 h-8 text-brand-gold" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-outfit">Welcome, {user?.fullName}</h1>
              <p className="text-gray-400">Student ID: <span className="text-brand-gold font-mono">{user?.studentId}</span></p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md h-fit">
            <h2 className="text-xl font-bold font-outfit mb-6 border-b border-white/10 pb-4">My Profile</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Email Address</p>
                <p className="font-medium flex items-center gap-2">
                  {user?.email} <CheckCircle2 className="w-4 h-4 text-green-400" />
                </p>
              </div>
              <div>
                <p className="text-gray-500">College Name</p>
                <p className="font-medium">{user?.collegeName || 'Not Provided'}</p>
              </div>
              <div>
                <p className="text-gray-500">Department & Year</p>
                <p className="font-medium">{user?.department} - {user?.year}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link 
                to="/verify"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-brand-navy transition-transform hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
              >
                <Search className="w-5 h-5" />
                Verify a Certificate
              </Link>
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="md:col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
            <h2 className="text-xl font-bold font-outfit mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-brand-gold" />
              My Earned Certificates
            </h2>
            
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-gold"></div>
              </div>
            ) : certificates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.certificateId} className="bg-[#0A1120] border border-white/10 rounded-2xl p-5 hover:border-brand-gold/50 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-brand-gold/20 text-brand-gold text-xs font-bold px-2 py-1 rounded">
                        {cert.status.toUpperCase()}
                      </div>
                      <span className="text-gray-500 text-xs font-mono">{cert.certificateId}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{cert.course}</h3>
                    <p className="text-gray-400 text-sm mb-4">Issued: {new Date(cert.issuedDate).toLocaleDateString()}</p>
                    
                    <div className="flex gap-2">
                      <Link 
                        to={`/verify?id=${cert.certificateId}`}
                        className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg border border-white/10 hover:bg-white/5 text-sm transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" /> View
                      </Link>
                      {cert.certificateURL && (
                        <button
                          onClick={() => handleDownload(cert.certificateId)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors"
                        >
                          <Download className="w-4 h-4" /> PDF
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[#0A1120] rounded-2xl border border-white/5">
                <Award className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-300">No Certificates Yet</h3>
                <p className="text-gray-500 text-sm mt-1">Complete a course to earn your first certificate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
