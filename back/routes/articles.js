const express = require('express');
const router = express.Router();

// Middlewares
const multer = require('../middlewares/multer-config');
// Controllers
const ctrlArticle = require('../controllers/articles');

router.get('/', ctrlArticle.articlesGet);
router.post('/', multer, ctrlArticle.articleAdd);
router.put('/', multer, ctrlArticle.articleEdit);
router.delete('/', ctrlArticle.articleDel);

module.exports = router;
