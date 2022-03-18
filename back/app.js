const express = require('express');
const app = express();
// Security
//const auth = require('./middlewares/auth');
// Import routes.
const userRoutes = require('./routes/users');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
