

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');


dotenv.config({ path: './config/config.env' });


const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();

app.use(express.json());


app.use(cookieParser());


app.use(cors({
      origin: [
        'http://localhost:3000',     
        'http://frontend:3000',      
        'http://127.0.0.1:3000'     
    ],

  credentials: true
}));


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


const errorHandler = require('./middleware/error');
app.use(errorHandler);

module.exports = app;