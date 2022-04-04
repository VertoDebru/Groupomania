const express = require('express');
const router = express.Router();

// Middlewares
const multer = require('../middlewares/multer-config');
// Controllers
const ctrlArticle = require('../controllers/articles');

router.get('/', ctrlArticle.articlesGet);
router.post('/', multer.single('image'), ctrlArticle.articleAdd);
router.put('/', multer.single('image'), ctrlArticle.articleEdit);
router.delete('/:id', ctrlArticle.articleDel);

module.exports = router;
