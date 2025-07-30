// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());


// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');

// app.use('/api', authRoutes);
// app.use('/api', productRoutes);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Server error' });
// });

// module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// Create express app
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
      origin: [
        'http://localhost:3000',     // For local development
        'http://frontend:3000',      // For Docker container communication
        'http://127.0.0.1:3000'      // Alternative localhost
    ],

  credentials: true
}));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
const errorHandler = require('./middleware/error');
app.use(errorHandler);

module.exports = app;