const express = require('express');
const { getCertificateById } = require('../controllers/certificateController.js');

const router = express.Router();

router.get('/:id', getCertificateById);

module.exports = router;
