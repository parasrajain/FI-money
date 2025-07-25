// const jwt = require('jsonwebtoken');

// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });
// };

// const verifyToken = (token) => {
//   return jwt.verify(token, process.env.JWT_SECRET);
// };

// module.exports = { generateToken, verifyToken };

const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '2h'
  });
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };