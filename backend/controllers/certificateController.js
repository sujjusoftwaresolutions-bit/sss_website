// Mock Database
const certificatesDB = [
  {
    certificateId: 'SSS_3245',
    studentName: 'John Doe',
    courseName: 'Cybersecurity',
    issueDate: '2026-07-28T00:00:00Z',
    // Using a placeholder image for now. In production, this would be a link to AWS S3, Google Cloud Storage, or similar secure storage.
    certificateImageUrl: 'https://placehold.co/800x600/1e293b/d4af37?text=SUJJU+Software+Solutions%5CnOfficial+Certificate%5CnID:+SSS_3245'
  },
  {
    certificateId: 'SSS_1001',
    studentName: 'Jane Smith',
    courseName: 'Full Stack Development',
    issueDate: '2026-06-15T00:00:00Z',
    certificateImageUrl: 'https://placehold.co/800x600/1e293b/d4af37?text=SUJJU+Software+Solutions%5CnOfficial+Certificate%5CnID:+SSS_1001'
  }
];

// @desc    Get certificate by ID
// @route   GET /api/certificates/:id
// @access  Public
const getCertificateById = async (req, res) => {
  try {
    const certId = req.params.id;
    
    // Simulate DB delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const certificate = certificatesDB.find(
      (cert) => cert.certificateId.toUpperCase() === certId.toUpperCase()
    );

    if (certificate) {
      res.json(certificate);
    } else {
      res.status(404).json({ message: 'Certificate not found. Please check the ID and try again.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while verifying certificate' });
  }
};

module.exports = { getCertificateById };
