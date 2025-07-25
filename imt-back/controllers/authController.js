// const User = require('../models/User');
// const { generateToken } = require('../config/jwt');
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');

// exports.register = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   try {
//     const { username, password } = req.body;
//     const existingUser = await User.findOne({ username });
//     if (existingUser) return res.status(409).json({ message: 'User already exists' });

//     const user = new User({ username, password });
//     await user.save();

//     const token = generateToken(user._id);
//     res.status(201).json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.login = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = generateToken(user._id);
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const User = require('../models/User');
const { generateToken } = require('../config/jwt');
// const asyncHandler = require('../middleware/async');
const asyncHandler = require('../middleware/async');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, mobileNumber, role } = req.body;

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    role
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Please provide an email and password' 
    });
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {}
  });
});
