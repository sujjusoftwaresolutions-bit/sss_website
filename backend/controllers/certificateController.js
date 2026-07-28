const Certificate = require('../models/Certificate');

// @desc    Get certificate by ID
// @route   GET /api/certificates/:id
// @access  Private
const getCertificateById = async (req, res) => {
  try {
    const certId = req.params.id;
    const certificate = await Certificate.findOne({ certificateId: certId });

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Invalid Certificate ID.' });
    }

    // Verify Ownership
    if (certificate.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized. This certificate does not belong to you.' });
    }

    res.json({ success: true, certificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while verifying certificate' });
  }
};

// @desc    Get user's certificates
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
