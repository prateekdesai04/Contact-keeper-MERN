const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  //res.send('Get logged in user');
  try {
    const user = await User.findById(req.user.id).select('-password'); //req.user from auth middleware is useed here
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Auth user and get token, login basically
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid E-mail address').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    //res.send('Log in user');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //pulling email and password from request body and not schema

    try {
      let user = await User.findOne({ email }); // find from schema

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials ' }); // check if user doesn't exist
      }

      const isMatch = await bcrypt.compare(password, user.password); //password matching logic

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials ' });
      }

      //if credentials match then send the user a jwt

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
