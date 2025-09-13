require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lumen_quest', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Models
require('./models/User');
require('./models/Plan');
require('./models/Subscription');
require('./models/Log');
require('./models/Discount');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/discounts', require('./routes/discounts'));
app.use('/api/logs', require('./routes/logs'));

// Health check
app.get('/', (req, res) => res.send('LUMEN Quest 2.0 API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
