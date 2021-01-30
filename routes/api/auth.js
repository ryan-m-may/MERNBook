const express = require('express');
const router = express.Router();

// @route   POST api/auth
// @desc    Test route
// @access  Public
router.post('/', (req, res) => res.send('Auth route'));

module.exports = router;
