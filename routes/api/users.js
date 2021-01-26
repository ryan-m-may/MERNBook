const express = require('express');
const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.get('/', (req, res) => {
    console.log(req.body);
    res.send('User route');
});

module.exports = router;