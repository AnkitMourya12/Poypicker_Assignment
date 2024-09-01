const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dashboardRoutes = require('./routes/dashboard');
//const authMiddleware = require('./middleware/authMiddleware');
const productRoutes = require('./routes/product');
const requestsRoutes = require('./routes/requests');
//const pd=require('./routes/pendingRequests')



dotenv.config();

const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/auth', authRoutes);

app.use('/api/dashboard', dashboardRoutes);
//app.use('/api/dashboard', authMiddleware, dashboardRoutes);

app.use('/api/product', productRoutes);
app.use('/api/pending-requests', requestsRoutes);
//app.use('/api/pending-requests',pd ); 



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//process.env.MONGO_URI
// 
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));
