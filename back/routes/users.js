const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
// Controllers
const ctrlUser = require('../controllers/users');

router.post('/login', ctrlUser.userLogin);
router.post('/sign', multer.single('avatar'), ctrlUser.userSign);
router.get('/', ctrlUser.userGet);
router.get('/search', ctrlUser.userSearch);
router.put('/:id/:delete', auth, multer.single('avatar'), ctrlUser.userEdit);
router.delete('/:id/:avatar', auth, ctrlUser.userDel);

module.exports = router;
