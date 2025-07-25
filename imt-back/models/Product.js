// const mongoose = require('mongoose');

// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   type: { type: String, required: true },
//   sku: { type: String, required: true, unique: true },
//   image_url: { type: String },
//   description: { type: String },
//   quantity: { type: Number, required: true, min: 0 },
//   price: { type: Number, required: true, min: 0 },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Product', ProductSchema);

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please add a product name'] 
  },
  type: { 
    type: String, 
    required: [true, 'Please add a product type'] 
  },
  sku: { 
    type: String, 
    required: [true, 'Please add a SKU'],
    unique: true 
  },
  image_url: { 
    type: String 
  },
  description: { 
    type: String 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: [0, 'Quantity must be at least 0'] 
  },
  price: { 
    type: Number, 
    required: true, 
    min: [0, 'Price must be at least 0'] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Product', ProductSchema);