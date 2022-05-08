const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');
// Controllers
const ctrlLike = require('../controllers/likes');

router.post('/', auth, ctrlLike.like);

module.exports = router;
