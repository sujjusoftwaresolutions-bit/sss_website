const express = require('express');
const router = express.Router();
const multer = require('multer');

// Setup multer for handling multipart/form-data (image uploads)
const upload = multer({ storage: multer.memoryStorage() });

// Mock YOLOv8/Flask validation endpoint
router.post('/validate', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image uploaded' });
  }

  // Simulate AI processing delay
  setTimeout(() => {
    // Mock YOLOv8 response matching the requested interface
    res.json({
      success: true,
      predictedClass: "Garbage",
      confidence: 0.96,
      matched: true
    });
  }, 1500); // 1.5 seconds mock delay
});

module.exports = router;
