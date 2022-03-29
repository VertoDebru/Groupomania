const express = require('express');
const router = express.Router();

const ctrlArticle = require('../controllers/articles');

router.get('/', ctrlArticle.articlesGet);
router.post('/', ctrlArticle.articleAdd);
router.put('/', ctrlArticle.articleEdit);
router.delete('/', ctrlArticle.articleDel);

module.exports = router;
