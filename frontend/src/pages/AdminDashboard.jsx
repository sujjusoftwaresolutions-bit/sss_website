import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, PlusCircle, Search, Upload, FileText, CheckCircle2, User, Building2, Book, GraduationCap, Calendar, Clock, Award, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('generate'); // generate, view
  
  // Form State
  const [formData, setFormData] = useState({
    certificateId: '', // Optional auto-gen
    studentName: '',
    studentEmail: '',
    rollNumber: '',
    collegeName: '',
    department: '',
    year: '',
    course: '',
    duration: '30 Days',
    grade: 'A',
    issuedDate: new Date().toISOString().split('T')[0],
  });
  const [file, setFile] = useState(null);
  
  // Status State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (file) {
      data.append('certificateFile', file);
    }

    try {
      const response = await axios.post('/certificates', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setSuccess(`Certificate successfully generated for ${formData.studentName} with ID: ${response.data.certificate.certificateId}`);
        // Reset form
        setFormData({
          ...formData,
          certificateId: '',
          studentName: '',
          studentEmail: '',
          rollNumber: '',
          course: '',
        });
        setFile(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] pt-[120px] pb-24 px-4 md:px-8">
      <SEO title="Admin Dashboard | SUJJU Software Solutions" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-outfit text-white flex items-center gap-3">
              <ShieldCheck className="text-brand-gold w-8 h-8" />
              Admin Portal
            </h1>
            <p className="text-gray-400 mt-1">Welcome back, {user?.fullName}</p>
          </div>
          
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === 'generate' ? 'bg-brand-gold text-brand-navy shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Generate Certificate
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === 'view' ? 'bg-brand-gold text-brand-navy shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              Search Certificates
            </button>
          </div>
        </div>

        {activeTab === 'generate' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Create New Certificate</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Auto Gen ID Info */}
                <div className="md:col-span-2 bg-brand-gold/10 border border-brand-gold/30 p-4 rounded-xl text-brand-gold text-sm flex gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>Leave <strong>Certificate ID</strong> blank to auto-generate a unique SSS ID.</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Certificate ID (Optional)</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <input type="text" name="certificateId" value={formData.certificateId} onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold outline-none" placeholder="e.g. SSS_1001" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Student Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} required
                      className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Student Email *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <input type="email" name="studentEmail" value={formData.studentEmail} onChange={handleInputChange} required
                      className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Roll Number</label>
                  <div className="relative">
                    <Book className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">College Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <input type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold outline-none" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Course / Internship Topic *</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <input type="text" name="course" value={formData.course} onChange={handleInputChange} required
                      className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold outline-none" placeholder="e.g. Frontend Development" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Duration</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <input type="text" name="duration" value={formData.duration} onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Grade</label>
                  <div className="relative">
                    <Award className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <input type="text" name="grade" value={formData.grade} onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Issue Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <input type="date" name="issuedDate" value={formData.issuedDate} onChange={handleInputChange} required
                      className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white focus:border-brand-gold outline-none [color-scheme:dark]" />
                  </div>
                </div>

                {/* File Upload */}
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-400 mb-1 block">Upload Certificate PDF/Image</label>
                  <div className="relative border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:bg-white/5 transition-colors">
                    <input type="file" accept=".pdf,image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex flex-col items-center pointer-events-none">
                      <Upload className="w-8 h-8 text-brand-gold mb-2" />
                      <p className="text-white font-medium">{file ? file.name : 'Click or drag file to upload'}</p>
                      <p className="text-gray-500 text-sm mt-1">PDF, JPG or PNG (Max 5MB)</p>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm flex gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl text-sm flex gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl font-bold text-brand-navy shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 w-full md:w-auto"
                style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
              >
                {loading ? 'Processing...' : 'Generate Certificate'}
              </button>
            </form>
          </motion.div>
        )}

        {activeTab === 'view' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl text-center"
          >
            <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Search Certificates</h2>
            <p className="text-gray-400 mb-6">Use the public Verify Certificate page to search for generated IDs.</p>
            <a href="/verify-certificate" className="inline-block px-6 py-3 rounded-xl bg-brand-gold/10 text-brand-gold font-bold hover:bg-brand-gold/20 transition-colors border border-brand-gold/30">
              Go to Verification Portal
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
