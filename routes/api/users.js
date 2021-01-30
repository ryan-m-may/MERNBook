const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// User Schema
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  // Validate name email and password using express-validator
  [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Please include a valid email address.').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring - pull out name, email, password from req.body
    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists.' }] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        // s is size
        s: '200',
        // r is rating
        r: 'pg',
        // mm displays a default avatar if the user doesn't have their own avatar
        d: 'mm',
      });

      // Create an instance of a user
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken

      res.send('User registered.');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
