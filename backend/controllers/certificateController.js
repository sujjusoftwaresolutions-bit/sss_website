const Certificate = require('../models/Certificate');
const path = require('path');
const fs = require('fs');

// @desc    Get certificate by ID — any logged-in user can verify
// @route   GET /api/certificates/:id
// @access  Private (must be logged in)
const getCertificateById = async (req, res) => {
  try {
    const certId = req.params.id;
    const certificate = await Certificate.findOne({ certificateId: certId });

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found. Please check the ID and try again.' });
    }

    // ── Ownership check ──────────────────────────────────────────────────────
    // If certificate has a userId linked, only that user (or admin) can view it.
    // If userId is null (admin-uploaded public cert), any logged-in user can view it.
    if (
      certificate.userId &&
      certificate.userId.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized. This certificate does not belong to your account.',
      });
    }

    res.json({ success: true, ...certificate.toObject() });
  } catch (error) {
    console.error('Certificate lookup error:', error.message);
    res.status(500).json({ success: false, message: 'Server error while verifying certificate' });
  }
};

// @desc    Get all certificates belonging to logged-in user
// @route   GET /api/certificates/my-certificates
// @access  Private
const getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ userId: req.user.id });
    res.json({ success: true, certificates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error fetching certificates' });
  }
};

// @desc    Create a new certificate (Admin only)
// @route   POST /api/certificates
// @access  Private (Admin)
const createCertificate = async (req, res) => {
  try {
    const { studentName, studentEmail, rollNumber, collegeName, department, year, course, duration, grade, issuedDate } = req.body;
    
    // Generate a unique certificate ID if not provided
    let certId = req.body.certificateId;
    if (!certId) {
      const count = await Certificate.countDocuments();
      const paddedCount = String(count + 1).padStart(4, '0');
      certId = `SSS_${paddedCount}`;
    }

    // Check if ID already exists
    const existingCert = await Certificate.findOne({ certificateId: certId });
    if (existingCert) {
      return res.status(400).json({ success: false, message: 'Certificate ID already exists' });
    }

    // Handle uploaded file path
    let certificateURL = '';
    if (req.file) {
      // In production, this might be a full domain, but for simplicity we store the relative path
      certificateURL = `/uploads/${req.file.filename}`;
    }

    const certificate = await Certificate.create({
      certificateId: certId,
      studentName,
      studentEmail,
      rollNumber,
      collegeName,
      department,
      year,
      course,
      duration,
      grade,
      issuedDate: issuedDate || new Date(),
      certificateURL,
    });

    res.status(201).json({
      success: true,
      message: 'Certificate generated successfully',
      certificate,
    });
  } catch (error) {
    console.error('Create certificate error:', error.message);
    res.status(500).json({ success: false, message: `Server error creating certificate: ${error.message}` });
  }
};

// @desc    Download certificate file (PDF, PNG, JPG, etc.)
// @route   GET /api/certificates/download/:id
// @access  Private
const downloadCertificate = async (req, res) => {
  try {
    const certId = req.params.id;
    const certificate = await Certificate.findOne({ certificateId: certId });

    if (!certificate || !certificate.certificateURL) {
      return res.status(404).json({ success: false, message: 'Certificate file not found.' });
    }

    // Resolve the local file path
    const relativePath = certificate.certificateURL.replace(/^\/uploads\//, '');
    const filePath = path.join(__dirname, '..', 'uploads', relativePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Certificate file missing on server.' });
    }

    // Auto-detect content type and file extension
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.pdf': 'application/pdf',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    const downloadName = `Certificate_${certId}${ext}`;

    // Force download with proper headers
    res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', 'https://sujjusoftwaresolutions.netlify.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Download certificate error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during download.' });
  }
};

module.exports = { getCertificateById, getUserCertificates, createCertificate, downloadCertificate };
