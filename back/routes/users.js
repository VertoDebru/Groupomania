const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/users');

router.get('/', ctrlUser.userGet);
router.post('/login', ctrlUser.userLogin);
router.post('/sign', ctrlUser.userSign);

module.exports = router;
