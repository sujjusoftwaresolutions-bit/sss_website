const Certificate = require('../models/Certificate');

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

module.exports = { getCertificateById, getUserCertificates };
