const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// Load environment variables
require('dotenv').config();

// connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Importing routes
const authRoutes = require('./routes/auth');

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});