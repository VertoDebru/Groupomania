const express = require('express');
const router = express.Router();

const ctrlArticle = require('../controllers/articles');

router.get('/', ctrlArticle.articlesGet);

module.exports = router;
