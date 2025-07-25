// const express = require('express');
// const router = express.Router();
// const { check } = require('express-validator');
// const authController = require('../controllers/authController');

// router.post('/register', [
//   check('username', 'Username is required').notEmpty(),
//   check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
// ], authController.register);

// router.post('/login', [
//   check('username', 'Username is required').notEmpty(),
//   check('password', 'Password is required').exists()
// ], authController.login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

router.post(
  '/register',
  [
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('mobileNumber', 'Mobile number is required').notEmpty()
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

router.get('/logout', authController.logout);

module.exports = router;