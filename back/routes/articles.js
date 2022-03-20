const express = require('express');
const router = express.Router();

const ctrlArticle = require('../controllers/articles');

router.get('/', ctrlArticle.articlesGet);
router.post('/', ctrlArticle.articleAdd);

module.exports = router;
