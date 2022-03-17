const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/users');

router.post('/login', ctrlUser.userLogin);
router.post('/sign', ctrlUser.userSign);

module.exports = router;
