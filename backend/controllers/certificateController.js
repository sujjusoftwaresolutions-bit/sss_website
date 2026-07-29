const Certificate = require('../models/Certificate');
const path = require('path');
const fs = require('fs');
const { uploadToCloudinary } = require('../middleware/uploadMiddleware');

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

    // Ownership check — admin can see all, user can only see their own or public certs
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

    // Upload file to Cloudinary (permanent cloud storage)
    let certificateURL = '';
    if (req.file) {
      try {
        certificateURL = await uploadToCloudinary(req.file.buffer, req.file.originalname);
      } catch (uploadErr) {
        console.error('Cloudinary upload error:', uploadErr.message);
        return res.status(500).json({ success: false, message: 'Failed to upload certificate file. Please check Cloudinary credentials.' });
      }
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

// @desc    Download certificate file from Cloudinary URL
// @route   GET /api/certificates/download/:id
// @access  Private
const downloadCertificate = async (req, res) => {
  try {
    const certId = req.params.id;
    const certificate = await Certificate.findOne({ certificateId: certId });

    if (!certificate || !certificate.certificateURL) {
      return res.status(404).json({ success: false, message: 'Certificate file not found.' });
    }

    const fileUrl = certificate.certificateURL;

    // If stored as a Cloudinary URL (http/https), fetch and pipe it
    if (fileUrl.startsWith('http')) {
      const axios = require('axios');
      const fileResponse = await axios.get(fileUrl, { responseType: 'arraybuffer' });

      // Determine file extension from URL
      const urlPath = new URL(fileUrl).pathname;
      const ext = path.extname(urlPath).toLowerCase() || '.png';
      const mimeTypes = {
        '.pdf': 'application/pdf',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const downloadName = `Certificate_${certId}${ext}`;

      res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
      res.setHeader('Content-Type', contentType);
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
      return res.send(Buffer.from(fileResponse.data));
    }

    // Legacy: local file path
    const relativePath = fileUrl.replace(/^\/uploads\//, '');
    const filePath = path.join(__dirname, '..', 'uploads', relativePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Certificate file missing on server. Please re-upload.' });
    }

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

    res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error('Download certificate error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during download.' });
  }
};

module.exports = { getCertificateById, getUserCertificates, createCertificate, downloadCertificate };
