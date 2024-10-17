const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());


// Import routes
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const habitRoutes = require('./routes/habitRoutes');
require('./routes/dailynotification'); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/track', trackRoutes);
app.use('/api/habit', habitRoutes);


// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

