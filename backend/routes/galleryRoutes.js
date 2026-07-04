const express = require('express');
const router = express.Router();

// Mock Gallery Images
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, url: 'https://via.placeholder.com/600x400?text=Project+Expo', category: 'Achievements' },
      { id: 2, url: 'https://via.placeholder.com/600x400?text=Technical+Quiz', category: 'Events' }
    ]
  });
});

module.exports = router;
