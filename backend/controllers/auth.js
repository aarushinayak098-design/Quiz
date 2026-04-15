const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const config = require('../config/default.json');

// Register user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create user
    user = new User({
      name,
      email,
      password,
      role: role || 'student'
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    const secret = process.env.JWT_SECRET || config.jwtSecret;

    jwt.sign(payload, secret, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }

    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    const secret = process.env.JWT_SECRET || config.jwtSecret;

    jwt.sign(payload, secret, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }

    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
