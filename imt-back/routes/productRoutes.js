

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getProducts,
  getProduct,
  addProduct,
  updateQuantity,
  getDashboardStats
} = require('../controllers/productController');

router.route('/')
  .get(protect, getProducts)
  .post(protect, authorize('ADMIN'), addProduct);

router.route('/:id')
  .get(protect, getProduct);

router.route('/:id/quantity')
  .put(protect, authorize('ADMIN'), updateQuantity);

router.route('/stats')
  .get(protect, authorize('ADMIN'), getDashboardStats);

module.exports = router;