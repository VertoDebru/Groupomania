const express = require('express');
const router = express.Router();

// Middlewares
const multer = require('../middlewares/multer-config');
// Controllers
const ctrlUser = require('../controllers/users');

router.get('/', ctrlUser.userGet);
router.post('/login', ctrlUser.userLogin);
router.post('/sign', multer, ctrlUser.userSign);
router.put('/', multer, ctrlUser.userEdit);
router.delete('/', ctrlUser.userDel);

module.exports = router;
