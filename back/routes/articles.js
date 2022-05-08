const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
// Controllers
const ctrlArticle = require('../controllers/articles');

router.get('/', ctrlArticle.articlesGet);
router.post('/', auth, multer.single('image'), ctrlArticle.articleAdd);
router.put('/:id', auth, multer.single('image'), ctrlArticle.articleEdit);
router.delete('/:id/:image', auth, ctrlArticle.articleDel);

module.exports = router;
