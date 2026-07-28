const express = require('express');
const { getCertificateById, getUserCertificates } = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/my-certificates', protect, getUserCertificates);
router.get('/:id', protect, getCertificateById);

module.exports = router;
