// const app = require('./app');
// const connectDB = require('./config/db');
// const PORT = process.env.PORT || 8080;

// connectDB();
// console.log("Mongo URI here:", process.env.MONGODB_URI);


// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

require('dotenv').config({ path: './.env' }); // Add this at the VERY top
const app = require('./app');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const PORT = process.env.PORT || 5500;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});