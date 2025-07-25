// const Product = require('../models/Product');
// const { validationResult } = require('express-validator');

// exports.addProduct = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).json({ product_id: product._id, message: 'Product added' });
//   } catch (err) {
//     if (err.code === 11000) return res.status(400).json({ message: 'SKU must be unique' });
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.updateQuantity = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       { quantity: req.body.quantity },
//       { new: true }
//     );
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.getProducts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const products = await Product.find().skip(skip).limit(limit);
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');

// @desc    Get all products
// @route   GET /api/products
// @access  Private
exports.getProducts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
    role: req.user.role
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product not found with id of ${req.params.id}`
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
exports.addProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Update product quantity
// @route   PUT /api/products/:id/quantity
// @access  Private (Admin)
exports.updateQuantity = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { quantity: req.body.quantity },
    {
      new: true,
      runValidators: true
    }
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product not found with id of ${req.params.id}`
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Get dashboard stats
// @route   GET /api/products/stats
// @access  Private (Admin)
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  const totalProducts = await Product.countDocuments();
  const lowStockItems = await Product.countDocuments({ quantity: { $lt: 10 } });
  
  const aggregation = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalValue: { $sum: { $multiply: ["$price", "$quantity"] } }
      }
    }
  ]);
  
  res.status(200).json({
    success: true,
    data: {
      totalProducts,
      lowStockItems,
      totalValue: aggregation[0]?.totalValue || 0
    }
  });
});