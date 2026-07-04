const express = require('express');
const router = express.Router();

// Mock Services
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, title: 'Software Development', description: 'Custom software solutions.' },
      { id: 2, title: 'AI Solutions', description: 'Intelligent AI-powered applications.' },
      { id: 3, title: 'Internships', description: 'Practical industry-level internships.' }
    ]
  });
});

module.exports = router;
