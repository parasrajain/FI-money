

const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');


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


exports.addProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

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