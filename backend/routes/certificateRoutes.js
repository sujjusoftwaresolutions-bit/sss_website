const express = require('express');
const { getCertificateById, getUserCertificates, createCertificate } = require('../controllers/certificateController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', protect, admin, upload.single('certificateFile'), createCertificate);
router.get('/my-certificates', protect, getUserCertificates);
router.get('/:id', protect, getCertificateById);

module.exports = router;
