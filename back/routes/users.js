const express = require('express');
const router = express.Router();

// Middlewares
const multer = require('../middlewares/multer-config');
// Controllers
const ctrlUser = require('../controllers/users');

router.get('/', ctrlUser.userGet);
router.post('/login', ctrlUser.userLogin);
router.post('/sign', multer.single('avatar'), ctrlUser.userSign);
router.put('/', multer.single('avatar'), ctrlUser.userEdit);
router.delete('/:id/:avatar', ctrlUser.userDel);

module.exports = router;
