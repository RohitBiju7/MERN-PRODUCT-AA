const dotenv = require('dotenv');
// Must be called before importing db.js or accessing process.env
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

// Prevent Mongoose from hanging requests indefinitely if DB drops
mongoose.set('bufferCommands', false);

// Connect to MongoDB
connectDB();

const app = express();

// Disable X-Powered-By header to prevent disclosing version/framework info
app.disable('x-powered-by');

// Allow browser requests from the frontend
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});