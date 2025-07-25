// const express = require('express');
// const router = express.Router();
// const { check } = require('express-validator');
// const Product = require('../models/Product');
// const authenticate = require('../middlewares/authMiddleware');
// const productController = require('../controllers/productController');

// // Existing routes
// router.post('/products', authenticate, [
//   check('name', 'Name is required').notEmpty(),
//   check('sku', 'SKU is required').notEmpty(),
//   check('quantity', 'Quantity must be >= 0').isInt({ min: 0 })
// ], productController.addProduct);

// router.put('/products/:id/quantity', authenticate, [
//   check('quantity', 'Quantity must be >= 0').isInt({ min: 0 })
// ], productController.updateQuantity);

// router.get('/products', authenticate, productController.getProducts);

// // NEW DASHBOARD STATS ROUTE
// router.get('/stats', authenticate, async (req, res) => {
//   try {
//     const totalProducts = await Product.countDocuments();
//     const lowStockItems = await Product.countDocuments({ quantity: { $lt: 10 } });
    
//     const aggregation = await Product.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalValue: { $sum: { $multiply: ["$price", "$quantity"] } }
//         }
//       }
//     ]);
    
//     res.json({
//       totalProducts,
//       lowStockItems,
//       totalValue: aggregation[0]?.totalValue || 0
//     });
//   } catch (err) {
//     console.error('Dashboard stats error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

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