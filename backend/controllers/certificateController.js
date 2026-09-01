const Certificate = require('../models/Certificate');
const path = require('path');
const fs = require('fs');
const { uploadToCloudinary } = require('../middleware/uploadMiddleware');

// @desc    Get certificate by ID — any logged-in user can verify
// @route   GET /api/certificates/:id
// @access  Private (must be logged in)
const getCertificateById = async (req, res) => {
  try {
    const rawId = req.params.id.trim();
    const escapedRaw = rawId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Replace hyphens, underscores, or spaces with a flexible regex pattern [-_\s]?
    const flexiblePattern = escapedRaw.replace(/[\-_\\s]+/g, '[-_\\s]?');

    // Flexible lookup: match certificateId (exact, flexible hyphen/underscore, or contains) OR rollNumber
    const certificate = await Certificate.findOne({
      $or: [
        { certificateId: rawId },
        { certificateId: { $regex: new RegExp(`^${flexiblePattern}$`, 'i') } },
        { certificateId: { $regex: new RegExp(escapedRaw, 'i') } },
        { rollNumber: { $regex: new RegExp(`^${escapedRaw}$`, 'i') } },
        { rollNumber: { $regex: new RegExp(escapedRaw, 'i') } }
      ]
    });

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found. Please check the Certificate ID or Roll Number and try again.' });
    }

    // Require verified email
    if (!req.user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: Please verify your email address via OTP first.',
      });
    }

    // Auto-link certificate to user if roll number or email matches, or if unassigned
    if (!certificate.userId && req.user) {
      if (
        (certificate.rollNumber && req.user.rollNumber && certificate.rollNumber.toLowerCase() === req.user.rollNumber.toLowerCase()) ||
        (certificate.studentEmail && req.user.email && certificate.studentEmail.toLowerCase() === req.user.email.toLowerCase())
      ) {
        certificate.userId = req.user.id;
        await certificate.save();
      }
    }

    res.json({ success: true, ...certificate.toObject() });
  } catch (error) {
    console.error('Certificate lookup error:', error.message);
    res.status(500).json({ success: false, message: 'Server error while verifying certificate' });
  }
};

// @desc    Get all certificates belonging to logged-in user (smart match by userId, email, or rollNumber)
// @route   GET /api/certificates/my-certificates
// @access  Private
const getUserCertificates = async (req, res) => {
  try {
    const user = req.user;
    const queryConditions = [{ userId: user.id }];

    if (user.email) {
      queryConditions.push({ studentEmail: { $regex: new RegExp(`^${user.email.trim()}$`, 'i') } });
    }
    if (user.rollNumber) {
      queryConditions.push({ rollNumber: { $regex: new RegExp(`^${user.rollNumber.trim()}$`, 'i') } });
    }

    const certificates = await Certificate.find({ $or: queryConditions }).sort({ createdAt: -1 });

    // Auto-link unassigned certificates to this user
    for (const cert of certificates) {
      if (!cert.userId) {
        cert.userId = user.id;
        await cert.save();
      }
    }

    res.json({ success: true, certificates });
  } catch (error) {
    console.error('GetUserCertificates error:', error);
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

// @desc    Download certificate file (Owner from Dashboard only)
// @route   GET /api/certificates/download/:id
// @access  Private
const downloadCertificate = async (req, res) => {
  try {
    const certId = req.params.id;
    const certificate = await Certificate.findOne({ certificateId: certId });

    if (!certificate || !certificate.certificateURL) {
      return res.status(404).json({ success: false, message: 'Certificate file not found.' });
    }

    // Require verified email
    if (!req.user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: Please verify your email address via OTP first.',
      });
    }

    // Strict Ownership Check: Only admin or the certificate owner can download
    const isOwner = (
      req.user.role === 'admin' ||
      (certificate.userId && certificate.userId.toString() === req.user.id) ||
      (certificate.studentEmail && req.user.email && certificate.studentEmail.toLowerCase() === req.user.email.toLowerCase()) ||
      (certificate.rollNumber && req.user.rollNumber && certificate.rollNumber.toLowerCase() === req.user.rollNumber.toLowerCase())
    );

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: You can only download certificates that belong to your account from your Dashboard.',
      });
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
